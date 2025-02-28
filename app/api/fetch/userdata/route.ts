import { NextRequest, NextResponse } from "next/server";
import { getUser, updateUser } from "@/app/api/auth/user/clientUserServicies";

// GET User Data
export async function GET(request: NextRequest) {
  const id = request.headers.get("Authorization")?.split(" ")[1];

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await getUser(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error); // Log detailed error for debugging
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

// PATCH User Data
export async function PATCH(request: NextRequest) {
  const id = request.headers.get("Authorization")?.split(" ")[1];

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const data = await request.json();

    // Validate incoming data
    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const updatedUser = await updateUser(id, data);

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found or update failed" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error); // Log detailed error for debugging
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
