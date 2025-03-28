"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";

export type FileTreeContextType = {
    selectedFiles: string[];
    setSelectedFiles: Dispatch<SetStateAction<string[]>>;
    initialTree: any[];
    setInitialTree: Dispatch<SetStateAction<any[]>>;
    allFilePaths: string[];
    setAllFilePaths: Dispatch<SetStateAction<string[]>>;
    fileTreeError: string;
    setFileTreeError: Dispatch<SetStateAction<string>>;
    newReadmePrompt: string;
    setNewReadmePrompt: Dispatch<SetStateAction<string>>;
    enhancementPrompt: string;
    setEnhancementPrompt: Dispatch<SetStateAction<string>>;
    specializedPromptContent: {
        prompt_type: string;
        prompt_content: string;
    };
    setSpecializedPromptContent: Dispatch<
        SetStateAction<{
            prompt_type: string;
            prompt_content: string;
        }>
    >;
    projectType: string;
    setProjectType: Dispatch<SetStateAction<string>>;
};

export const FileTreeContext = createContext<FileTreeContextType | undefined>(
    undefined,
);

export const FileTreeProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [selectedFiles, setSelectedFiles] = useState<string[]>([
        "README.md",
        "package.json",
    ]);
    const [initialTree, setInitialTree] = useState<any[]>([]);
    const [allFilePaths, setAllFilePaths] = useState<string[]>([]);
    const [fileTreeError, setFileTreeError] = useState("");
    const [newReadmePrompt, setNewReadmePrompt] = useState("");
    const [enhancementPrompt, setEnhancementPrompt] = useState("");
    const [specializedPromptContent, setSpecializedPromptContent] = useState({
        prompt_type: "",
        prompt_content: "",
    });
    const [projectType, setProjectType] = useState("");

    return (
        <FileTreeContext.Provider
            value={{
                selectedFiles,
                setSelectedFiles,
                initialTree,
                setInitialTree,
                allFilePaths,
                setAllFilePaths,
                fileTreeError,
                setFileTreeError,
                newReadmePrompt,
                setNewReadmePrompt,
                enhancementPrompt,
                setEnhancementPrompt,
                specializedPromptContent,
                setSpecializedPromptContent,
                projectType,
                setProjectType,
            }}
        >
            {children}
        </FileTreeContext.Provider>
    );
};
