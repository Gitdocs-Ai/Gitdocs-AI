"use client";

import { LuPlus, LuBrain, LuChevronDown, LuFile } from "react-icons/lu";
import { HiArrowPath } from "react-icons/hi2";
import { FaSyncAlt, FaFileAlt, FaBriefcase } from "react-icons/fa";
import { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Chat from "./Chat";
import { fetchAIResponse } from "@/lib/fetchStreamedAiResponse";
import { useUser } from "@clerk/nextjs";
import { AppContext, AppContextType } from "@/contexts/AppContext";
import { CircleArrowUp, ChevronRight, Info } from "lucide-react";
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from "../ui/tooltip";
import ProjectMetadataForm from "./ProjectMetadataForm";
import axios from "axios";
import ShinyButton from "../common/ShinyButton";
import LoadingAnimation from "../common/LoadingAnimation";
import { toast } from "sonner";
import {
    FileTreeContext,
    FileTreeContextType,
} from "@/contexts/FileTreeContext";
interface ChatSectionProps {
    doc_name: string;
    isPreview: boolean;
    setIsPreview: (isPreview: boolean) => void;
    content: string;
    setContent: (content: string | ((prev: string) => string)) => void;
}

const ChatSection = ({
    doc_name,
    isPreview,
    content,
    setContent,
    setIsPreview,
}: ChatSectionProps) => {
    const { user } = useUser();
    const router = useRouter();
    const {
        setShowModel,
        selectedModel,
        showModel,
        storedUser,
        setStoredUser,
    } = useContext(AppContext) as AppContextType;
    const {
        selectedFiles,
        setSelectedFiles,
        projectType,
        newReadmePrompt,
        enhancementPrompt,
        specializedPromptContent,
    } = useContext(FileTreeContext) as FileTreeContextType;
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [message, setMessage] = useState<{ role: string; content: string }[]>(
        [],
    );
    const [isAiGenerating, setIsAiGenerating] = useState(false);
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
    const [showProjectMetadataForm, setShowProjectMetadataForm] =
        useState(false);
    const [projectMetadata, setProjectMetadata] = useState({
        type: "",
        technologies: "",
        features: "",
        license: "",
        additionalInfo: "",
    });
    const [backupContent, setBackupContent] = useState("");
    const [usageOverviewtrigger, setUsageOverviewtrigger] = useState(0);

    useEffect(() => {
        const fetchUsageOverview = async () => {
            const response = await axios.get("/api/fetch/usageoverviewdata", {
                headers: {
                    Authorization: `Bearer ${user?.id}`,
                },
            });
            const newUsageOverview = response.data;

            // Only update if new tokensUsed is greater
            if (
                newUsageOverview.data.tokensUsed >
                (storedUser?.usageOverview.tokensUsed || 0)
            ) {
                setStoredUser((prev) => {
                    return {
                        ...prev,
                        usageOverview: newUsageOverview.data,
                        // Ensure required fields are always set (fallback to previous value or a default)
                        subscriptionType: prev?.subscriptionType || "",
                        stepsCompleted:
                            prev?.stepsCompleted !== undefined
                                ? prev?.stepsCompleted
                                : 0,
                    };
                });
                localStorage.setItem("storedUser", JSON.stringify(storedUser));
            }
        };

        fetchUsageOverview();
    }, [usageOverviewtrigger, user?.id, storedUser, setStoredUser]);

    useEffect(() => {
        const fetchMetadata = async () => {
            if (doc_name === "#Chat-with-GitDocs-AI-Assistant#") return;
            try {
                const response = await axios.patch(
                    "/api/fetch/repositorydata",
                    { doc_name },
                    {
                        headers: {
                            Authorization: `Bearer ${user?.id}`,
                        },
                    },
                );
                if (response.data.type !== null) {
                    setProjectMetadata((prev) => ({
                        ...prev,
                        ...response.data,
                    }));
                }
            } catch (error) {
                console.error("Error fetching metadata:", error);
            }
        };
        fetchMetadata();
    }, [doc_name, user?.id]);

    const handleReset = () => {
        setMessage([]);
        setContent("");
    };

    const handleSend = async () => {
        // Check for token availability with a more informative message
        if (
            (storedUser?.usageOverview.totalTokens || 0) -
                (storedUser?.usageOverview.tokensUsed || 0) <
            500
        ) {
            toast.error(
                "Insufficient tokens. You need at least 500 tokens to generate a README.",
            );
            return;
        }

        const inputValue = textareaRef.current?.value.trim();

        // Better validation handling
        if (!inputValue) {
            toast.warning("Please enter a message before sending.");
            return;
        }

        if (isAiGenerating) {
            toast.info("AI is still generating a response. Please wait.");
            return;
        }

        // Clear the textarea and reset its height
        textareaRef.current!.value = "";
        handleInput();

        // Keep track of the current message length for error recovery
        const currentMessageLength = message.length;

        // Add the user's message and prepare an empty assistant response in the state
        setMessage((prev) => [
            ...prev,
            { role: "user", content: inputValue },
            { role: "assistant", content: "" },
        ]);

        // Get the last two messages, assuming messages alternate (user then assistant)
        const previousContext = (() => {
            if (message.length >= 2) {
                const lastPair = message.slice(-2);
                if (
                    lastPair[0].role === "user" &&
                    lastPair[1].role === "assistant"
                ) {
                    return `The previous messages are:\nUser: ${
                        lastPair[0].content
                    }\n To modify the Readme: ${content.trim() ? content.trim() : backupContent.trim()}`;
                }
            }
            return "";
        })();

        // Add error handling with recovery
        try {
            setIsAiGenerating(true);
            let promptWithContext = `
        The project is ${doc_name}.
        The user's message is: ${inputValue}.
        ${previousContext}
        The project metadata is: ${JSON.stringify(projectMetadata)}.
      `;

            if (doc_name === "#Chat-with-GitDocs-AI-Assistant#") {
                promptWithContext = `
          This is a general chat with the user.
          The user's message is: ${inputValue}.
          ${previousContext}999888777666555444333222111000999888777666555444333222111000
        `;
            }

            // Save the current content before starting new generation
            setBackupContent(content);
            setContent("");

            // Track starting time for timeout detection
            const startTime = Date.now();
            const timeoutDuration = 360000; // 6 minutes timeout
            let timeoutId: NodeJS.Timeout;

            // Create a timeout detection mechanism
            const timeoutPromise = new Promise((_, reject) => {
                timeoutId = setTimeout(() => {
                    reject(new Error("Response generation timed out"));
                }, timeoutDuration);
            });

            // Use Promise.race to handle potential timeouts
            await Promise.race([
                fetchAIResponse(
                    user?.id || "",
                    promptWithContext,
                    doc_name,
                    selectedModel.value,
                    selectedModel.base_url,
                    selectedFiles,
                    (msg) => {
                        // Append to the last message block instead of creating a new one
                        setMessage((prev) => {
                            const lastMessage = prev[prev.length - 1];

                            if (lastMessage && lastMessage.role === msg.role) {
                                // Update content of the last message
                                const updatedMessages = [...prev];
                                updatedMessages[updatedMessages.length - 1] = {
                                    ...lastMessage,
                                    content: lastMessage.content + msg.content,
                                };
                                return updatedMessages;
                            } else {
                                // Add a new message block if roles are different
                                return [...prev, msg];
                            }
                        });
                    },
                    (chunk) => {
                        setIsPreview(true);
                        setContent((prev) => prev + chunk);
                    },
                    (isPreview) => {
                        setIsPreview(isPreview);
                    },
                ),
                timeoutPromise,
            ]).finally(() => {
                clearTimeout(timeoutId);
            });

            // Check if the operation took too long but didn't time out
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime > timeoutDuration * 0.8) {
                // 80% of timeout duration
                console.warn("Response generation was slow but completed");
            }
        } catch (error) {
            console.error("Error fetching response:", error);

            // Determine if it's a timeout error or other error
            const errorMessage =
                error instanceof Error &&
                error.message === "Response generation timed out"
                    ? "Request timed out. Please try again with a shorter prompt."
                    : "Error generating response. Please try again.";

            toast.error(errorMessage);

            // Recovery: restore the previous state if we have a new assistant message that's empty
            setMessage((prev) => {
                if (
                    prev.length > currentMessageLength &&
                    prev[prev.length - 1].role === "assistant" &&
                    prev[prev.length - 1].content === ""
                ) {
                    return prev.slice(0, -2); // Remove the empty assistant message and the user's message
                }
                return prev;
            });

            // Restore the previous content if generation failed
            if (!content.trim()) {
                setContent(backupContent);
            }
        } finally {
            setIsAiGenerating(false);
            setUsageOverviewtrigger((prev) => prev + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (projectMetadata?.type === "") {
                setShowProjectMetadataForm(true);
                toast.error(
                    "Please select a project type before generating a Readme",
                );
                return;
            }
            handleSend();
        }
    };

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset the height
            textareaRef.current.style.height = `${Math.min(
                textareaRef.current.scrollHeight,
                5 *
                    parseFloat(
                        getComputedStyle(textareaRef.current).lineHeight ||
                            "40",
                    ),
            )}px`;
        }
    };

    const defaultOptions = [
        {
            icon: <LuFile />,
            label: "Generate Example Readme",
            value: "Create a comprehensive sample README.md with 10-12 distinct, well-organized sections using placeholder text for a hypothetical software project. Include these essential sections: Introduction (with project overview and purpose), Installation (step-by-step instructions with code snippets), Usage (with basic and advanced examples), Features (bullet points with brief descriptions), API Documentation (with method signatures and parameters), Configuration (environment variables and settings), Examples (real-world use cases with code), Troubleshooting (common issues and solutions), Contributing Guidelines (how to submit PRs), License Information (terms of use), and Contact Information (maintainer details). Format using proper Markdown syntax with headings, code blocks, tables, and links. The README should be professional, clear, and follow documentation best practices.",
            disabled: doc_name !== "#Chat-with-GitDocs-AI-Assistant#",
        },
        {
            icon: <LuFile />,
            label: "Generate Contribution Guidelines",
            value: "Draft a detailed CONTRIBUTING.md file that establishes clear, actionable guidelines for project contributions. Include these specific sections: 1) Code of Conduct (with explicit behavioral expectations and enforcement procedures), 2) Project Structure (explaining codebase organization), 3) Development Environment Setup (step-by-step instructions with required dependencies), 4) How to Contribute (detailed workflow from fork to PR), 5) Issue Reporting (template and required information), 6) Pull Request Process (with naming conventions, branching strategy, and review criteria), 7) Testing Requirements (coverage expectations and how to run tests), 8) Style Guidelines (code formatting, documentation standards), 9) Commit Message Conventions, and 10) Release Process. Use clear examples throughout and consider both new and experienced contributors. Format with proper Markdown, including headings, lists, code blocks, and tables where appropriate.",
            disabled: doc_name !== "#Chat-with-GitDocs-AI-Assistant#",
        },
        {
            icon: <LuFile />,
            label: "Improve Code Examples",
            value: "Enhance the existing code examples within the README by applying these specific improvements: 1) Refine syntax for optimal readability according to the language's style guide, 2) Add comprehensive comments explaining each critical step and the reasoning behind it, 3) Incorporate error handling and edge case management, 4) Follow language-specific best practices and naming conventions, 5) Ensure examples progress from simple to complex use cases, 6) Include sample output for each example, 7) Use consistent formatting and indentation, 8) Break down complex operations into smaller, understandable chunks, 9) Update any deprecated methods or syntax, and 10) Provide context for when and why each example would be used. Ensure all examples are functional, efficient, and demonstrate practical applications of the project's capabilities.",
            disabled: doc_name !== "#Chat-with-GitDocs-AI-Assistant#",
        },
        {
            icon: <FaSyncAlt />,
            label: "Improve my Readme",
            value:
                enhancementPrompt.length > 0
                    ? enhancementPrompt
                    : "Revise and optimize the current README based on best practices and user feedback. First, analyze the existing content for gaps, inconsistencies, and areas of improvement. Then implement these enhancements: 1) Restructure for logical flow with clear section progression, 2) Improve introduction to clearly communicate project purpose and value proposition, 3) Add missing critical sections (installation, usage, API documentation, etc.), 4) Enhance code examples with better formatting and explanatory comments, 5) Create visual aids like diagrams or screenshots where beneficial, 6) Add a detailed troubleshooting section addressing common issues, 7) Incorporate badges for build status, coverage, and dependencies, 8) Ensure all links are functional and relevant, 9) Add a 'Quick Start' guide for immediate orientation, and 10) Standardize formatting and writing style throughout for professional consistency. Maintain existing project-specific information while elevating the documentation's clarity, completeness, and usability.",
            disabled: doc_name === "#Chat-with-GitDocs-AI-Assistant#",
        },
        {
            icon: <FaFileAlt />,
            label: "Make a new Readme",
            value:
                newReadmePrompt.length > 0
                    ? newReadmePrompt
                    : "Generate a comprehensive, professional README.md tailored specifically to this project's purpose, features, and target users. Include these essential sections: 1) Project Overview (with clear value proposition and problem being solved), 2) Key Features (highlighting unique capabilities with brief descriptions), 3) Visual Demo (placeholder for screenshots/GIFs), 4) Prerequisites (all required dependencies with versions), 5) Installation (step-by-step instructions with commands), 6) Configuration (all configurable options with examples), 7) Usage (from basic to advanced with code examples), 8) API Documentation (detailed method descriptions, parameters, return values, and examples), 9) Troubleshooting (solutions to common issues), 10) Performance Considerations, 11) Security Notes, 12) Roadmap (future development plans), 13) Contributing Guidelines (summarized), 14) License Information, and 15) Contact/Support Details. Use proper Markdown formatting including tables, code blocks, collapsible sections, and appropriate linking. Ensure the document is both technically accurate and accessible to new users. The tone should be clear, professional, and helpful.",
            disabled: doc_name === "#Chat-with-GitDocs-AI-Assistant#",
        },
        {
            icon: <FaBriefcase />,
            label: specializedPromptContent.prompt_type
                ? specializedPromptContent.prompt_type
                : "Professional Readme",
            value:
                specializedPromptContent.prompt_content.length > 0
                    ? specializedPromptContent.prompt_content
                    : "Craft a polished, enterprise-grade README.md that effectively communicates the project's value to both technical and non-technical stakeholders. Structure the document with these precisely formatted sections: 1) Executive Summary (concise overview of purpose and business value), 2) Project Status (with maintenance level indicators), 3) Technology Stack (with versions and justifications), 4) Architecture Overview (with system component relationships), 5) Getting Started (detailed environment setup and verification steps), 6) Integration Options (with enterprise systems and third-party services), 7) Configuration Management (all parameters with validation rules), 8) Advanced Usage Scenarios (with complete workflow examples), 9) Performance Benchmarks (with optimization recommendations), 10) Security Considerations (including compliance information), 11) Disaster Recovery (backup and restoration procedures), 12) Deployment Strategies (including CI/CD pipeline integration), 13) Monitoring and Logging Practices, 14) Contribution Process (for both internal and external contributors), and 15) Support Channels (with SLAs where applicable). Use professional language throughout, avoid jargon without explanation, and include diagrams where appropriate. Format with consistent, clean Markdown that renders properly across platforms.",
            disabled: doc_name === "#Chat-with-GitDocs-AI-Assistant#",
        },
    ];
    // Handle scroll events to detect user's position
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (!chatContainer) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = chatContainer;
            // Update threshold to 100px for better UX
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
            setAutoScrollEnabled(isNearBottom);
        };

        chatContainer.addEventListener("scroll", handleScroll);
        return () => chatContainer.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll handler with tighter threshold
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (!chatContainer) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = chatContainer;
            // Use 1px threshold to disable auto-scroll on any manual upward scroll
            const isAtBottom = scrollHeight - scrollTop - clientHeight <= 1;
            setAutoScrollEnabled(isAtBottom);
        };

        chatContainer.addEventListener("scroll", handleScroll);
        return () => chatContainer.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto-scroll only when at bottom
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (!chatContainer || !autoScrollEnabled) return;

        // Smooth scroll to bottom with timing fix
        requestAnimationFrame(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        });
    }, [message]); // Only trigger on messages change

    // Initial scroll to bottom
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, []);

    const handleFocus = () => {
        textareaRef.current?.focus();
    };

    return (
        <>
            {showProjectMetadataForm && (
                <ProjectMetadataForm
                    doc_name={doc_name}
                    projectMetadata={projectMetadata}
                    setProjectMetadata={setProjectMetadata}
                    setShowProjectMetadataForm={setShowProjectMetadataForm}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />
            )}
            <div
                className={`w-1/2 -mt-5 rounded-lg relative transition-all duration-300 flex-1 mx-auto ${
                    isPreview ? "" : "px-40"
                }`}
                onClick={handleFocus}
            >
                <div className="group">
                    <div className="z-20 rounded-full group-hover:hidden absolute top-1 left-11 text-xs">
                        {projectMetadata?.type === "" && (
                            <Info
                                size={16}
                                className={`${
                                    doc_name ===
                                    "#Chat-with-GitDocs-AI-Assistant#"
                                        ? "text-[#F2BD57]"
                                        : "text-[#DF737D]"
                                }`}
                            />
                        )}
                    </div>
                    <div
                        className={`absolute top-0 z-10 left-0 cursor-pointer flex justify-between px-5 py-1 items-center overflow-hidden w-14 transition-all duration-150 whitespace-nowrap rounded-full bg-[#1f1f1f] ${
                            isPreview
                                ? message.length === 0
                                    ? "hover:w-[26rem]"
                                    : "hover:w-[32rem]"
                                : message.length === 0
                                  ? "hover:w-[29rem]"
                                  : "hover:w-[36rem]"
                        }`}
                    >
                        <ChevronRight
                            className="text-white me-6 flex-shrink-0"
                            size={20}
                        />
                        <div className="text-white rounded-t-lg mx-auto flex gap-2 items-center justify-between h-12">
                            <div
                                className={`flex relative items-center gap-2 text-sm border border-[#bbbbbb] cursor-pointer rounded-full ${
                                    isPreview ? "max-w-[9rem]" : "max-w-[11rem]"
                                } ${
                                    doc_name ===
                                    "#Chat-with-GitDocs-AI-Assistant#"
                                        ? "py-2.5 ps-3 pe-2"
                                        : "py-2 ps-3 pe-2"
                                }`}
                                onClick={() => {
                                    if (
                                        doc_name ===
                                        "#Chat-with-GitDocs-AI-Assistant#"
                                    )
                                        return router.push(
                                            "/dashboard?tab=projects",
                                        );
                                    setShowProjectMetadataForm(true);
                                }}
                            >
                                {doc_name !==
                                "#Chat-with-GitDocs-AI-Assistant#" ? (
                                    <div
                                        className={`rounded-full flex-shrink-0 bg-[#8bd375] text-black font-bold flex items-center justify-center transition-all duration-150 ${
                                            isPreview
                                                ? "w-6 h-6 text-xs"
                                                : "w-7 h-7 text-sm"
                                        }`}
                                    >
                                        <p className="truncate w-[75%]">
                                            {doc_name.charAt(0).toUpperCase() +
                                                doc_name
                                                    .charAt(1)
                                                    .toUpperCase()}
                                        </p>
                                    </div>
                                ) : (
                                    <LuPlus
                                        size={isPreview ? 20 : 23}
                                        className="text-white"
                                    />
                                )}
                                <p
                                    className={`hover:underline truncate w-[55%] ${
                                        isPreview
                                            ? "text-xs max-w-[150px]"
                                            : "text-sm"
                                    }`}
                                >
                                    {doc_name ===
                                    "#Chat-with-GitDocs-AI-Assistant#"
                                        ? "Choose a project"
                                        : doc_name}
                                </p>
                                <LuChevronDown
                                    className={`text-white transition-all duration-150 ${
                                        showModel ? "-rotate-180" : ""
                                    }`}
                                    size={isPreview ? 16 : 20}
                                />
                                {(projectMetadata?.type === "" ||
                                    doc_name ===
                                        "#Chat-with-GitDocs-AI-Assistant#") && (
                                    <TooltipProvider delayDuration={0}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="z-20 rounded-full absolute top-0 right-0 text-xs">
                                                    <Info
                                                        size={16}
                                                        className={`${
                                                            doc_name ===
                                                            "#Chat-with-GitDocs-AI-Assistant#"
                                                                ? "text-[#F2BD57]"
                                                                : "text-[#DF737D]"
                                                        } bg-[#1F1F1F] rounded-full`}
                                                    />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="top"
                                                sideOffset={28}
                                            >
                                                <p className="text-xs">
                                                    {doc_name ===
                                                    "#Chat-with-GitDocs-AI-Assistant#"
                                                        ? "Choose a project to create a Readme"
                                                        : "Update project metadata for better results"}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </div>

                            <button
                                className={`flex items-center gap-3 border border-[#bbbbbb] p-3 cursor-pointer rounded-full transition-all duration-150 ${
                                    isPreview
                                        ? "text-xs max-w-[9rem]"
                                        : "text-sm max-w-[11rem]"
                                }`}
                                onClick={() => setShowModel(true)}
                            >
                                <LuBrain
                                    className="text-white flex-shrink-0"
                                    size={isPreview ? 16 : 20}
                                />
                                <p
                                    className={`truncate w-[75%] ${
                                        isPreview ? "text-xs" : "text-sm"
                                    }`}
                                >
                                    {selectedModel.name}
                                </p>
                                <LuChevronDown
                                    className={`text-white transition-all duration-150 ${
                                        showModel ? "-rotate-180" : ""
                                    }`}
                                    size={isPreview ? 16 : 20}
                                />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 ms-1">
                            {message.length > 0 && (
                                <button
                                    className={`group flex items-center gap-2 cursor-pointer border hover:bg-[#F2BD57] hover:text-black transition-all duration-150 text-[#F2BD57] border-[#F2BD57] rounded-full p-3 ${
                                        isPreview ? "text-xs" : "text-sm"
                                    }`}
                                    onClick={handleReset}
                                >
                                    <HiArrowPath
                                        className="focus:animate-spin transition-all duration-100"
                                        size={16}
                                    />
                                    <span>Restart Chat</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {message.length > 0 && (
                    <div
                        ref={chatContainerRef}
                        className={`chat-container flex px-3 flex-col gap-2 pt-12 pb-20 overflow-y-scroll h-[calc(100vh-5rem)]`}
                    >
                        {message.map((msg, index) => (
                            <Chat
                                key={index}
                                role={msg.role}
                                content={msg.content}
                                isPreview={isPreview}
                                isAiGenerating={isAiGenerating}
                            />
                        ))}
                    </div>
                )}

                <div
                    className={`absolute left-1/2 -translate-x-1/2 min-h-14 rounded-b-lg transition-all duration-300 w-full ${
                        isPreview ? "" : " px-56"
                    } ${message.length === 0 ? "top-1/2 -translate-y-1/2" : "bottom-3"}`}
                >
                    <div
                        className={`flex items-end relative h-full border py-3 border-[#383737] transition-all duration-300 w-[90%] mx-auto rounded-2xl ${
                            message.length === 0
                                ? "bg-transparent"
                                : "-mb-2 bg-[#141415]"
                        }`}
                    >
                        {message.length > 0 && (
                            <div className="absolute -z-10 -bottom-[6.4rem] bg-[#141415] left-1/2 -translate-x-1/2 w-fit whitespace-nowrap h-full text-[#F2BD57]">
                                <p className="text-[#bbbbbb] text-xs">
                                    GitDocs AI can make mistakes. Please review
                                    the changes before saving.
                                </p>
                            </div>
                        )}
                        {message.length === 0 && (
                            <>
                                <div className="absolute -z-10 bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50 rounded-2xl"></div>
                                <h1 className="absolute -top-16 left-1/2 -translate-x-1/2 text-center text-4xl bg-gradient-to-b from-white to-[#a7a4a4] text-transparent bg-clip-text w-full font-bold">
                                    What can i help you with ?
                                </h1>
                                {
                                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full justify-center text-center text-white flex gap-3">
                                        {defaultOptions.map((option, index) => (
                                            <>
                                                {!option.disabled && (
                                                    <ShinyButton
                                                        key={index}
                                                        label={option.label}
                                                        icon={option.icon}
                                                        isPreview={isPreview}
                                                        onClick={() => {
                                                            textareaRef.current!.value =
                                                                option.value;
                                                            if (
                                                                projectMetadata?.type ===
                                                                ""
                                                            ) {
                                                                setShowProjectMetadataForm(
                                                                    true,
                                                                );
                                                                toast.error(
                                                                    "Please select a project type before generating a Readme",
                                                                );
                                                                return;
                                                            }
                                                            handleSend();
                                                        }}
                                                    />
                                                )}
                                            </>
                                        ))}
                                    </div>
                                }
                            </>
                        )}
                        <textarea
                            placeholder={
                                isAiGenerating
                                    ? "Generating..."
                                    : !(content.length > 0)
                                      ? "Share project highlights..."
                                      : "what you'd like to improve in your README..."
                            }
                            ref={textareaRef}
                            onInput={handleInput}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent flex-1 ps-4 h-18 text-[#ece7e7] outline-none resize-none placeholder:truncate"
                            rows={3}
                            disabled={isAiGenerating}
                        />

                        {!isAiGenerating ? (
                            <CircleArrowUp
                                className="text-[#B4B4B4] hover:text-white cursor-pointer w-14"
                                onClick={() => {
                                    if (projectMetadata?.type === "") {
                                        setShowProjectMetadataForm(true);
                                        toast.error(
                                            "Please select a project type before generating a Readme",
                                        );
                                        return;
                                    }
                                    handleSend();
                                }}
                            />
                        ) : (
                            <div className="me-5 mb-1 scale-150">
                                <LoadingAnimation />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatSection;
