/**
 * Gradway AI Consultation Service
 * Proxies AI queries to the secure backend endpoint with rate limiting and prompt injection protections.
 */

export const getGeminiResponse = async (prompt: string): Promise<string> => {
    try {
        const response = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (response.status === 429) {
                return "You're sending messages quite fast. Please wait a moment before sending your next question, or call our Colombo hotline directly at +94 77 500 9929.";
            }
            throw new Error(errorData.error || `Server responded with status ${response.status}`);
        }

        const data = await response.json();
        return data.reply || "Thank you for asking! Please connect with our counselors at +94 77 500 9929 to explore your study options in detail.";
    } catch (error) {
        console.error("AI Consultation Service Error:", error);
        return "I'm having trouble reaching our AI consultant right now. Please reach out to our team directly via WhatsApp or Phone at +94 77 500 9929.";
    }
};
