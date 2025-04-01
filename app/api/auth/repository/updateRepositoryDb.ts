import Repository from "@/app/api/lib/models/Repository";
import User from "@/app/api/lib/models/User";
import { fetchRepositoryReadme } from "./fetchRepositories";
import { updateReadmeDb } from "./updateReadmeDb";
import Readme from "../../lib/models/Readme";

interface Repository {
  name: string;
  repositoryId: string;
  description: string;
  gitLink: string;
  owner: string;
  readme: string;
  lastUpdated: string;
  status: string;
  recentCommitDescription: string;
  suggestions: number;
  visibility: string;
  starred: boolean;
}

export const parseRepositories = async (repositories: any) => {
  const parsedRepositories = repositories.map((repository: any) => {
    return {
      name: repository.name,
      repositoryId: repository.id,
      description: repository.description || "No description provided",
      gitLink: repository.html_url,
      owner: repository.owner.id,
      readme: "",
      lastUpdated: repository.updated_at,
      status: repository.status,
      recentCommitDescription: "",
      suggestions: 0,
      visibility: repository.visibility,
      starred: false,
    };
  });
  return parsedRepositories;
};

export const updateRepositoryDb = async (
  repositories: Repository[],
  userId: string,
  installationId: number,
  githubUsername: string,
  githubUserId: string,
) => {
  try {
    // Define batch size
    const BATCH_SIZE = 8;

    // Calculate the number of batches
    const totalRepos = repositories.length;
    const fullBatches = Math.floor(totalRepos / BATCH_SIZE);
    const remainder = totalRepos % BATCH_SIZE;

    // Process repositories in batches
    for (
      let batchIndex = 0;
      batchIndex < fullBatches + (remainder > 0 ? 1 : 0);
      batchIndex++
    ) {
      const start = batchIndex * BATCH_SIZE;
      const end = Math.min(start + BATCH_SIZE, totalRepos);
      const currentBatch = repositories.slice(start, end);

      // Process the current batch
      for (const repo of currentBatch) {
        try {
          // Use upsert to update if exists or insert if it doesn't
          const result = await Repository.updateOne(
            { repositoryId: repo.repositoryId },
            { $set: repo },
            { upsert: true },
          );

          if (result.upsertedId) {
            // If the repository was inserted, get the user and update their repositories array
            await User.updateMany(
              { clerkUid: userId },
              { $addToSet: { repositories: repo.repositoryId } },
            );

            const updateReadme = async () => {
              try {
                const readmeData = await fetchRepositoryReadme(
                  githubUsername,
                  repo.name,
                  Number(installationId),
                );

                if (readmeData) {
                  await updateReadmeDb(
                    githubUserId,
                    repo.repositoryId,
                    readmeData,
                  );
                } else {
                  console.warn(`No README found for repository: ${repo.name}`);
                }
              } catch (error) {
                console.error(`Error fetching README for ${repo.name}:`, error);
              }
            };

            updateReadme();
          }
        } catch (error) {
          if (isMongoError(error) && error.code === 11000) {
            console.error(
              `Repository with ID ${repo.repositoryId} already exists.`,
            );
          } else {
            throw error; // Rethrow other types of errors
          }
        }
      }

      // Optional: Add a small delay between batches if needed
      // await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Delete repositories in the database that are no longer in the passed list
    const retainedRepositoryIds = repositories.map((repo) => repo.repositoryId);

    await Repository.deleteMany({
      owner: githubUserId,
      repositoryId: { $nin: retainedRepositoryIds },
    });
    await Readme.deleteMany({
      owner: githubUserId,
      repositoryId: { $nin: retainedRepositoryIds },
    });

    // If some repositories were retained, also remove them from the user's repositories array
    if (retainedRepositoryIds.length > 0) {
      await User.updateMany(
        { clerkUid: userId },
        { $pull: { repositories: { $nin: retainedRepositoryIds } } },
      );
    }
  } catch (error) {
    console.error("Error syncing repositories:", error);
    throw error; // You can handle the error in your desired way
  }
};

// Utility function to narrow error to MongoDB error
const isMongoError = (error: any): error is { code: number } => {
  return typeof error === "object" && error !== null && "code" in error;
};
