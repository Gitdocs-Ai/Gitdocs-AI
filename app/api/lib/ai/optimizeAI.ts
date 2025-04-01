import OpenAI from "openai";
import { tokenize } from "../geminiTokenizer";
import { updateTokensUsedOverview } from "../../auth/overview/clientOverviewServices";

export async function optimizeAI(
  userId: string,
  prompt: string,
  systemPrompt: string,
  readme: string,
) {
  if (!userId) {
    throw new Error("User not found");
  }

  const listOfFiles = prompt;

  const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

  const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `
                List of files: ${listOfFiles}
                Readme: ${readme}
                `,
      },
    ],
  });

  const responseTokens = await tokenize(
    response.choices[0].message.content as string,
  );
  updateTokensUsedOverview(userId, responseTokens);

  return response.choices[0].message.content;
}
