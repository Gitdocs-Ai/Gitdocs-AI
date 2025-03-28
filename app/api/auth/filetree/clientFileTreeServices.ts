import { getAuthenticatedOctokit } from "@/app/api/lib/githubOctokit";
import User from "@/app/api/lib/models/User";
import { minimatch } from "minimatch";
import connectMongoWithRetry from "@/app/api/lib/db/connectMongo";

const ignoreFileTreeItemsList = [
    // Dependency and build artifacts
    "node_modules",
    "dist",
    "build",
    "out",
    ".output",
    "coverage",
    ".cache",
    "public",
    "static",
    "uploads",
    "tmp",
    ".temp",
    "cache",
    "logs",
    ".vercel",
    ".serverless",
    ".svelte-kit",
    ".astro",
    ".next",
    "storybook-static",
    "README.md",
    "package.json",

    // Version control
    ".git",
    ".github",
    ".gitignore",
    ".gitattributes",
    ".gitmodules",
    ".svn",
    ".hg",
    ".bzr",

    // IDE/Editor configs
    ".vscode",
    ".idea",
    ".history",
    ".vs",
    ".suo",
    ".ntvs",
    ".njsproj",
    ".sln",
    ".swp",
    ".swo",
    ".vim",

    // Runtime/config files
    ".env",
    ".env.*",
    ".flaskenv",
    ".python-version",
    ".ruby-version",
    ".node-version",
    ".nvmrc",
    ".editorconfig",
    ".dockerignore",
    ".slugignore",

    // Lockfiles and package managers
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "shrinkwrap.yaml",
    "composer.lock",
    "Gemfile.lock",
    "Pipfile.lock",
    "poetry.lock",
    "bun.lockb",
    "packages.lock.json",

    // Config files
    "*.config.*",
    ".*rc",
    ".*rc.*",
    "tsconfig.*",
    "jsconfig.json",
    "webpack.config.*",
    "rollup.config.*",
    "vite.config.*",
    "vitest.config.*",
    "jest.config.*",
    "karma.conf.*",
    "babel.config.*",
    "postcss.config.*",
    "tailwind.config.*",
    "gulpfile.*",
    "gruntfile.*",
    "metro.config.*",
    "craco.config.*",
    "vue.config.*",
    "nuxt.config.*",
    "next.config.*",
    "svelte.config.*",
    "astro.config.*",
    "remix.config.*",
    "eslint.*",
    "prettier.*",
    "stylelint.*",
    "commitlint.*",
    "lint-staged.*",
    "husky.config.*",
    "components.json",

    // Test-related
    "tests",
    "test",
    "spec",
    "cypress",
    "e2e",
    "__mocks__",
    "__snapshots__",
    "__tests__",
    "__fixtures__",
    "jest.setup.*",
    "playwright.config.*",
    "cypress.config.*",
    "k6.config.*",

    // TypeScript declarations
    "*.d.ts",
    "*.d.cts",
    "*.d.mts",

    // Build tools
    "Makefile",
    "Dockerfile",
    "docker-compose.*",
    "Procfile",
    "Vagrantfile",
    "Jenkinsfile",
    ".travis.yml",
    ".circleci",
    ".github/workflows",

    // Documentation
    "CHANGELOG.md",
    "CHANGES.md",
    "LICENSE",
    "LICENCE",
    "SECURITY.md",
    "CONTRIBUTING.md",
    "AUTHORS",
    ".all-contributorsrc",

    // Misc technical files
    "*.log",
    "*.tmp",
    "*.bak",
    "*.pid",
    "*.seed",
    "*.pid.lock",
    "*.patch",
    "*.rej",
    "*.iml",
    "*.log.*",
    "*.sql",
    "*.sqlite",
    "*.sublime-workspace",

    // OS metadata
    ".DS_Store",
    "Thumbs.db",
    "desktop.ini",

    // Security
    ".htaccess",
    "nginx.conf",
    "*.key",
    "*.pem",
    "*.crt",
    "*.cer",
    "*.pfx",

    // Visual configs
    ".styleci.yml",
    ".prettierignore",
    ".eslintignore",
    ".gitkeep",
    ".npmignore",

    // Benchmarking/profiling
    "*.cpuprofile",
    "*.heapsnapshot",
    "*.heapprofile",

    // explicit pattern files
    "eslint.config.*",
    "*.d.ts",
    "next-auth.d.ts",
    "next.config.*",
    "postcss.config.*",
    "tailwind.config.*",
    "tsconfig.json",
];

// Minimal type representing the repository content items
type RepoContentItem = {
    type: "file" | "dir" | "symlink" | "submodule";
    name: string;
};

type RepoContent = RepoContentItem | RepoContentItem[];

export async function getFileTree(
    userId: string,
    doc_name: string,
    path: string,
) {
    try {
        await connectMongoWithRetry();
        const user = await User.findOne(
            { clerkUid: userId },
            { installationId: 1, githubUsername: 1 },
        );

        if (!user || !user.installationId || !user.githubUsername) {
            return "Data not found";
        }

        const octokit = getAuthenticatedOctokit(Number(user.installationId));

        const response = await octokit.repos.getContent({
            owner: user.githubUsername,
            repo: doc_name,
            path,
        });

        const data = response.data as RepoContent;

        const getFullPath = (itemName: string) => {
            return path ? `${path}/${itemName}` : itemName;
        };

        if (Array.isArray(data)) {
            // Modified filter logic
            const shouldIgnore = (fullPath: string) => {
                return ignoreFileTreeItemsList.some((pattern) =>
                    minimatch(fullPath, pattern, {
                        dot: true,
                        matchBase: true,
                    }),
                );
            };

            const filtered = data.filter((item) => {
                const fullPath = getFullPath(item.name);
                return !shouldIgnore(fullPath);
            });

            // Sort: directories first, then files
            const sorted = filtered.sort((a, b) => {
                if (a.type === b.type) return 0;
                return a.type === "dir" ? -1 : 1;
            });

            // Map: wrap directories in an array, leave files as strings
            const initialTree = sorted.map((item) =>
                item.type === "dir" ? [item.name] : item.name,
            );

            return initialTree;
        } else {
            const fullPath = getFullPath(data.name);
            if (ignoreFileTreeItemsList.includes(fullPath)) {
                return [];
            }
            return data.type === "dir" ? [[data.name]] : [data.name];
        }
    } catch (error) {
        console.error("Error fetching initial tree:", error);
        return ["Error fetching initial tree"];
    }
}

export async function getFileData(
    userId: string,
    files: string[],
    doc_name: string,
) {
    if (files.length === 0) {
        return "No files to fetch";
    }

    if (!userId || !files) {
        return "Data not found";
    }

    await connectMongoWithRetry();
    const user = await User.findOne(
        { clerkUid: userId },
        { installationId: 1, githubUsername: 1 },
    );

    if (!user || !user.installationId || !user.githubUsername) {
        return "Data not found";
    }

    const octokit = getAuthenticatedOctokit(Number(user.installationId));

    const fileContentPromises = files.map((path) =>
        octokit.repos.getContent({
            owner: user.githubUsername,
            repo: doc_name,
            path,
        }),
    );

    try {
        const fileContents = await Promise.all(fileContentPromises);

        const decodedFiles: Array<{ name: string; content: string }> = [];

        fileContents.forEach((response) => {
            const data = response.data;

            if (!Array.isArray(data) && data.type === "file") {
                const { content, encoding, name } = data;
                let decodedContent: string;

                if (encoding === "base64") {
                    decodedContent = Buffer.from(content, "base64").toString(
                        "utf8",
                    );
                } else {
                    decodedContent = content;
                }

                decodedFiles.push({
                    name: name,
                    content: decodedContent,
                });
            } else {
                console.log("The response is not a file.");
            }
        });

        return decodedFiles;
    } catch (error) {
        console.error("Error fetching file contents:", error);
    }
}

const ignorePatterns = [
    // High-level directories to completely ignore
    "dist/**",
    "build/**",
    ".next/**",
    "out/**",
    "node_modules/**",
    "bower_components/**",
    "**/vendor/**",
    "**/public/**",
    "**/.git/**",
    "**/.github/**",

    // Test directories
    "**/tests/**",
    "**/test/**",
    "**/__tests__/**",
    "**/__mocks__/**",
    "**/cypress/**",

    // Common utility/UI folders
    "**/ui/**",
    "**/components/**",
    "**/component/**",
    "**/hooks/**",
    "**/contexts/**",
    "**/utils/**",
    "**/helpers/**",
    "**/styles/**",

    // Static/asset files
    "**/*.svg",
    "**/*.png",
    "**/*.jpg",
    "**/*.ico",
    "**/*.css",
    "**/*.scss",
    "**/*.less",

    // Config files (consolidated)
    "**/*.config.*",
    "**/*.json",
    "**/webpack.*",
    "**/babel.*",
    "**/postcss.*",
    "**/eslint.*",

    // Static site pages
    "**/app/privacy/**",
    "**/app/terms/**",
    "**/app/contact/**",
    "**/app/blog/**",
    "**/app/sign-in/**",
    "**/app/sign-up/**",
    "**/app/loading/**",
    "**/app/not-found.tsx",
];

// Simplified include list focusing on core application code patterns
const includePatterns = [
    // Core app files
    "app/layout.tsx",
    "app/page.tsx",

    // Main code directories across frameworks
    "app/api/**",
    "api/**",
    "**/models/**",
    "**/controllers/**",
    "**/services/**",
    "**/routes/**",
    "**/core/**",
    "**/features/**",
    "**/domain/**",
    "**/resolvers/**",

    // Important config files
    "**/settings.py",
    "**/urls.py",
    "Dockerfile",
    "docker-compose.yml",
];

export async function getAllFilePaths(
    userId: string,
    repo: string,
    path: string = "",
): Promise<string[]> {
    try {
        await connectMongoWithRetry();
        const user = await User.findOne(
            { clerkUid: userId },
            { installationId: 1, githubUsername: 1 },
        );

        if (!user?.installationId || !user?.githubUsername) {
            return [];
        }

        const octokit = getAuthenticatedOctokit(Number(user.installationId));

        // Use GitHub's recursive parameter to get all content at once instead of traversing directories
        // This drastically reduces API calls
        async function getAllRepoContent(path: string = ""): Promise<string[]> {
            try {
                // Get the git tree recursively
                const { data } = await octokit.git.getTree({
                    owner: user.githubUsername,
                    repo: repo,
                    tree_sha: "HEAD",
                    recursive: "1",
                });

                if (!data.tree) {
                    return [];
                }

                // Filter to just files (not directories)
                return data.tree
                    .filter((item) => item.type === "blob" && item.path)
                    .map((item) => item.path!)
                    .filter((filePath) => {
                        // A file is included if it matches any include pattern AND doesn't match any ignore pattern
                        const isIncluded = includePatterns.some((pattern) =>
                            minimatch(filePath, pattern, {
                                dot: true,
                                matchBase: true,
                            }),
                        );

                        const isIgnored = ignorePatterns.some((pattern) =>
                            minimatch(filePath, pattern, {
                                dot: true,
                                matchBase: true,
                            }),
                        );

                        return isIncluded && !isIgnored;
                    });
            } catch (error) {
                console.error("Error fetching repository content:", error);

                // Fallback to traditional traversal if recursive fetch fails
                // Some repos may be too large for recursive fetching
                return fallbackFetchFiles(path);
            }
        }

        // Fallback method for large repositories where the tree API might time out
        async function fallbackFetchFiles(
            path: string = "",
        ): Promise<string[]> {
            const allFiles: string[] = [];
            const dirQueue: string[] = [path];

            // Use a queue-based approach instead of recursion to avoid stack overflow
            while (dirQueue.length > 0) {
                const currentPath = dirQueue.shift() || "";

                // Skip the directory completely if it matches any ignore pattern
                if (
                    ignorePatterns.some((pattern) =>
                        minimatch(currentPath, pattern, {
                            dot: true,
                            matchBase: true,
                        }),
                    )
                ) {
                    continue;
                }

                try {
                    const response = await octokit.repos.getContent({
                        owner: user.githubUsername,
                        repo: repo,
                        path: currentPath,
                    });

                    const data = response.data as RepoContent;

                    if (Array.isArray(data)) {
                        for (const item of data) {
                            const itemPath = currentPath
                                ? `${currentPath}/${item.name}`
                                : item.name;

                            if (item.type === "dir") {
                                dirQueue.push(itemPath);
                            } else if (item.type === "file") {
                                // Apply our filtering rules
                                const isIncluded = includePatterns.some(
                                    (pattern) =>
                                        minimatch(itemPath, pattern, {
                                            dot: true,
                                            matchBase: true,
                                        }),
                                );

                                const isIgnored = ignorePatterns.some(
                                    (pattern) =>
                                        minimatch(itemPath, pattern, {
                                            dot: true,
                                            matchBase: true,
                                        }),
                                );

                                if (isIncluded && !isIgnored) {
                                    allFiles.push(itemPath);
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error(`Error reading ${currentPath}:`, error);
                }
            }

            return allFiles;
        }

        // Try the faster method first, fall back to traditional if needed
        return await getAllRepoContent(path);
    } catch (error) {
        console.error("Error fetching files:", error);
        return [];
    }
}
