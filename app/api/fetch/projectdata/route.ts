import { NextRequest, NextResponse } from "next/server";
import {
    createProject,
    getProject,
} from "../../auth/project/clientProjectServices";

export async function GET(request: NextRequest) {
    const id = request.headers.get("Authorization")?.split(" ")[1];

    if (!id) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 },
        );
    }

    const { projectName } = await request.json();

    if (!projectName) {
        return NextResponse.json(
            { error: "Project name is required" },
            { status: 400 },
        );
    }

    const project = await getProject(projectName);

    if (!project) {
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404 },
        );
    }

    return NextResponse.json(project);
}

export async function PATCH(request: NextRequest) {
    const id = request.headers.get("Authorization")?.split(" ")[1];

    if (!id) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 },
        );
    }

    const { projectName } = await request.json();

    if (!projectName) {
        return NextResponse.json(
            { error: "Project name is required" },
            { status: 400 },
        );
    }

    const project = await getProject(projectName);

    if (!project) {
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404 },
        );
    }

    return NextResponse.json(project);
}

export async function POST(request: NextRequest) {
    const id = request.headers.get("Authorization")?.split(" ")[1];

    if (!id) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 },
        );
    }

    const { projectName, repositoryId, messages, name } = await request.json();

    const project = await createProject(
        id,
        projectName,
        repositoryId,
        messages,
        name,
    );

    if (!project) {
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404 },
        );
    }
}
