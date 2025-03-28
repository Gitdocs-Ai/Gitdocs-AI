"use client";

import { useContext, SetStateAction, Dispatch } from "react";
import {
    CreditCard,
    MessageSquareText,
    Package,
    ScanSearch,
} from "lucide-react";
import { AppContext, AppContextType } from "@/contexts/AppContext";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import LoadingAnimation from "./LoadingAnimation";

const GettingStarted = () => {
    const activeClasses = "text-white text-lg";
    const inactiveClasses = "tracking-tight text-[#808080]";
    const completedClasses = "line-through text-[#808080]";
    const { storedUser, setStoredUser, setRepositoriesUpdated } = useContext(
        AppContext,
    ) as AppContextType;
    const { user } = useUser();
    const handleAddRepository = () => {
        try {
            if (storedUser?.stepsCompleted === 1) {
                // Update the state with the patched data
                setStoredUser({
                    ...storedUser,
                    stepsCompleted: 2,
                });

                // Update localStorage with the updated data
                localStorage.setItem(
                    "storedUser",
                    JSON.stringify({
                        ...storedUser,
                        stepsCompleted: 2,
                    }),
                );

                axios
                    .patch(
                        `/api/fetch/userdata`,
                        {
                            stepsCompleted: 2,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${user?.id}`,
                            },
                        },
                    )
                    .catch((error) => {
                        console.error("Error updating stepsCompleted:", error);
                    });
            }
        } catch (error) {
            console.error("Error updating stepsCompleted:", error);
        }
    };

    const handleViewDashboard = () => {
        try {
            if (storedUser?.stepsCompleted === 2) {
                // Update the state with the patched data
                setStoredUser({
                    ...storedUser,
                    stepsCompleted: 3,
                });
                localStorage.setItem(
                    "storedUser",
                    JSON.stringify({
                        ...storedUser,
                        stepsCompleted: 3,
                    }),
                );

                axios
                    .patch(
                        `/api/fetch/userdata`,
                        {
                            stepsCompleted: 3,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${user?.id}`,
                            },
                        },
                    )
                    .catch((error) => {
                        console.error("Error updating stepsCompleted:", error);
                    });
                setRepositoriesUpdated(true);
            }
        } catch (error) {
            console.error("Error updating stepsCompleted:", error);
        }
    };

    const buttonItems = [
        {
            icon: ScanSearch,
            label: "Docs Review",
            href: "/review",
            show: true,
        },
        {
            icon: CreditCard,
            label: "Add tokens",
            href: "#",
            show: (storedUser?.stepsCompleted || 1) >= 1 ? true : false,
        },
        {
            icon: MessageSquareText,
            label: "Feedback form",
            href: "https://docs.google.com/forms/d/e/1FAIpQLSfhb7jq5653iPXupiCsMp7FuhO2OmkeSNTpQq-fZa9ULMwgDw/viewform?usp=dialog",
            show: true,
        },
        {
            icon: Package,
            label: "AI Models",
            href: "/ai-models",
            show: true,
        },
    ];

    const stepsList = [
        {
            stepValue: 1,
            label: "Start by creating a new account on Gitdocs ai",
            isactive: (storedUser?.stepsCompleted || 0) === 0 ? true : false,
            isCompleted: (storedUser?.stepsCompleted || 0) >= 1 ? true : false,
        },
        {
            stepValue: 2,
            label: "Configure your github repository",
            isactive: (storedUser?.stepsCompleted || 0) === 1 ? true : false,
            isCompleted: (storedUser?.stepsCompleted || 0) >= 2 ? true : false,
        },
        {
            stepValue: 3,
            label: "Start generating readme files",
            isactive: (storedUser?.stepsCompleted || 0) === 2 ? true : false,
            isCompleted: (storedUser?.stepsCompleted || 0) >= 3 ? true : false,
        },
    ];

    return (
        <>
            <div className="bg-[#151616] h-80 rounded-xl w-full -mt-5 overflow-visible [clip-path:ellipse(100%_100%_at_center_top)]"></div>
            <div className="absolute h-[27rem] 2xl:h-[35rem] 2xl:w-[min(50%,900px)] w-2/3 rounded-xl flex justify-center items-center bg-[#141414] left-1/2 border border-[#242424] 2xl:-mt-28 -mt-14 top-0 transform -translate-x-1/2 translate-y-1/2">
                <div className="flex flex-col pt-16 justify-center items-center h-[92.7%] w-[96.7%] mt-0.5 bg-[#1a1b1b] rounded-xl border border-[#242424]">
                    <h1 className="text-white text-3xl font-semibold tracking-wide">
                        {storedUser?.stepsCompleted || 0 >= 1
                            ? "Welcome back 👋"
                            : "Hey there 👋"}
                        , let's get started:
                    </h1>
                    <ol className="mt-6 list-decimal flex flex-col items-center">
                        {stepsList.map((step) => (
                            <li
                                key={step.stepValue}
                                className={
                                    step.isactive
                                        ? activeClasses
                                        : step.isCompleted
                                          ? completedClasses
                                          : inactiveClasses
                                }
                            >
                                {step.label}
                            </li>
                        ))}
                    </ol>

                    {(storedUser?.stepsCompleted || 0) === 0 && (
                        <>
                            <SignedOut>
                                <SignInButton>
                                    <button className="bg-[#0078d4] hover:bg-[#0078d4]/90 mt-8 text-white px-8 py-1.5 rounded-md">
                                        Get Started
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <button className="bg-[#0078d4] flex items-center gap-2 hover:bg-[#0078d4]/90 mt-8 text-white px-8 py-1.5 rounded-md">
                                    <LoadingAnimation />
                                    Procceding...
                                </button>
                            </SignedIn>
                        </>
                    )}

                    {(storedUser?.stepsCompleted || 0) === 1 && (
                        <a
                            href={`https://github.com/apps/gitdocs-ai/installations/new`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleAddRepository()}
                            className="bg-[#0078d4] hover:bg-[#0078d4]/90 mt-8 text-white px-8 py-1.5 rounded-md"
                        >
                            Configure Github
                        </a>
                    )}

                    {(storedUser?.stepsCompleted || 0) === 2 && (
                        <button
                            className="bg-[#0078d4] hover:bg-[#0078d4]/90 mt-8 text-white px-8 py-1.5 rounded-md"
                            onClick={() => handleViewDashboard()}
                        >
                            View Dashboard
                        </button>
                    )}

                    <div className="flex justify-center gap-8 items-center mt-14">
                        {buttonItems.map(
                            (item) =>
                                item.show && (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        className={`text-[0.9rem] border-[#383737] flex gap-2 items-center hover:text-white hover:bg-[#282829] transition-all duration-100 px-5 py-2 rounded-md -ms-1`}
                                    >
                                        <item.icon size={16} />
                                        <span className="text-[0.9rem]">
                                            {item.label}
                                        </span>
                                    </a>
                                ),
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GettingStarted;
