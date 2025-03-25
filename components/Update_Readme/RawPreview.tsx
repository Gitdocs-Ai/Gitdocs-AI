"use client"
// RawPreview.tsx
import React, { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useScrollPosition } from "@/contexts/ScrollContextProvider";

const RawPreview = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (content: string | ((prev: string) => string)) => void;
}) => {
  const { rawScrollPosition, setRawScrollPosition } = useScrollPosition();
  const editorRef = useRef<any>(null);
  const hasRestoredRef = useRef(false);
  const scrollListenerRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    
    // Restore scroll position when editor is fully mounted and ready
    if (rawScrollPosition > 0 && !hasRestoredRef.current) {
      // Use a more substantial delay to ensure the editor is fully ready
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.setScrollTop(rawScrollPosition);
          hasRestoredRef.current = true;
        }
      }, 100);
    }

    // Add scroll listener with throttling to save position
    scrollListenerRef.current = editor.onDidScrollChange((e: any) => {
      // Only update on significant scroll changes
      const newPosition = e.scrollTop;
      const difference = Math.abs(newPosition - rawScrollPosition);
      
      if (difference > 20 || newPosition === 0) {
        setRawScrollPosition(newPosition);
      }
    });
  };

  // Save scroll position when component unmounts
  useEffect(() => {
    return () => {
      if (editorRef.current) {
        const currentPos = editorRef.current.getScrollTop();
        if (currentPos > 0) {
          setRawScrollPosition(currentPos);
        }
      }
      
      // Clean up scroll listener
      if (scrollListenerRef.current) {
        scrollListenerRef.current.dispose();
      }
      
      // Reset restoration flag
      hasRestoredRef.current = false;
    };
  }, [setRawScrollPosition]);

  return (
    <>
      {content ? (
        <Editor
          height="calc(100vh - 8rem)"
          defaultLanguage="markdown"
          value={content.replace(/\\n/g, "\n").replace(/\\`\\`\\`/g, "```").trim()}
          onChange={(value) => {
            setContent(value || ""); 
          }}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            roundedSelection: false,
            wordWrap: "on",
            theme: "vs-dark",
          }}
        />
      ) : (
        <div className="h-[calc(100vh-11rem)] flex items-center justify-center text-gray-300">
          <p>No Preview Available</p>
        </div>
      )}
    </>
  );
};

export default RawPreview;