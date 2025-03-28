import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import { tokenize } from "../geminiTokenizer";
import { updateTokensUsedOverview } from "../../auth/overview/clientOverviewServices";

export async function connectAI(
    userId: string,
    prompt: string,
    model: string,
    base_url: string,
    contextFilesData: { name: string; content: string }[],
) {
    if (!userId) {
        throw new Error("User not found");
    }

    const parsedPrompt = JSON.parse(prompt);
    const systemPrompt = parsedPrompt.systemPrompt;
    const userPrompt = parsedPrompt.userPrompt;
    const previousReadme = parsedPrompt.previousReadme || "";

    let apiKey = "";
    let openai: OpenAI;

    if (base_url === "not_required") {
        // Use the OPENAI_API_KEY from .env and default OpenAI endpoint/logic
        apiKey = process.env.OPENAI_API_KEY || "";
        if (!apiKey) {
            throw new Error("Missing OPENAI_API_KEY in environment variables");
        }
        openai = new OpenAI({ apiKey });
    } else {
        // Use custom base_url and select API key accordingly
        const API_KEYS_LIST = [
            process.env.GEMINI_API_KEY,
            process.env.KLUSTER_API_KEY,
        ];
        if (
            base_url ===
            "https://generativelanguage.googleapis.com/v1beta/openai/"
        ) {
            apiKey = API_KEYS_LIST[0] || "";
        } else if (base_url === "https://api.kluster.ai/v1") {
            apiKey = API_KEYS_LIST[1] || "";
        }
        if (!apiKey) {
            throw new Error(
                `Missing API key for base URL ${base_url} in environment variables`,
            );
        }
        openai = new OpenAI({
            apiKey: apiKey,
            baseURL: base_url,
        });
    }

    console.log(contextFilesData ? contextFilesData.length : 0);

    const response = await openai.chat.completions.create({
        model: model,
        messages: [
            {
                role: "system",
                content:
                    "You are an expert README generator that creates comprehensive, visually appealing documentation with proper markdown formatting. Goals: Create professional README files with consistent structure, Include visual elements like badges, diagrams, and charts where appropriate, Ensure all critical project information is documented, Make documentation visually scannable and easy to navigate, Brief explanation of any charts, diagrams, or badges included and how they enhance the documentation.",
            },
            { role: "system", content: systemPrompt },
            {
                role: "user",
                content:
                    userPrompt +
                    (previousReadme
                        ? `\n\nPrevious README: ${previousReadme}`
                        : ""),
            },
            {
                role: "user",
                content: contextFilesData
                    ? contextFilesData.length > 0
                        ? `The files with content are: ${contextFilesData.map((file) => `${file.name}: ${file.content}`).join("\n")}`
                        : ""
                    : "",
            },
        ],
        stream: true,
    });

    // Create two identical streams using tee()
    const [responseForCounting, responseForReturn] = response.tee();

    // Handle token counting in the background
    updateTokensUsed(userId, prompt, responseForCounting, model).catch(
        (error) => {
            console.error("Error updating tokens:", error);
        },
    );

    // Return the other stream for the client
    return responseForReturn;
}

async function updateTokensUsed(
    userId: string,
    prompt: string,
    response: any,
    model: string,
) {
    try {
        let responseAccumulator = "";

        // Process the stream to accumulate the full response text
        for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || "";
            responseAccumulator += content;
        }

        let responseTokens = 0;
        let promptTokens = 0;

        if (
            model.includes("deepseek") ||
            model.includes("klusterai") ||
            model.includes("gpt") ||
            model.includes("o3-mini")
        ) {
            responseTokens = await tokenize(responseAccumulator);
            promptTokens = await tokenize(prompt);
        } else {
            responseTokens = await tokenize(responseAccumulator, model);
            promptTokens = await tokenize(prompt, model);
        }

        if (responseTokens > 20000) {
            console.warn("Response exceeds token limit");
            // Consider not throwing here to prevent disruption, just log
        }

        const totalTokens = promptTokens + responseTokens;
        await updateTokensUsedOverview(userId, totalTokens);
    } catch (error) {
        console.error("Error in token counting:", error);
        // Log but don't throw to prevent disrupting the main response
    }
}
