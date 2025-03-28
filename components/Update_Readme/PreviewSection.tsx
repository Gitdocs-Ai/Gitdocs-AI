"use client";

import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import RawPreview from "./RawPreview";
import { useState } from "react";
import MarkdownPreview from "./MarkdownPreview";
import { AlertDialogDemo } from "./AlertDialog";

interface PreviewSectionProps {
    doc_name: string;
    isPreview: boolean;
    setIsPreview: (isPreview: boolean) => void;
    content: string;
    setContent: (content: string | ((prev: string) => string)) => void;
}

const PreviewSection = ({
    doc_name,
    isPreview,
    setIsPreview,
    content,
    setContent,
}: PreviewSectionProps) => {
    const [previewType, setPreviewType] = useState<"raw" | "markdown">("raw");
    const [commitData, setCommitData] = useState({
        doc_name: doc_name,
        message: "",
        content: "",
        branch: "",
    });

    return (
        <div
            className={`bg-[#171717] h-[calc(100vh-5rem)] -mt-4 rounded-lg relative ${isPreview ? "translate-x-0 w-1/2" : "translate-x-[104%] w-0"} transition-all duration-300`}
        >
            <button
                className={`absolute top-1/2 -translate-y-1/2 h-12 w-5 bg-[#171717] ps-0.5 rounded-l-lg flex items-center justify-start text-slate-400 z-10 transition-all duration-300 ${isPreview ? "-left-5" : "left-1.5"}`}
                onClick={() => setIsPreview(!isPreview)}
            >
                {isPreview ? (
                    <LuArrowRight size={16} />
                ) : (
                    <LuArrowLeft size={16} />
                )}
            </button>

            <div
                className={`text-white bg-[#171717] rounded-t-lg flex items-center justify-between px-5 h-12 transition-all duration-300 ${isPreview ? "block" : "hidden"}`}
            >
                <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#383737] rounded-md p-1 ">
                        <button
                            className={`text-sm hover:text-[#ffffff] px-3 py-0.5 flex items-center rounded-md ${previewType === "raw" ? "bg-[#1f1f1f] text-[#ffffff]" : "bg-transparent text-[#cec7c7]"}`}
                            onClick={() => setPreviewType("raw")}
                        >
                            Raw
                        </button>

                        <button
                            className={`text-sm hover:text-[#ffffff] px-3 py-0.5 flex gap-2 items-center rounded-md ${previewType === "markdown" ? "bg-[#1f1f1f] text-[#ffffff]" : "bg-transparent text-[#cec7c7]"}`}
                            onClick={() => setPreviewType("markdown")}
                        >
                            Markdown
                        </button>
                    </div>
                </div>
                <AlertDialogDemo
                    commitData={commitData}
                    setCommitData={setCommitData}
                    content={content}
                />
            </div>
            <hr className="border-[#383737]" />

            {isPreview && previewType === "raw" && (
                <RawPreview content={content} setContent={setContent} />
            )}
            {isPreview && previewType === "markdown" && (
                <MarkdownPreview content={content} />
            )}
        </div>
    );
};
export default PreviewSection;
