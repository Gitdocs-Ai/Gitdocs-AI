import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

export const getAuthenticatedOctokit = (installationId: number) => {
  try {
    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: process.env.GITHUB_APP_ID || "",
        privateKey: process.env.GITHUB_PRIVATE_KEY?.replace(/\\n/g, '\n') || "",
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        installationId,
      },
    });
    console.log(process.env.GITHUB_APP_ID);
    console.log(process.env.GITHUB_CLIENT_ID);
    console.log(process.env.GITHUB_CLIENT_SECRET);
    console.log(process.env.GITHUB_PRIVATE_KEY?.replace(/\\n/g, '\n'));
    console.log(installationId);
    console.log("Octokit instance created successfully");
    return octokit;
  } catch (error) {
    console.error("Error creating Octokit instance:", error);
    throw new Error("Failed to authenticate Octokit");
  }
};