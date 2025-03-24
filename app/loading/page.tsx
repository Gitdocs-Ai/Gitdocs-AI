"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FileTreeContext, FileTreeContextType } from "@/contexts/FileTreeContext";
import { useContext } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";

interface OptimizedContent {
  data: {
    file_selection: [
      {
        file_path: string;
        importance: string;
        reason: string;
      }
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
  }
}

const messages = [
  { text: "Enhancing code insights...", emoji: "✨" },
  { text: "Optimizing data processing...", emoji: "🤖" },
  { text: "Establishing intelligent connections...", emoji: "🧠" },
  { text: "Deploying digital assistants...", emoji: "👾" },
  { text: "Crafting documentation templates...", emoji: "📚" },
  { text: "Refining interface aesthetics...", emoji: "💎" },
  { text: "Calibrating system modules...", emoji: "⚡" },
  { text: "Empowering AI capabilities...", emoji: "🐕" },
  { text: "Reshaping digital workflows...", emoji: "🌀" },
];

const LoadingScreen = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const router = useRouter();
  const searchParams = useSearchParams();
  const doc_name = searchParams.get("doc_name");
  const { user } = useUser();
  const { setInitialTree, allFilePaths, setAllFilePaths, setFileTreeError, setSelectedFiles, selectedFiles, setProjectType, setNewReadmePrompt, setEnhancementPrompt, setSpecializedPromptContent } = useContext(FileTreeContext) as FileTreeContextType;

  async function fetchOptimizedContent() {
    try {
      const response: OptimizedContent = await axios.post("/api/fetch/airesponse/optimize", {
        userId: user?.id || "",
        prompt: allFilePaths,
        doc_name: doc_name
      });

      setProjectType(response?.data?.readme_type?.primary_type);
      setNewReadmePrompt(response?.data?.new_readme_prompt);
      setEnhancementPrompt(response?.data?.enhancement_prompt);
      setSpecializedPromptContent({
        prompt_type: response?.data?.specialized_prompt?.prompt_type,
        prompt_content: response?.data?.specialized_prompt?.prompt_content
      });
      
      if (response.data.file_selection.length > 0) {
      response.data.file_selection.forEach((file) => {
          setSelectedFiles((prevFiles: string[]) => {
            const newFiles = new Set([...prevFiles, file.file_path]);
            return Array.from(newFiles);
          });
        });
      } else{
        toast.error("Our AI is having high CPU usage, please try again later");
      }
      
    } catch (error: any) {
      console.error("Error fetching optimized content:", error);
      toast.error("Our AI is having high CPU usage, please try again later");
    }
  }

  async function fetchFileTree() {
    try {
      const response = await axios.get("/api/fetch/filetreedata", {
        params: {
          userId: user?.id || "",
          doc_name: doc_name,
          path: ""
        }
      });

      if (response.data.length === 0) {
          setFileTreeError("All files are included for this project");
      } else {
          setInitialTree(response.data.fileTree);
          setAllFilePaths(response.data.allFilePaths);
      }
    } catch (error: any) {
      console.error("Error fetching initial tree:", error);
      setFileTreeError("Error fetching initial tree");
    }
  }

  useEffect(() => {
    const execute = async () => {
      if (doc_name) {
        await fetchFileTree();
        await fetchOptimizedContent();
        router.push(`/update_readme/${doc_name}`);
      } else {
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    };
  
    execute();
  }, [router, doc_name]);

  useEffect(() => {
    // Set up message change animation
    const intervalId = setInterval(() => {
      setFadeState("out"); // Start fade-out
      setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1 ) % messages.length);
        setFadeState("in"); // Fade-in new message
      }, 500);
    }, 1500); // Change message every 1.5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      aria-live="polite"
      className="fixed inset-0 z-50 bg-[#f8f9fe] flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <div className="w-20 h-20 mb-12 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center">
          <Image src="/logo.png" alt="Logo" width={48} height={48} />
        </div>
      </div>

      {/* Visual elements */}
      <div className="relative w-32 h-32 mb-10">
        {/* Spinning gradient orb */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#F97316] animate-spin opacity-75 blur-sm"></div>

        {/* Center pulse */}
        <div className="absolute inset-8 rounded-full bg-white animate-pulse"></div>

        {/* Current emoji */}
        <div
          className={`absolute inset-0 flex items-center justify-center text-3xl transition-opacity duration-500 ${
            fadeState === "out" ? "opacity-0" : "opacity-100"
          }`}
        >
          {messages[currentMessageIndex].emoji}
        </div>
      </div>

      {/* Text message */}
      <div className="h-8 mb-8 flex items-center justify-center">
        <p
          className={`text-gray-700 text-xl font-medium transition-opacity duration-500 ${
            fadeState === "out" ? "opacity-0" : "opacity-100"
          }`}
        >
          {messages[currentMessageIndex].text}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="fixed top-40 left-40 w-64 h-64 bg-[#0EA5E9] rounded-full blur-[120px] opacity-10 animate-pulse"></div>
      <div className="fixed bottom-40 right-40 w-64 h-64 bg-[#F97316] rounded-full blur-[120px] opacity-10 animate-pulse"></div>
    </div>
  );
};

export default LoadingScreen;
