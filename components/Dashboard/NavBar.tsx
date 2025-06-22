"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppContext, AppContextType } from "@/contexts/AppContext";
import { tokenParser } from "@/lib/tokenParser";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LuArrowLeft, LuBell, LuCreditCard, LuPlus } from "react-icons/lu";
import LoadingBar from "react-top-loading-bar";
import LoadingAnimation from "../common/LoadingAnimation";

const NavBar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [notifications, setNotifications] = useState(true);
  const [backHomeLoading, setBackHomeLoading] = useState(false);
  const { navbarTitle, storedUser, setRepositoriesUpdated, stopAllActions } =
    useContext(AppContext) as AppContextType;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(100);
  }, []);

  return (
    <>
      <LoadingBar
        color="#1496D8"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div
        className={`flex justify-between items-center px-6 py-4 h-16 border-b border-[#3D444D]`}
      >
        <div className="flex items-center gap-4">
          {pathname === "/dashboard" ? (
            <p className="text-xs">Home</p>
          ) : (
            <Link
              href="/dashboard"
              onClick={() => setBackHomeLoading(true)}
              className="text-[#8b929d] flex items-center gap-2"
            >
              {backHomeLoading ? (
                <LoadingAnimation />
              ) : (
                <LuArrowLeft size={18} />
              )}

              <p className="text-xs">Back Home</p>
            </Link>
          )}

          <h1 className="font-semibold text-sm border-l border-[#3D444D] pl-4 py-2">
            {navbarTitle}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-800">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfhb7jq5653iPXupiCsMp7FuhO2OmkeSNTpQq-fZa9ULMwgDw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
            >
              Feedback
            </a>
          </div>
          <div className="border-l flex items-center gap-2 border-[#3D444D] pl-4">
            <TooltipProvider delayDuration={0}>
              {user && (
                <Tooltip>
                  <TooltipTrigger>
                    <a
                      href={
                        stopAllActions
                          ? "#"
                          : `https://github.com/apps/gitdocs-ai/installations/new`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setRepositoriesUpdated(true)}
                      className="flex items-center gap-2 border border-[#3D444D] rounded-md px-2 py-1.5 hover:bg-gray-800"
                    >
                      <LuPlus size={18} />
                      <p className="text-xs">New</p>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={8}
                    className="bg-[#E8E8E9] text-black"
                  >
                    <p className="text-xs">Add New Repository</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href="/subscription"
                    className="flex items-center gap-2 border border-[#3D444D] rounded-md px-2 py-1.5 hover:bg-gray-800"
                  >
                    <LuCreditCard size={18} />
                    <p className="text-xs">
                      Tokens:{" "}
                      {tokenParser(
                        (storedUser?.usageOverview?.totalTokens || 0) -
                          (storedUser?.usageOverview?.tokensUsed || 0),
                      )}
                    </p>
                  </Link>
                </TooltipTrigger>

                <TooltipContent
                  side="bottom"
                  sideOffset={8}
                  className="bg-[#E8E8E9] text-black"
                >
                  <p className="text-xs">Remaining Tokens</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="border-l border-[#3D444D] pl-4">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="relative hover:bg-gray-800 rounded-md p-2">
                    <LuBell size={20} />
                    {notifications && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-[#DF737D] rounded-full"></div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  sideOffset={8}
                  className="bg-[#E8E8E9] text-black"
                >
                  <p className="text-xs">Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      {(storedUser?.usageOverview?.totalTokens || 0) -
        (storedUser?.usageOverview?.tokensUsed || 0) <
        500 && (
        <div className="sticky top-0 z-40 flex items-center justify-center text-[0.9rem] gap-4 px-6 py-4 h-11 bg-[#483C16] text-[#FFC106] tracking-wide">
          Please add tokens in your account in to continue generating README
          files with GitDocs AI.
        </div>
      )}
    </>
  );
};

export default NavBar;
