import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { fetchRepositoriesForInstallation } from "../../repository/fetchRepositories";
import {
  parseRepositories,
  updateRepositoryDb,
} from "../../repository/updateRepositoryDb";
import { auth } from "@clerk/nextjs/server";
import { updateUserDb } from "../../user/updateUserDb";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  let installationId = url.searchParams.get("installation_id");

  if (!code) {
    return NextResponse.json(
      { error: "No code received from GitHub" },
      { status: 400 },
    );
  }

  try {
    // Step 1: Exchange the code for an access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID || "",
          client_secret: process.env.GITHUB_CLIENT_SECRET || "",
          code,
          redirect_uri: process.env.GITHUB_REDIRECT_URI || "",
        },
        headers: { Accept: "application/json" },
      },
    );

    if (!tokenResponse.data.access_token) {
      throw new Error("Failed to get access token");
    }

    const { access_token } = tokenResponse.data;

    // Step 2: Get the user's GitHub data
    const { data: userData } = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const githubUserId = userData.id;
    const githubUsername = userData.login;

    // Step 3: Validate or fetch `installationId`
    if (!installationId) {
      const { data: installations } = await axios.get(
        "https://api.github.com/user/installations",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );

      if (!installations.total_count) {
        return NextResponse.json(
          { error: "No installations found for the user" },
          { status: 404 },
        );
      }

      installationId = await installations.installations[0].id.toString();
    }

    // Update user database asynchronously
    if (userId) {
      await updateUserDb(userId, githubUserId, installationId, githubUsername);
    }

    try {
      const repositories = await fetchRepositoriesForInstallation(
        Number(installationId),
      );
      const parsedRepositories = await parseRepositories(repositories);

      await updateRepositoryDb(
        parsedRepositories,
        userId || "",
        Number(installationId),
        githubUsername,
        githubUserId,
      );
    } catch (error: any) {
      console.error("Error fetching repositories:", error.message);
    }

    // Step 5: Redirect the user
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || "https://gitdocs.space"}/close`,
    );
  } catch (error: any) {
    console.error("GitHub OAuth Error:", error.message || error);

    return NextResponse.json(
      {
        error: "Error during OAuth process",
        details: error.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}
