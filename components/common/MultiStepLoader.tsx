"use client";

import { useEffect, useContext, useState } from "react";
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import {
    FileTreeContext,
    FileTreeContextType,
} from "@/contexts/FileTreeContext";
import { useRouter } from "next/navigation";

interface OptimizedContent {
    data: {
        file_selection: [
            {
                file_path: string;
                importance: string;
                reason: string;
            },
        ];
        readme_type: {
            primary_type: string;
            subtype: string;
            use_existing_readme: boolean;
            reasoning: string;
        };
        new_readme_prompt: string;
        enhancement_prompt: string;
        specialized_prompt: {
            prompt_type: string;
            prompt_content: string;
        };
    };
}

const loadingStates = [
    {
        text: "Enhancing code insights...",
    },
    {
        text: "Optimizing data processing...",
    },
    {
        text: "Establishing intelligent connections...",
    },
    {
        text: "Deploying digital assistants...",
    },
    {
        text: "Crafting documentation templates...",
    },
    {
        text: "Refining interface aesthetics...",
    },
    {
        text: "Calibrating system modules...",
    },
    {
        text: "Empowering AI capabilities...",
    },
];

export function MultiStepLoader({
    loading,
    setLoading,
    setStopAllActions,
    doc_name,
}: {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setStopAllActions: (stopAllActions: boolean) => void;
    doc_name: string;
}) {
    const { user } = useUser();
    const router = useRouter();
    const [abortController, setAbortController] =
        useState<AbortController | null>(null);
    let requestAborted = false;
    const {
        setInitialTree,
        allFilePaths,
        setAllFilePaths,
        setFileTreeError,
        setSelectedFiles,
        selectedFiles,
        setProjectType,
        setNewReadmePrompt,
        setEnhancementPrompt,
        setSpecializedPromptContent,
    } = useContext(FileTreeContext) as FileTreeContextType;

    const handleCancel = () => {
        if (abortController) {
            abortController.abort();
            setLoading(false);
            setStopAllActions(false);
            toast.info("Operation canceled");
        }
    };

    async function fetchOptimizedContent(controller: AbortController) {
        try {
            const response: OptimizedContent = await axios.post(
                "/api/fetch/airesponse/optimize",
                {
                    userId: user?.id || "",
                    prompt: allFilePaths,
                    doc_name: doc_name,
                },
                { signal: controller.signal },
            );

            setProjectType(response?.data?.readme_type?.primary_type);
            setNewReadmePrompt(response?.data?.new_readme_prompt);
            setEnhancementPrompt(response?.data?.enhancement_prompt);
            setSpecializedPromptContent({
                prompt_type: response?.data?.specialized_prompt?.prompt_type,
                prompt_content:
                    response?.data?.specialized_prompt?.prompt_content,
            });

            if (response.data.file_selection.length > 0) {
                response.data.file_selection.forEach((file) => {
                    setSelectedFiles((prevFiles: string[]) => {
                        const newFiles = new Set([
                            ...prevFiles,
                            file.file_path,
                        ]);
                        return Array.from(newFiles);
                    });
                });
            } else {
                toast.error(
                    "Our AI is having high CPU usage, please try again later",
                );
            }
        } catch (error: any) {
            if (error.name === "CanceledError" || error.name === "AbortError") {
                requestAborted = true;
            } else {
                console.error("Error fetching optimized content:", error);
                toast.error(
                    "Our AI is having high CPU usage, please try again later",
                );
            }
        }
    }

    async function fetchFileTree(controller: AbortController) {
        try {
            const response = await axios.get("/api/fetch/filetreedata", {
                params: {
                    userId: user?.id || "",
                    doc_name: doc_name,
                    path: "",
                },
                signal: controller.signal,
            });

            if (response.data.length === 0) {
                setFileTreeError("All files are included for this project");
            } else {
                setInitialTree(response.data.fileTree);
                setAllFilePaths(response.data.allFilePaths);
            }
        } catch (error: any) {
            if (error.name === "CanceledError" || error.name === "AbortError") {
                requestAborted = true;
            } else {
                console.error("Error fetching initial tree:", error);
                setFileTreeError("Error fetching initial tree");
            }
        }
    }

    useEffect(() => {
        if (doc_name) {
            const newController = new AbortController();
            setAbortController(newController);

            const execute = async () => {
                setLoading(true);
                await fetchFileTree(newController);
                await fetchOptimizedContent(newController);
                if (!requestAborted) {
                    router.push(`/update_readme/${doc_name}`);
                }
                requestAborted = false;
                setLoading(false);
            };

            execute();

            return () => {
                newController.abort();
            };
        } else {
            setTimeout(() => {
                router.push("/dashboard");
                toast.error("No document name provided");
                setLoading(false);
                setStopAllActions(false);
            }, 2000);
        }
    }, [doc_name]);

    return (
        <div className="w-full h-[60vh] flex items-center justify-center">
            {/* Core Loader Modal */}
            <Loader
                loadingStates={loadingStates}
                loading={loading}
                duration={2000}
            />

            {loading && (
                <button
                    className="fixed top-4 right-4 text-white z-[120]"
                    onClick={handleCancel}
                >
                    <IconSquareRoundedX className="h-10 w-10" />
                </button>
            )}
        </div>
    );
}
