import { NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)

// ...


// ...
export async function POST(request) {
    // Extract API key from Authorization header
    const apiKey = request.headers.get('Authorization').replace('Bearer ', '');

    const data = await request.json();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = data.prompt;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
        prompt: text,
    });
}

