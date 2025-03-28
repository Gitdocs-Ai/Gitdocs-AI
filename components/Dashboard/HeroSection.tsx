"use client";

import { useUser } from "@clerk/nextjs";
import { AppContext, AppContextType } from "@/contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { LuPlus, LuLayoutGrid, LuList, LuFolderOpen } from "react-icons/lu";
import RepoCards from "../common/RepoCards";
import LoadingAnimation from "../common/LoadingAnimation";
import axios from "axios";
import RepoList from "../common/RepoList";
import { PiInfo, PiWarning } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import GettingStarted from "../common/GettingStarted";
import LoadingSkeleton from "./LoadingSkeleton";
import { TfiWrite } from "react-icons/tfi";

interface Repository {
    name: string;
    gitLink: string;
    lastUpdated: string;
    status: string;
    recentCommitDescription: string;
    starred: boolean;
    suggestions?: number;
    visibility?: string;
    score?: number;
}

const HeroSection = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, isSignedIn } = useUser();
    const {
        gridView,
        setGridView,
        repositoriesUpdated,
        setRepositoriesUpdated,
        storedUser,
        setStoredUser,
        stopAllActions,
        setStopAllActions,
        setNumRepositories,
    } = useContext(AppContext) as AppContextType;
    const [repositoriesLoading, setRepositoriesLoading] = useState(false);
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [showProjects, setShowProjects] = useState(false);

    useEffect(() => {
        if (searchParams.get("tab")) {
            if (searchParams.get("tab") === "projects") {
                setShowProjects(true);
            }
            router.push("/dashboard");
        }
    }, [searchParams, router]);

    useEffect(() => {
        if (user && isSignedIn && !storedUser) {
            // Fetch user data from the backend
            axios
                .get(`/api/fetch/userdata`, {
                    headers: {
                        Authorization: `Bearer ${user.id}`,
                    },
                })
                .then((response) => {
                    const fetchedUser = response.data;

                    // Update state and localStorage with fetched user data
                    setStoredUser(fetchedUser);
                    localStorage.setItem(
                        "storedUser",
                        JSON.stringify(fetchedUser),
                    );
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [user, isSignedIn, storedUser, setStoredUser]);

    useEffect(() => {
        if (user && isSignedIn && (storedUser?.stepsCompleted || 0) >= 2) {
            setRepositoriesLoading(true);
            let storedRepositories = localStorage.getItem("repositories");
            let staleTime = localStorage.getItem("staleTime");

            if (staleTime) {
                const timeDiff =
                    new Date().getTime() - new Date(staleTime).getTime();
                if (timeDiff > 1000 * 60 * 5) {
                    localStorage.removeItem("repositories");
                    localStorage.removeItem("staleTime");
                    storedRepositories = null;
                    staleTime = null;
                }
            }

            if (storedRepositories && !searchParams.get("refresh")) {
                setRepositories(JSON.parse(storedRepositories));
                setNumRepositories(
                    JSON.parse(localStorage.getItem("numRepositories") || "0"),
                );
                setRepositoriesLoading(false);
            } else {
                axios
                    .get(`/api/fetch/repositorydata`, {
                        headers: {
                            Authorization: `Bearer ${user.id}`,
                        },
                    })

                    .then((response) => {
                        setRepositories(response.data);
                        localStorage.setItem(
                            "repositories",
                            JSON.stringify(response.data),
                        );
                        localStorage.setItem(
                            "staleTime",
                            new Date().toISOString(),
                        );
                        localStorage.setItem(
                            "numRepositories",
                            JSON.stringify(response.data.length),
                        );
                        setRepositoriesLoading(false);
                        setNumRepositories(response.data.length);
                        router.push("/dashboard");
                    })
                    .catch((error) => {
                        console.error("Error fetching repositories:", error);
                        setRepositoriesLoading(false);
                    });
            }
        }
    }, [
        user,
        searchParams,
        repositoriesUpdated,
        isSignedIn,
        storedUser,
        router,
        setNumRepositories,
    ]);

    const handleAddRepository = () => {
        if (stopAllActions) {
            return;
        }
        setRepositoriesUpdated(true);
    };

    const handleGridView = (view: string) => {
        setGridView(view === "grid");
        localStorage.setItem("gridView", `${view === "grid"}`);
    };

    const handleStarClick = (repoName: string) => {
        const updatedRepositories = repositories.map((repo) =>
            repo.name === repoName ? { ...repo, starred: !repo.starred } : repo,
        );
        setRepositories(updatedRepositories);
    };

    const handleRefresh = () => {
        setRepositoriesUpdated(false);
        router.push("/dashboard?refresh=true");
        router.refresh();
    };

    return (
        <div
            className={`flex flex-col gap-4 px-10 py-5 min-h-[calc(100vh-64px)]`}
        >
            <div>
                <h1 className="w-fit">
                    {user && !((storedUser?.stepsCompleted || 0) < 3) ? (
                        <>
                            Welcome, {user.fullName || user.firstName || "User"}
                            <hr className="border-[#3D444D] mt-1" />
                        </>
                    ) : null}
                </h1>
                <div className="flex items-center mt-5 justify-between">
                    {user && !((storedUser?.stepsCompleted || 0) < 3) && (
                        <>
                            <h2 className="text-2xl font-bold text-white">
                                Overview
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-[#383737] rounded-sm">
                                    <button
                                        className={`text-sm hover:text-white px-3 py-[9px] border-r border-[#383737] rounded-l-sm flex items-center gap-2 ${
                                            gridView
                                                ? "bg-[#1f1f1f] text-white"
                                                : "bg-transparent text-[#a0a0a3]"
                                        }`}
                                        onClick={() => handleGridView("grid")}
                                    >
                                        <LuLayoutGrid size={16} />
                                    </button>
                                    <button
                                        className={`text-sm hover:text-white px-3 py-[9px] flex items-center gap-2 rounded-r-sm ${
                                            gridView
                                                ? "bg-transparent text-[#a0a0a3]"
                                                : "bg-[#1f1f1f] text-white"
                                        }`}
                                        onClick={() => handleGridView("list")}
                                    >
                                        <LuList size={18} />
                                    </button>
                                </div>
                                <a
                                    href="https://github.com/apps/gitdocs-ai/installations/new"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm bg-[#0791F9] hover:bg-[#3196e3] text-white rounded-md px-4 py-2 flex items-center gap-2"
                                    onClick={() => handleAddRepository()}
                                >
                                    {repositoriesLoading ? (
                                        <LoadingAnimation />
                                    ) : (
                                        <LuPlus size={16} />
                                    )}
                                    Add New Repository
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {user && !((storedUser?.stepsCompleted || 0) < 3) ? (
                <div className="bg-[#0D0D0D] text-[#EDEDED]">
                    {repositoriesUpdated && (
                        <div className="flex items-center justify-between border py-1.5 px-3 rounded-md border-[#F18B65] gap-4 h-full w-full">
                            <div className="flex items-center gap-2 text-[#F18B65]">
                                <PiWarning size={18} />
                                <h3 className="text-sm text-[#F18B65]">
                                    Repositories updated, click to refresh
                                </h3>
                            </div>
                            <button
                                className="text-sm p-1 flex items-center gap-2 text-[#F18B65] hover:underline"
                                onClick={() => handleRefresh()}
                            >
                                refresh
                            </button>
                        </div>
                    )}

                    {showProjects && (
                        <div className="flex items-center justify-between border py-1.5 px-3 rounded-md border-[#0791F9] gap-4 h-full w-full">
                            <div className="flex items-center gap-2 text-[#0791F9]">
                                <PiInfo size={18} />
                                <h3 className="text-sm text-[#0791F9] flex items-center gap-4">
                                    Add Repositories here, and click on the
                                    <button
                                        className={`text-sm border-[#383737] flex gap-2 items-center hover:bg-[#1f1f1f] border px-2 py-[7px] text-[#ededed] cursor-pointer my-1`}
                                        disabled={true}
                                    >
                                        <TfiWrite size={16} />
                                        <span className="text-xs">
                                            Update Readme
                                        </span>
                                    </button>
                                    button to start generating Readme with
                                    Gitdocs AI
                                </h3>
                            </div>
                            <button
                                className="text-sm p-1 flex items-center gap-2 text-[#0791F9] hover:underline"
                                onClick={() => setShowProjects(false)}
                            >
                                close
                            </button>
                        </div>
                    )}

                    <div
                        className={`w-full mt-5 grid-cols-3 ${gridView ? "grid gap-4" : "flex flex-col gap-4"}`}
                    >
                        {repositoriesLoading ? (
                            [...Array(5)].map((_, index) => (
                                <LoadingSkeleton key={index} />
                            ))
                        ) : repositories.length > 0 ? (
                            gridView ? (
                                repositories.map((repo, index) => (
                                    <RepoCards
                                        key={index}
                                        repo={{
                                            ...repo,
                                            suggestions: repo.suggestions || 0,
                                            visibility:
                                                repo.visibility || "public",
                                            score: repo.score || 0,
                                        }}
                                        handleStarClick={handleStarClick}
                                    />
                                ))
                            ) : (
                                repositories.map((repo, index) => (
                                    <RepoList
                                        key={index}
                                        repo={{
                                            ...repo,
                                            suggestions: repo.suggestions || 0,
                                            visibility:
                                                repo.visibility || "public",
                                            score: repo.score || 0,
                                        }}
                                        handleStarClick={handleStarClick}
                                    />
                                ))
                            )
                        ) : (
                            <div className="flex flex-col items-center col-span-full justify-center h-full bg-[#141414] border border-[#262626] rounded-md py-10">
                                <LuFolderOpen
                                    className="text-[#a0a0a3] mb-5"
                                    size={40}
                                />
                                <h3 className="font-bold text-2xl">
                                    No repositories added yet
                                </h3>
                                <p className="text-[#a0a0a3]">
                                    Add a repository to get started
                                </p>
                                <a
                                    href="https://github.com/apps/gitdocs-ai/installations/new"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm bg-[#0791F9] mt-5 hover:bg-[#3196e3] text-white rounded-md px-4 py-2 flex items-center gap-2"
                                    onClick={() => handleAddRepository()}
                                >
                                    {repositoriesLoading ? (
                                        <LoadingAnimation />
                                    ) : (
                                        <LuPlus size={16} />
                                    )}
                                    Add New Repository
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center h-full w-full bg-[#0D0D0D] text-[#EDEDED]">
                    <GettingStarted />
                </div>
            )}
        </div>
    );
};

export default HeroSection;
