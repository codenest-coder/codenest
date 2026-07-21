import { askAgent } from "../services/ai/agent.js";

const MAX_MESSAGE_LENGTH = 1_500;
const MAX_HISTORY_MESSAGES = 12;

function isChatMessage(value) {
    return (
        value &&
        (value.role === "user" || value.role === "assistant") &&
        typeof value.content === "string" &&
        value.content.length > 0 &&
        value.content.length <= MAX_MESSAGE_LENGTH
    );
}

export async function chatController(req, res) {
    try {
        const { message, history = [] } = req.body || {};
        const cleanMessage = typeof message === "string" ? message.trim() : "";

        if (!cleanMessage || cleanMessage.length > MAX_MESSAGE_LENGTH) {
            return res.status(400).json({ error: "Message must be between 1 and 1500 characters." });
        }

        if (!Array.isArray(history) || history.length > MAX_HISTORY_MESSAGES || !history.every(isChatMessage)) {
            return res.status(400).json({ error: "Invalid conversation history." });
        }

        const response = await askAgent(cleanMessage, history);
        return res.json({ response });
    } catch (err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({
            error: err.statusCode ? err.message : "The assistant is temporarily unavailable. Please try again shortly.",
        });
    }
}
