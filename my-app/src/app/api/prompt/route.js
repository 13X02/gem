import { NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)

// ...

let chatHistory = [];

export async function POST(request) {
    // Extract API key from Authorization header
    const apiKey = request.headers.get('Authorization').replace('Bearer ', '');

    const data = await request.json();
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = data.prompt;

    let result;

    // If it's the first prompt, use generateContent
    if (chatHistory.length === 0) {
        result = await model.generateContent(prompt);
    } else {
        // For subsequent prompts, use sendMessage
        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 100,
            },
        });
        result = await chat.sendMessage(prompt);
    }

    const response = await result.response;
    const text = response.text();

    // Add user prompt to the chat history
    chatHistory.push({
        role: "user",
        parts: prompt,
    });

    // Trim chat history to keep the last 20 entries
    if (chatHistory.length > 20) {
        chatHistory = chatHistory.slice(-20);
    }

    // Add model response to the chat history
    chatHistory.push({
        role: "model",
        parts: text,
    });

    return NextResponse.json({
        prompt: prompt,
        response: text,
    });
}
