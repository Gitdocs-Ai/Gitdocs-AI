"use client";

import { X, AlertCircle, UserRoundPen, Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import FileTree from "./FileTree";
import { useUser } from "@clerk/nextjs";
import {
  FileTreeContext,
  FileTreeContextType,
} from "@/contexts/FileTreeContext";
import { useContext } from "react";

const ProjectMetadataForm = ({
  doc_name,
  projectMetadata,
  setProjectMetadata,
  setShowProjectMetadataForm,
  selectedFiles,
  setSelectedFiles,
}: {
  doc_name: string;
  projectMetadata: any;
  setProjectMetadata: (projectMetadata: any) => void;
  setShowProjectMetadataForm: (show: boolean) => void;
  selectedFiles: string[];
  setSelectedFiles: (selectedFiles: string[]) => void;
}) => {
  const { user } = useUser();
  const [error, setError] = useState("");
  const {
    initialTree,
    allFilePaths,
    setAllFilePaths,
    fileTreeError,
    setFileTreeError,
  } = useContext(FileTreeContext) as FileTreeContextType;

  const fetchChildren = async (path: string[]): Promise<any[]> => {
    // Example API call
    try {
      // Replace with your actual API endpoint
      const response = await axios.get("/api/fetch/filetreedata", {
        params: {
          userId: user?.id || "",
          doc_name: doc_name,
          path: path.join("/"),
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch children");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching children:", error);
      return [];
    }
  };

  const handleClose = () => {
    setShowProjectMetadataForm(false);
  };

  const handleSave = (e: any) => {
    if (projectMetadata?.type === "") {
      setError("Project type is required");
      return;
    }

    e.preventDefault();
    setShowProjectMetadataForm(false);

    axios.put("/api/fetch/repositorydata", {
      doc_name: doc_name,
      metadata: projectMetadata,
    });
  };

  return (
    <div
      onClick={handleClose}
      className="absolute z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1f1f1f] p-4 w-[31rem] h-[37rem] overflow-y-auto rounded-xl"
      >
        <div className="flex justify-between">
          <h2 className="text-lg">Project Metadata</h2>
          <button onClick={handleClose} className="text-sm text-gray-500">
            <X />
          </button>
        </div>
        <form>
          <p className="text-[#999] border-b-2 border-[#353535] pb-1 mt-5 text-sm">
            Basic Information
          </p>
          <p className="text-sm font-semibold mt-3">
            Project Type{" "}
            <span className="text-xs text-red-400">(required)</span>
          </p>
          <div className="grid grid-cols-2 gap-3 mt-2 w-full ">
            <div
              onClick={() =>
                setProjectMetadata({
                  ...projectMetadata,
                  type: "personal",
                })
              }
              className={`flex items-center gap-2 h-16 justify-center bg-[#2f2f2f] rounded-lg p-2 cursor-pointer ${projectMetadata?.type === "personal" ? "border border-[#ededed]" : ""}`}
            >
              <UserRoundPen />
              <p className="flex flex-col">
                Personal Project{" "}
                <span className="text-xs text-[#999]">(personal readme)</span>
              </p>
            </div>
            <div
              onClick={() =>
                setProjectMetadata({
                  ...projectMetadata,
                  type: "professional",
                })
              }
              className={`flex items-center gap-2 h-16 justify-center bg-[#2f2f2f] rounded-lg p-2 cursor-pointer ${projectMetadata?.type === "professional" ? "border border-[#ededed]" : ""}`}
            >
              <Building2 />
              <p className="flex flex-col">
                Organization Project{" "}
                <span className="text-xs text-[#999]">
                  (api documentation etc.)
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <FileTree
              initialTree={initialTree}
              fetchChildren={fetchChildren}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              error={fileTreeError}
              setError={setFileTreeError}
            />
          </div>

          <p className="text-[#999] border-b-2 border-[#353535] pb-1 mt-8 text-sm">
            Additional Information
          </p>

          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="license" className="text-sm font-semibold">
              License{" "}
              <span className="text-xs text-[#999]">(separated by commas)</span>
            </label>
            <input
              onChange={(e) =>
                setProjectMetadata({
                  ...projectMetadata,
                  license: e.target.value,
                })
              }
              type="text"
              id="license"
              name="license"
              value={projectMetadata?.license}
              placeholder="MIT, GPL, etc."
              className={`w-full text-sm py-1.5 px-4 bg-transparent rounded-md border border-[#353535]`}
            />
          </div>

          <div className="flex gap-4 mt-4 items-center">
            {error && (
              <p className="text-[#f55757] flex items-center gap-3 ms-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </p>
            )}
            <button
              onClick={handleClose}
              type="button"
              className="text-sm py-2 px-4 ms-auto rounded-lg border border-[#353535] text-[#ededed]"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                handleSave(e);
              }}
              type="button"
              className="text-sm py-2 px-4 rounded-lg bg-[#ededed] text-black"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProjectMetadataForm;
