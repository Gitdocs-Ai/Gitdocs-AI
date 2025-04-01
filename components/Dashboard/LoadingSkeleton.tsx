import { Skeleton } from "@/components/ui/skeleton";
import updatedAgo from "@/lib/UpdatedDate";
import { Link } from "lucide-react";
import { Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { LuFolder } from "react-icons/lu";

const LoadingSkeleton = () => {
  const repo = {
    name: "Loading...",
    visibility: "public",
    score: 0,
    suggestions: 0,
    gitLink: "Loading...",
    lastUpdated: "Loading...",
    status: "Loading...",
    recentCommitDescription: "Loading...",
    starred: false,
  };

  return (
    <div className="border border-[#232323] bg-[#0A0A0A] overflow-hidden p-6 rounded-lg shadow-sm">
      <div className="mb-3 flex items-center justify-between font-medium text-[#dedbdb]">
        <div className="flex items-center gap-2">
          <Skeleton className="bg-[#171717] w-10 h-10 rounded-full"></Skeleton>

          <Skeleton className="flex items-center gap-2 bg-[#171717] w-[170px] h-5 rounded-full"></Skeleton>
        </div>

        <Skeleton className="bg-[#171717] w-6 h-6 rounded-full"></Skeleton>
      </div>

      <Skeleton className="mb-3 text-[#dbd5d5] h-4 flex items-center gap-2 rounded-full w-4/5 bg-[#1A1A1A] px-4 py-2"></Skeleton>

      <Skeleton className="text-xs text-gray-500 mt-3 h-4 w-2/3 bg-[#171717] rounded-full"></Skeleton>

      <Skeleton className="text-xs text-gray-500 mt-3 h-4 w-1/2 bg-[#171717] rounded-full"></Skeleton>

      <div className="flex items-center gap-3 ms-1"></div>
    </div>
  );
};
export default LoadingSkeleton;
