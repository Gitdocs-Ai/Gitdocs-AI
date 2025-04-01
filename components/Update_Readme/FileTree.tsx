"use client";

import { useEffect, useState } from "react";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import LoadingAnimation from "../common/LoadingAnimation";

interface TreeNodeProps {
  item: any;
  depth?: number;
  fetchChildren?: (path: string[]) => Promise<any[]>;
  path?: string[];
  selectedFiles: string[];
  setSelectedFiles: (files: string[]) => void;
}

const TreeNodeComponent = ({
  item,
  depth = 0,
  fetchChildren,
  path = [],
  selectedFiles,
  setSelectedFiles,
}: TreeNodeProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [children, setChildren] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const isFolder = Array.isArray(item);

  // Extract the name of the item
  const name = isFolder ? item[0] : item;

  // Calculate the current path
  const currentPath = [...path, name.toString()];

  // Get initial children if the item is a folder
  const initialChildren = isFolder ? item.slice(1) : [];

  const handleToggle = async () => {
    if (isFolder) {
      const newOpenState = !isOpen;
      setIsOpen(newOpenState);

      // If opening and we have a fetch function and haven't loaded yet
      if (newOpenState && fetchChildren && !hasLoaded) {
        try {
          setIsLoading(true);
          const fetchedChildren = await fetchChildren(currentPath);
          setChildren(fetchedChildren);
          setHasLoaded(true);
        } catch (error) {
          console.error("Error fetching children:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="my-1">
      {isFolder ? (
        <Collapsible open={isOpen} onOpenChange={handleToggle}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center gap-1 px-1 py-1 rounded hover:bg-gray-800 transition-colors">
              <span className="w-4">
                {isOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
              <Folder size={16} className="text-blue-500" />
              <span className="ml-1 text-sm">{name}</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-5 pl-2 border-l border-gray-200 dark:border-gray-700">
              {isLoading ? (
                <div className="flex items-center gap-2 py-2">
                  <LoadingAnimation />
                  <span className="text-sm text-gray-500">Loading...</span>
                </div>
              ) : (
                <>
                  {/* Display initial children if we haven't loaded from backend yet */}
                  {(!hasLoaded ? initialChildren : children).map(
                    (child, index) => (
                      <TreeNodeComponent
                        key={`${currentPath.join("-")}-${index}-${Array.isArray(child) ? child[0] : child}`}
                        item={child}
                        depth={depth + 1}
                        fetchChildren={fetchChildren}
                        path={currentPath}
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                      />
                    ),
                  )}
                </>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div className="flex items-center gap-1 px-1 rounded hover:bg-gray-800 transition-colors">
          <span className="w-4"></span>
          <File size={16} className="text-gray-500" />
          <label
            htmlFor={name}
            className="ml-1 text-sm flex-1 h-full py-1 cursor-pointer"
          >
            {name}
          </label>
          <input
            type="checkbox"
            className="w-3.5 h-3.5 text-[#ededed] bg-[#1F1F1F] border-[#353535] rounded focus:ring-[#ededed] focus:ring-1"
            id={name}
            checked={selectedFiles.includes(
              (path + "," + name).split(",").join("/"),
            )}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedFiles([
                  ...selectedFiles,
                  (path + "," + name).split(",").join("/"),
                ]);
              } else {
                setSelectedFiles(
                  selectedFiles.filter(
                    (file) => file !== (path + "," + name).split(",").join("/"),
                  ),
                );
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

interface FileTreeProps {
  initialTree: any[]; // Using any[] to accommodate the complex nested structure
  fetchChildren?: (path: string[]) => Promise<any[]>;
  selectedFiles: string[];
  setSelectedFiles: (files: string[]) => void;
  error: string;
  setError: (error: string) => void;
}

const FileTree = ({
  initialTree,
  fetchChildren,
  selectedFiles,
  setSelectedFiles,
  error,
  setError,
}: FileTreeProps) => {
  useEffect(() => {}, [selectedFiles]);
  return (
    <>
      {error ? (
        <div className="p-2 h-44 border flex items-center justify-center border-[#353535] rounded-md overflow-y-auto shadow-sm bg-transparent w-full">
          <h2 className="font-semibold mb-3 text-sm text-red-400">{error}</h2>
        </div>
      ) : (
        <div className="p-2 max-h-96 min-h-44 border border-[#353535] rounded-md overflow-y-auto shadow-sm bg-transparent w-full">
          {initialTree.length > 0 && (
            <h2 className="font-semibold mb-3 text-sm">
              Add files
              <span className="text-xs text-gray-500">
                {" "}
                (Readme.md, package.json are added by default)
              </span>
            </h2>
          )}
          {initialTree.length > 0 ? (
            initialTree.map((item, index) => (
              <>
                <TreeNodeComponent
                  key={`root-${index}-${Array.isArray(item) ? item[0] : item}`}
                  item={item}
                  fetchChildren={fetchChildren}
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                />
              </>
            ))
          ) : (
            <div className="flex flex-col items-center gap-2 w-fit h-fit mt-14 mx-auto">
              <div className="flex gap-2">
                <span className="text-sm text-gray-500">
                  Estimated time: 10 seconds
                </span>
              </div>
              <div className="flex gap-2">
                <LoadingAnimation />
                <span className="text-sm text-gray-500">Updating...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FileTree;
