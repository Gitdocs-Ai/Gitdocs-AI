import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Repository from "@/app/api/lib/models/Repository";
import { updateReadmeDb } from "../../auth/repository/updateReadmeDb";
import { fetchRepositoryReadme } from "../../auth/repository/fetchRepositories";
// Your GitHub webhook secret
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || "your_secret_here";

// Helper function to verify the signature
function verifySignature(signature: string, payload: string): boolean {
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  hmac.update(payload, "utf-8");
  const digest = `sha256=${hmac.digest("hex")}`;
  return signature === digest;
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-hub-signature-256");
    if (!signature) {
      return NextResponse.json({ error: "Signature missing" }, { status: 400 });
    }

    const payload = await req.text(); // Raw payload for signature verification
    if (!verifySignature(signature, payload)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = req.headers.get("x-github-event"); // GitHub event type
    const body = JSON.parse(payload); // Parsed payload


    console.log(event);
    // Handle specific GitHub events
    if (event === "push") {
      const fileChanged = body.head_commit.added || body.head_commit.modified || body.head_commit.removed;
      if (fileChanged == "README.md") {
        const repositoryId = body.repository.id;
        const updatedAt = body.head_commit.timestamp;
        const recentCommitDescription = body.head_commit.message;

        const repository = await Repository.findOne({ repositoryId });
        if (!repository) {
            return NextResponse.json({ error: "Repository not found" }, { status: 404 });
        }

        repository.recentCommitDescription = recentCommitDescription;
        repository.updatedAt = updatedAt;
        await repository.save();

        const updateReadme = async () => {

            try {
                const readmeData = await fetchRepositoryReadme(body.repository.owner.login, body.repository.name, Number(body.installation.id));
                
                if (readmeData) {
                    await updateReadmeDb(body.repository.owner.id, repositoryId, readmeData);
                } else {
                    console.warn(`No README found for repository: ${body.repository.name}`);
                }
            } catch (error) {
                console.error(`Error fetching README for ${body.repository.name}:`, error);
            }
        }

        updateReadme();
      }

      
    } else if (event === "pull_request") {
      console.log(`Pull request: ${body.action}`);
      // Add your custom logic for pull request events
    }

    return NextResponse.json({ message: "Webhook received" });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
