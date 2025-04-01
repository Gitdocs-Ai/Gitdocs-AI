import { getAuthenticatedOctokit } from "@/app/api/lib/githubOctokit";

export const fetchRepositoriesForInstallation = async (
  installationId: number,
) => {
  const octokit = getAuthenticatedOctokit(installationId);

  try {
    const { data } = await octokit.request(
      "GET /installation/repositories",
      {},
    );

    return data.repositories;
  } catch (error) {
    console.error("Error fetching repositories for installation:", error);
    throw new Error("Failed to fetch repositories");
  }
};

export const fetchRepositoryReadme = async (
  owner: string,
  repo: string,
  installationId: number,
) => {
  const octokit = getAuthenticatedOctokit(installationId);

  try {
    const { data } = await octokit.request("GET /repos/{owner}/{repo}/readme", {
      owner,
      repo,
    });

    if (!data) {
      return null;
    }

    if (data.encoding === "base64") {
      const decodedContent = Buffer.from(data.content, "base64").toString(
        "utf-8",
      );
      return {
        ...data,
        decodedContent,
      };
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching repository readme:", error);

    if (error.response?.status === 404) {
      // Explicitly log or handle 404 errors if needed
      console.warn(`README not found for repository: ${owner}/${repo}`);
      return null; // No README exists for this repository
    }

    throw new Error(`Failed to fetch repository README for ${owner}/${repo}`);
  }
};
