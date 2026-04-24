import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import { initializeDatabase, saveChatVersion, getChatVersions, getChatVersion } from "./database";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Initialize Database
  await initializeDatabase();

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

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
      const version = await getChatVersion(parseInt(id));
      if (!version) {
        return res.status(404).json({ error: "Version not found" });
      }
      res.json({ ...version, content: JSON.parse(version.content) });
    } catch (error) {
      console.error("Error fetching chat version:", error);
      res.status(500).json({ error: "Failed to fetch chat version" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
