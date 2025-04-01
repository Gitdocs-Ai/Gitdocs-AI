import { NextRequest, NextResponse } from "next/server";
import {
  getFileTree,
  getFileData,
  getAllFilePaths,
} from "@/app/api/auth/filetree/clientFileTreeServices";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const doc_name = request.nextUrl.searchParams.get("doc_name");
  const path = request.nextUrl.searchParams.get("path");

  if (!userId || !doc_name) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 },
    );
  }

  const fileTree = await getFileTree(userId, doc_name, path as string);

  if (fileTree === "Data not found") {
    return NextResponse.json({ error: "Data not found" }, { status: 404 });
  }

  if (path === "") {
    const allFilePaths = await getAllFilePaths(
      userId,
      doc_name,
      path as string,
    );
    return NextResponse.json({ fileTree, allFilePaths }, { status: 200 });
  }

  return NextResponse.json(fileTree);
}

export async function POST(request: NextRequest) {
  // Access files and doc_name from the request body
  const { files, doc_name } = await request.json();

  // Optionally, you can also check the Authorization header:
  const userId = request.headers.get("Authorization")?.split(" ")[1];

  if (!userId) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 },
    );
  }

  if (files.length === 0) {
    return NextResponse.json({ error: "No files to fetch" }, { status: 400 });
  }

  try {
    const allFileData = await getFileData(
      userId as string,
      files,
      doc_name as string,
    );

    if (!allFileData) {
      return NextResponse.json(
        { error: "No file data found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Data received", allFileData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching file data" },
      { status: 500 },
    );
  }
}
