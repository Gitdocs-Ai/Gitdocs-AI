import { getAuthenticatedOctokit } from "@/app/api/lib/githubOctokit";

export const commitChanges = async (
    owner: string,
    repo: string,
    installationId: number,
    message: string,
    content: string,
    branch: string,
) => {
    const octokit = getAuthenticatedOctokit(installationId);

    const filePath = "README.md";
    const commitMessage = message;
    const newContent = content;

    try {
        const { data } = await octokit.repos.getContent({
            owner,
            repo,
            path: filePath,
            ref: branch,
        });

        const fileSHA = (data as any).sha;

        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: filePath,
            message: commitMessage,
            content: Buffer.from(newContent).toString("base64"),
            sha: fileSHA,
            branch,
        });
    } catch (error: any) {
        if (error.status === 404) {
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path: filePath,
                message: commitMessage,
                content: Buffer.from(newContent).toString("base64"),
                branch,
            });
        } else {
            console.error("Error updating README.md:", error.message);
        }
    }
};
