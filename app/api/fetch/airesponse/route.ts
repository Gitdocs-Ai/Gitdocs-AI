import { connectGemini } from "@/app/api/lib/ai/connectGemini";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const userId = request.headers.get("Authorization")?.split(" ")[1];

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const prompt = body.prompt;

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const result = await connectGemini(userId, prompt);

  // Create a ReadableStream to handle the chunks
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        controller.enqueue(new TextEncoder().encode(chunk.text())); // Send each chunk
      }
      controller.close(); // Close the stream when done
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain", // Adjust content type as needed
      "Cache-Control": "no-cache",
    },
  });

}
