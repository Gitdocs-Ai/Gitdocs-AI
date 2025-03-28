import { connectAI } from "@/app/api/lib/ai/connectAI";
import { NextRequest } from "next/server";
import { getRepositoryByNamePopulated } from "@/app/api/auth/repository/clientRepositoryServices";
import { fetchReadmeDb } from "../../../auth/repository/updateReadmeDb";
import connectMongoWithRetry from "@/app/api/lib/db/connectMongo";
import { FetchAllFilesData } from "@/app/api/lib/filesFetcher";

async function* streamResponse(stream: AsyncIterable<any>) {
    let buffer = "";
    let inReadmeSection = false;
    let inConclusionSection = false;

    for await (const part of stream) {
        const rawContent = part.choices[0]?.delta?.content || "";
        buffer += rawContent;

        // Check for section headers with more robust patterns
        if (buffer.includes("## README CONTENT") && !inReadmeSection) {
            // Split at the marker
            const parts = buffer.split("## README CONTENT");
            // Output everything before the marker
            if (parts[0].trim()) {
                yield parts[0];
            }
            // Mark that we're now in README section
            inReadmeSection = true;
            buffer = parts[1] || "";
            // Output the special tag
            yield "<<readme>>\n";
        } else if (buffer.includes("## CONCLUSION") && !inConclusionSection) {
            // Split at the marker
            const parts = buffer.split("## CONCLUSION");
            // Output everything before the marker (which should be part of README)
            if (parts[0].trim()) {
                yield parts[0];
            }
            // Mark that we're now in conclusion section
            inReadmeSection = false;
            inConclusionSection = true;
            buffer = parts[1] || "";
            // Output the special tag
            yield "<<conclusion>>\n";
        }
        // If we have accumulated enough text or hit a natural break, flush the buffer
        else if (buffer.includes("\n\n") || buffer.length > 100) {
            const parts = buffer.split("\n\n");
            // Keep the last part (which might be incomplete)
            buffer = parts.pop() || "";
            // Output the complete parts
            yield parts.join("\n\n") + (parts.length > 0 ? "\n\n" : "");
        }
    }

    // Flush any remaining content in the buffer
    if (buffer.trim()) {
        yield buffer;
    }

    yield "<<end>>";
}

export async function POST(request: NextRequest) {
    const userId = request.headers.get("Authorization")?.split(" ")[1];

    if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    await connectMongoWithRetry();

    let { prompt, doc_name, model, base_url, selectedFiles } =
        await request.json();

    if (!prompt || !doc_name || !model || !base_url) {
        return new Response(
            JSON.stringify({
                error: "Prompt, doc_name, model, and base_url are required",
            }),
            { status: 400 },
        );
    }

    let readme = "";

    if (
        !prompt.includes("This is a general chat with the user.") &&
        !prompt.includes(
            "999888777666555444333222111000999888777666555444333222111000",
        )
    ) {
        const repository = await getRepositoryByNamePopulated(doc_name);

        if (!repository) {
            return new Response(
                JSON.stringify({ error: "Repository not found" }),
                { status: 404 },
            );
        }

        const repositoryId = repository.repositoryId;
        readme = await fetchReadmeDb(repositoryId);
    } else {
        prompt = prompt
            .replace("This is a general chat with the user.", "")
            .replace(
                "999888777666555444333222111000999888777666555444333222111000",
                "",
            );
    }

    const updatedPrompt = {
        systemPrompt: `
    You are an expert README generator that creates comprehensive, visually appealing documentation with proper markdown formatting.

    IMPORTANT: Your response MUST follow this EXACT structure with these EXACT headers. The correct formatting is critical for processing your response:

    1. First provide a brief introduction and analysis of the README improvements (no header needed for this part).

    2. Then include the following sections with EXACT headers:

    ## README CONTENT
    \`\`\`markdown
    <!-- Complete README.md content with proper markdown syntax -->
    <!-- Include relevant badges, flowcharts, etc. -->
    <!-- Use blockquote (>) for sections where user needs to fill in details -->
    \`\`\`

    ## CONCLUSION
    - List of changes or improvements made
    - Specific suggestions for further enhancements
    - Any code snippets or configuration examples that complement the README

    DO NOT deviate from this format. Always use the exact headers "## README CONTENT" and "## CONCLUSION" with the markdown code block inside the README CONTENT section.
    `,
        userPrompt: prompt,
        ...(prompt.includes("The previous messages are:") || !readme
            ? {}
            : { previousReadme: readme }),
    };

    try {
        const contextFilesData = await FetchAllFilesData(
            userId,
            selectedFiles,
            doc_name,
        );

        const stream = await connectAI(
            userId,
            JSON.stringify(updatedPrompt),
            model || "gemini-2.0-flash",
            base_url,
            contextFilesData.allFileData,
        );

        const responseStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of streamResponse(stream)) {
                    controller.enqueue(new TextEncoder().encode(chunk));
                }
                controller.close();
            },
        });

        return new Response(responseStream, {
            headers: {
                "Content-Type": "text/plain",
                "Transfer-Encoding": "chunked",
                "Cache-Control": "no-cache",
            },
        });
    } catch (error) {
        console.error("Error in /api/fetch/airesponse/generate:", error);
        return new Response(
            JSON.stringify({ message: "Error generating response" }),
            { status: 500 },
        );
    }
}
