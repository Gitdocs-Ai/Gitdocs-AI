import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { LuCheck, LuCopy } from "react-icons/lu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bug, ThumbsUp, ThumbsDown } from "lucide-react";

type ChatProps = {
    role: string;
    content: string;
    isPreview: boolean;
    isAiGenerating: boolean;
};

const Chat = ({ role, content, isPreview, isAiGenerating }: ChatProps) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Reset the copied state when the content changes
        setCopied(false);
    }, [content]);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);

        const timeout = setTimeout(() => {
            setCopied(false);
        }, 2000);

        return () => clearTimeout(timeout);
    };

    return (
        <div
            className={`flex items-start ${role === "user" ? "flex-row-reverse  mb-5 -mt-10" : "flex-row mb-16"} ${isPreview ? "gap-2" : "gap-5"}`}
        >
            {role === "user" ? (
                <UserButton />
            ) : (
                <Image src="/gitdoc_ai.png" alt="logo" width={40} height={40} />
            )}
            <div
                className={`${role === "user" ? "bg-[#1b1b1b]" : "raw-preview -ms-1 -mt-4"} relative py-2 px-4 min-w-[12%] rounded-lg ${isPreview ? "max-w-[89.5%]" : role === "user" ? "max-w-[60%]" : "max-w-[89.5%]"}`}
            >
                <div className="flex items-start justify-between">
                    <TooltipProvider delayDuration={0}>
                        <p
                            className={`me-2 ${role === "user" ? "" : "text-lg"}`}
                        >
                            {role === "user" ? "You" : "Gitdocs AI"}
                        </p>
                        {role != "user" && !isAiGenerating && (
                            <div className="w-fit -bottom-2 absolute space-x-4 bg-[#1b1b1b] rounded-lg py-2 px-4 flex items-center">
                                <Tooltip>
                                    <TooltipTrigger>
                                        {copied ? (
                                            <LuCheck
                                                className="text-[#56a85a]"
                                                size={18}
                                            />
                                        ) : (
                                            <LuCopy
                                                className="text-[#B4B4B4] hover:text-white cursor-pointer"
                                                size={18}
                                                onClick={handleCopy}
                                            />
                                        )}
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-[#ededed] text-black">
                                        {copied ? (
                                            <p className="text-xs">
                                                Copied to clipboard
                                            </p>
                                        ) : (
                                            <p className="text-xs">
                                                Copy to clipboard
                                            </p>
                                        )}
                                    </TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://docs.google.com/forms/d/e/1FAIpQLSfhb7jq5653iPXupiCsMp7FuhO2OmkeSNTpQq-fZa9ULMwgDw/viewform?usp=dialog"
                                        >
                                            <Bug
                                                className="text-[#B4B4B4] hover:text-white cursor-pointer"
                                                size={18}
                                            />
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-[#ededed] text-black">
                                        <p className="text-xs">Report a Bug</p>
                                    </TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger>
                                        <ThumbsUp
                                            className="text-[#B4B4B4] hover:text-white cursor-pointer"
                                            size={18}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-[#ededed] text-black">
                                        <p className="text-xs">Good response</p>
                                    </TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger>
                                        <ThumbsDown
                                            className="text-[#B4B4B4] hover:text-white cursor-pointer"
                                            size={18}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-[#ededed] text-black">
                                        <p className="text-xs">Bad response</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        )}
                    </TooltipProvider>
                </div>
                {content === "" ? (
                    <div className="flex items-center mt-3 gap-2">
                        <p className="text-gray-500 -my-1.5 flex pb-2 items-end space-x-2">
                            <span>Gitdocs AI is thinking</span>
                            <span className="flex items-end space-x-1 mb-1.5">
                                <span className="dot bg-gray-500"></span>
                                <span className="dot bg-gray-500"></span>
                                <span className="dot bg-gray-500"></span>
                            </span>
                        </p>
                    </div>
                ) : role === "user" ? (
                    <p className="">{content.replace(/\\n/g, "\n")}</p>
                ) : (
                    <ReactMarkdown className="mt-2" remarkPlugins={[remarkGfm]}>
                        {content
                            .replace(/\\n/g, "\n")
                            .replace(/```markdown/g, "")
                            .replace(/markdown```/g, "")}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    );
};

export default Chat;
