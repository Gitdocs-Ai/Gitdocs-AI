import { FaGithub } from "react-icons/fa";
import { Star } from "lucide-react";
import updatedAgo from "@/lib/UpdatedDate";
import RepoTools from "./RepoTools";
import Link from "next/link";

interface Repo {
    name: string;
    gitLink: string;
    lastUpdated: string;
    status: string;
    recentCommitDescription: string;
    suggestions: number;
    visibility: string;
    starred: boolean;
    score: number;
}

const RepoCards = ({
    repo,
    handleStarClick,
}: {
    repo: Repo;
    handleStarClick: (repoName: string) => void;
}) => {
    const colors = [
        "#FFA500", // Orange
        "#87CEEB", // Sky Blue
        "#FF007F", // Deep Pink
        "#9A4FEA", // Electric Purple
        "#FFD700", // Gold
        "#98FF98", // Pale Green
        "#FF6F61", // Coral
        "#40E0D0", // Turquoise
        "#00FFFF", // Aqua
        "#32CD32", // Lime Green
        "#8BD375", // Soft Green
        "#FFB6C1", // Light Pink
        "#FFA07A", // Light Salmon
        "#7B68EE", // Medium Slate Blue
        "#9370DB", // Medium Purple
        "#00FA9A", // Medium Spring Green
        "#FF6347", // Tomato
        "#20B2AA", // Light Sea Green
        "#FF4500", // Orange Red
        "#F0E68C", // Khaki
        "#5F9EA0", // Cadet Blue
        "#B0C4DE", // Light Steel Blue
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className="border border-[#232323] hover:border-[#3196e3] bg-[#121212] transition-all duration-150 overflow-hidden px-6 pt-4 pb-2.5 rounded-lg shadow-sm">
            <div className="mb-3 flex items-center justify-between font-medium text-[#dedbdb]">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-full user-select-none text-black text-xl font-bold flex items-center justify-center`}
                        style={{ backgroundColor: randomColor }}
                    >
                        {repo.name.charAt(0).toUpperCase() +
                            repo.name.charAt(1).toUpperCase()}
                    </div>
                    <p className="truncate max-w-[170px]">{repo.name}</p>
                    <p className="text-xs rounded-full bg-[#171717] px-2 py-1 text-gray-500">
                        {repo.visibility}
                    </p>
                </div>

                {repo.starred ? (
                    <Star
                        size={20}
                        className="text-[#F8C75D] cursor-pointer"
                        onClick={() => handleStarClick(repo.name)}
                    />
                ) : (
                    <Star
                        size={20}
                        className="text-gray-500 cursor-pointer"
                        onClick={() => handleStarClick(repo.name)}
                    />
                )}
            </div>

            <Link
                href={repo.gitLink}
                target="_blank"
                className="mb-3 text-[#dbd5d5] flex items-center max-w-72 gap-2 rounded-full bg-[#1A1A1A] px-4 py-2 w-fit"
            >
                <FaGithub size={16} />
                <p className="truncate text-xs font-semibold hover:underline">
                    {repo.gitLink.split("github.com/")[1]}
                </p>{" "}
                {/* Extract username/repository */}
            </Link>

            <p className="text-xs text-gray-500">
                {repo.recentCommitDescription}
            </p>

            <p className="text-xs text-gray-500 mt-2">
                Last Updated:{" "}
                {updatedAgo(new Date(repo.lastUpdated)) < 7
                    ? updatedAgo(new Date(repo.lastUpdated)) + " days ago"
                    : "on " + new Date(repo.lastUpdated).toLocaleDateString()}
            </p>

            <div className="flex items-center gap-3 ms-1"></div>
            <RepoTools doc_name={repo.name} doc_score={repo.score} />
        </div>
    );
};
export default RepoCards;
