import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { initializeDatabase, saveChatVersion, getChatVersions, getChatVersion } from "./database";

// In-Memory Token Bucket / Window Rate Limiter
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function rateLimiter(limit = 60, windowMs = 60000) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= limit) {
      res.setHeader("Retry-After", Math.ceil((record.resetTime - now) / 1000));
      return res.status(429).json({
        error: "Too many requests. Please slow down and try again shortly.",
        retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000)
      });
    }

    record.count++;
    next();
  };
}

// Allowed Magic Bytes for Secure File Upload Validation
const MAGIC_BYTES: Record<string, number[][]> = {
  "application/pdf": [[0x25, 0x50, 0x44, 0x46]], // %PDF
  "image/png": [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]], // PNG
  "image/jpeg": [[0xFF, 0xD8, 0xFF]], // JPEG
  "image/webp": [[0x52, 0x49, 0x46, 0x46]] // RIFF
};

const ALLOWED_EXTENSIONS = new Set([".pdf", ".png", ".jpg", ".jpeg", ".webp"]);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

function validateUploadedBuffer(buffer: Buffer, originalName: string, mimeType: string): { valid: boolean; reason?: string } {
  if (!buffer || buffer.length === 0) {
    return { valid: false, reason: "Empty file provided" };
  }
  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return { valid: false, reason: "File exceeds 5MB size limit" };
  }

  const ext = path.extname(originalName).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return { valid: false, reason: `Disallowed file extension: ${ext}` };
  }

  const validSignatures = MAGIC_BYTES[mimeType];
  if (!validSignatures) {
    return { valid: false, reason: `Disallowed MIME type: ${mimeType}` };
  }

  const matchesSignature = validSignatures.some(sig => {
    if (buffer.length < sig.length) return false;
    for (let i = 0; i < sig.length; i++) {
      if (buffer[i] !== sig[i]) return false;
    }
    return true;
  });

  if (!matchesSignature) {
    return { valid: false, reason: "File content magic bytes do not match declared MIME type" };
  }

  return { valid: true };
}

// Prompt Injection Sanitizer
function sanitizeAiPrompt(input: string): string {
  if (typeof input !== "string") return "";
  // Strip control chars, markdown delimiters attempting system overrides, and truncate
  let sanitized = input
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, "")
    .replace(/(---|\*\*\*|===|###\s*system|###\s*instruction)/gi, " ")
    .trim();
  
  if (sanitized.length > 1000) {
    sanitized = sanitized.slice(0, 1000);
  }
  return sanitized;
}

const SYSTEM_INSTRUCTION = `
You are an expert, friendly Education Consultant for Gradway (Pvt) Ltd.
Gradway is a premier study abroad partner located at No 36, Queen's Road, Colombo, Sri Lanka.
Key Destinations: UK, Germany, Canada, Australia, France, USA.
Services: Academic Profile Evaluation, Course & University Mapping, Visa & Document Preparation, Scholarship Mapping, Mock Interviews.
Contact & Hotline: +94 77 500 9929 | hello@gradway.lk
Always maintain a helpful, encouraging tone and remind students they can book a free consultation in Colombo.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Headers & Discovery Middleware (Section 5 Security Audit + RFC 8288 / RFC 9727 Discovery)
  app.use((req, res, next) => {
    // HSTS (max-age=2 years, includeSubDomains, preload)
    res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    // Prevent MIME sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");
    // Referrer policy
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    // Hardware and feature restrictions
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    // RFC 8288 & RFC 9727 Agent Discovery Link Headers
    res.setHeader(
      "Link",
      [
        '</.well-known/api-catalog>; rel="api-catalog"',
        '</openapi.json>; rel="service-desc"; type="application/json"',
        '</llms.txt>; rel="service-doc"; type="text/plain"',
        '</.well-known/schema.json>; rel="describedby"; type="application/json"'
      ].join(", ")
    );
    // Content Security Policy (allows preview iframing in AI Studio and Google Analytics tracking)
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://esm.sh https://www.googletagmanager.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.tailwindcss.com; " +
      "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; " +
      "img-src 'self' data: https: blob: https://www.googletagmanager.com https://*.google-analytics.com; " +
      "connect-src 'self' https://esm.sh https://generativelanguage.googleapis.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; " +
      "frame-src 'self' https:; " +
      "frame-ancestors *;"
    );
    next();
  });

  app.use(cors());
  app.use(express.json({ limit: "5mb" }));

  // Serve RFC 9727 Agent & Machine-Readable Discovery Endpoints
  app.get("/.well-known/api-catalog", (req, res) => {
    const catalogPath = path.join(process.cwd(), "public", ".well-known", "api-catalog");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.sendFile(catalogPath, { dotfiles: "allow" });
  });

  app.get("/openapi.json", (req, res) => {
    const openapiPath = path.join(process.cwd(), "public", "openapi.json");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.sendFile(openapiPath, { dotfiles: "allow" });
  });

  app.get("/.well-known/schema.json", (req, res) => {
    const schemaPath = path.join(process.cwd(), "public", ".well-known", "schema.json");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.sendFile(schemaPath, { dotfiles: "allow" });
  });

  app.get("/llms.txt", (req, res) => {
    const llmsPath = path.join(process.cwd(), "public", "llms.txt");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.sendFile(llmsPath, { dotfiles: "allow" });
  });

  // Initialize Database with Parameterized Queries
  await initializeDatabase();

  // Apply Global Rate Limiting across all API routes
  app.use("/api", rateLimiter(120, 60000));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "Gradway Secure Backend"
    });
  });

  // Secure AI Chatbot Endpoint with Prompt Injection Filtering
  app.post("/api/ai/chat", rateLimiter(20, 60000), async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Valid message text is required." });
      }

      const sanitizedMessage = sanitizeAiPrompt(message);
      if (!sanitizedMessage) {
        return res.status(400).json({ error: "Invalid or empty message after sanitization." });
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        // Fallback friendly response if no API key is set
        return res.json({
          reply: "Welcome to Gradway! We are ready to assist you with your study abroad journey to the UK, Germany, Canada, Australia, and more. Contact our counselors at +94 77 500 9929 to book your personalized consultation."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      let replyText = "";
      const modelsToTry = ["gemini-3.6-flash", "gemini-3.7-flash"];
      let succeeded = false;

      for (const model of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: sanitizedMessage,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });
          if (response.text) {
            replyText = response.text;
            succeeded = true;
            break;
          }
        } catch (genError: any) {
          // Continue to next model if unavailable or busy
          console.log(`Model ${model} unavailable (${genError?.message || genError?.status || '503'}), trying fallback...`);
        }
      }

      if (!succeeded || !replyText) {
        // High quality contextual fallback in case of temporary API demand spikes
        const lowerMsg = sanitizedMessage.toLowerCase();
        if (lowerMsg.includes("uk") || lowerMsg.includes("united kingdom") || lowerMsg.includes("england") || lowerMsg.includes("london")) {
          replyText = "The UK offers top-tier 3-year Bachelor's and 1-year Master's degrees with a 2-year Graduate Route post-study work visa. Key intakes are September/October and January/February. Gradway assists with UCAS applications, Cas letters, and student visa processing. Contact our Colombo team at +94 77 500 9929 for personalized admission support!";
        } else if (lowerMsg.includes("germany") || lowerMsg.includes("deutschland") || lowerMsg.includes("aps")) {
          replyText = "Germany is world-renowned for tuition-free or very low-cost public university education, especially in STEM, Business, and Engineering, with an 18-month post-study job seeker visa. Gradway provides full guidance on APS verification, blocked accounts, and English-taught degree admissions. Call our team at +94 77 500 9929 for more details!";
        } else if (lowerMsg.includes("france") || lowerMsg.includes("paris")) {
          replyText = "France offers world-leading business schools, Grandes Écoles, and universities with English-taught programs and Schengen mobility. Gradway assists with Campus France procedures and visa filings. Connect with us at +94 77 500 9929!";
        } else if (lowerMsg.includes("canada") || lowerMsg.includes("australia") || lowerMsg.includes("usa") || lowerMsg.includes("ireland") || lowerMsg.includes("new zealand")) {
          replyText = "Gradway partners with accredited institutions across Canada, Australia, the USA, Ireland, and New Zealand. We help you choose the right course, secure scholarships, and submit a high-success visa file. Contact us at +94 77 500 9929 to start your assessment!";
        } else if (lowerMsg.includes("scholarship") || lowerMsg.includes("fee") || lowerMsg.includes("cost") || lowerMsg.includes("budget")) {
          replyText = "Tuition fees and scholarship opportunities vary by country and institution—from partial fee reductions of £1,000–£5,000 in the UK to tuition-free education at public universities in Germany. Our advisors can evaluate your profile for maximum scholarship eligibility. Reach out at +94 77 500 9929!";
        } else if (lowerMsg.includes("visa") || lowerMsg.includes("document") || lowerMsg.includes("intake") || lowerMsg.includes("requirement")) {
          replyText = "Key requirements typically include academic transcripts, English proficiency (IELTS/PTE or MOI where applicable), statement of purpose (SOP), letters of recommendation, and financial proof. Gradway provides complete file preparation and mock visa interviews. Call us at +94 77 500 9929!";
        } else {
          replyText = "Thank you for contacting Gradway! We provide end-to-end guidance for higher education and visas in the UK, Germany, Canada, Australia, France, USA, and beyond. How can we assist with your target country, degree, or intake? You can also reach our Colombo counselors directly on WhatsApp or phone at +94 77 500 9929.";
        }
      }

      res.json({ reply: replyText });
    } catch (error) {
      console.error("AI Service Error:", error);
      res.json({
        reply: "Our consultants are here to help! Please connect directly with our Colombo office on WhatsApp or Hotline: +94 77 500 9929."
      });
    }
  });

  // Secure File Upload Validation API
  app.post("/api/upload/validate", (req, res) => {
    try {
      const { fileName, mimeType, base64Content } = req.body;
      if (!fileName || !mimeType || !base64Content) {
        return res.status(400).json({ error: "Missing required file attributes (fileName, mimeType, base64Content)." });
      }

      const buffer = Buffer.from(base64Content.replace(/^data:.*?;base64,/, ""), "base64");
      const validation = validateUploadedBuffer(buffer, fileName, mimeType);

      if (!validation.valid) {
        return res.status(400).json({ valid: false, error: validation.reason });
      }

      res.json({
        valid: true,
        message: "File passed security signature, MIME type, and size validation."
      });
    } catch (error) {
      console.error("File validation error:", error);
      res.status(500).json({ valid: false, error: "Internal validation failure." });
    }
  });

  // Chat version history endpoints with parameterized queries
  app.post("/api/chat/save", async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }
      const version = await saveChatVersion(JSON.stringify(content));
      res.json(version);
    } catch (error) {
      console.error("Error saving chat version:", error);
      res.status(500).json({ error: "Failed to save chat version" });
    }
  });

  app.get("/api/chat/history", async (req, res) => {
    try {
      const versions = await getChatVersions();
      res.json(versions);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  app.get("/api/chat/version/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const parsedId = parseInt(id, 10);
      if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid version ID" });
      }
      const version = await getChatVersion(parsedId);
      if (!version) {
        return res.status(404).json({ error: "Version not found" });
      }
      res.json({ ...version, content: JSON.parse(version.content) });
    } catch (error) {
      console.error("Error fetching chat version:", error);
      res.status(500).json({ error: "Failed to fetch chat version" });
    }
  });

  // Vite middleware for development / Static file serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Gradway secure server running on http://localhost:${PORT}`);
  });
}

startServer();
