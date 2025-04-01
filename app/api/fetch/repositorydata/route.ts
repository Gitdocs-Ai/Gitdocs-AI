import { NextRequest, NextResponse } from "next/server";
import {
  fetchRepositoryMetadata,
  getClientRepositories,
  updateRepositoryMetadata,
} from "@/app/api/auth/repository/clientRepositoryServices";
import { commitChanges } from "@/app/api/auth/repository/commitChanges";
import connectMongoWithRetry from "../../lib/db/connectMongo";
import User from "@/app/api/lib/models/User";

export async function GET(request: NextRequest) {
  await connectMongoWithRetry();

  const id = request.headers.get("Authorization")?.split(" ")[1];

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const repositories = await getClientRepositories(id);

  return NextResponse.json(repositories);
}

export async function PATCH(request: NextRequest) {
  await connectMongoWithRetry();

  const id = request.headers.get("Authorization")?.split(" ")[1];

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { doc_name } = await request.json();

  const repository = await fetchRepositoryMetadata(doc_name);

  return NextResponse.json(repository);
}

export async function PUT(request: NextRequest) {
  await connectMongoWithRetry();

  const { doc_name, metadata } = await request.json();

  await updateRepositoryMetadata(doc_name, metadata);

  return NextResponse.json(
    { message: "Repository metadata updated successfully" },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  await connectMongoWithRetry();

  const { user_id, doc_name, message, content, branch } = await request.json();

  if (!user_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const user = await User.findOne(
    { clerkUid: user_id },
    { installationId: 1, githubUsername: 1 },
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  await commitChanges(
    user.githubUsername,
    doc_name,
    Number(user.installationId),
    message,
    content,
    branch,
  );

  return NextResponse.json(
    { message: "Repository updated successfully" },
    { status: 200 },
  );
}
