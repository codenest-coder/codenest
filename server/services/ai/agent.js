import OpenAI from "openai";

import portfolio from "../../data/portofolio.js";
import { buildSystemPrompt } from "./prompt.js";

const MAX_HISTORY_MESSAGES = 12;

export async function askAgent(message, history = []) {
    if (!process.env.OPENAI_API_KEY) {
        const error = new Error("The chat service has not been configured.");
        error.statusCode = 503;
        throw error;
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.responses.create({
        model: process.env.OPENAI_CHAT_MODEL || "gpt-5-mini",
        instructions: buildSystemPrompt(portfolio),
        input: [
            ...history.slice(-MAX_HISTORY_MESSAGES),
            { role: "user", content: message },
        ],
        max_output_tokens: 800,
    });

    return response.output_text?.trim() || "I'm sorry, I couldn't generate a response. Please try again.";
}
