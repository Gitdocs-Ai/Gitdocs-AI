"use client"
// MarkdownPreview.tsx
import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useScrollPosition } from "@/contexts/ScrollContextProvider";

const MarkdownPreview = ({ content }: { content: string }) => {
  const { markdownScrollPosition, setMarkdownScrollPosition } = useScrollPosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRestoredRef = useRef(false);
  
  // Clean and preprocess content
  const cleanContent = content
    .replace(/\\n/g, "\n")
    .replace(/\\`\\`\\`/g, "```")
    .trim();

  // Explicitly save scroll position when component unmounts
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        const currentPos = containerRef.current.scrollTop;
        if (currentPos > 0) {
          // Ensure we capture the final scroll position
          setMarkdownScrollPosition(currentPos);
        }
      }
    };
  }, [setMarkdownScrollPosition]);

  // Restore scroll position after content has rendered
  useEffect(() => {
    // Make sure content is available and we have a scroll position to restore
    if (content && containerRef.current && markdownScrollPosition > 0 && !hasRestoredRef.current) {
      // Use a more substantial delay to ensure markdown has fully rendered
      const timer = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = markdownScrollPosition;
          hasRestoredRef.current = true;
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [content, markdownScrollPosition]);

  // Reset restoration flag when component unmounts
  useEffect(() => {
    return () => {
      hasRestoredRef.current = false;
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Only update on significant scroll changes to reduce state updates
    const newPosition = e.currentTarget.scrollTop;
    const difference = Math.abs(newPosition - markdownScrollPosition);
    
    // Only update if scrolled more than 20px to reduce unnecessary state updates
    if (difference > 20) {
      setMarkdownScrollPosition(newPosition);
    }
  };

  return (
    <>
      {content ? (
        <div 
          ref={containerRef}
          className="h-[calc(100vh-8rem)] markdown bg-transparent text-[#e0e3e7] focus:outline-none w-full p-4 resize-none rounded-b-lg overflow-y-auto"
          onScroll={handleScroll}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {cleanContent}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="h-[calc(100vh-11rem)] flex items-center justify-center">
          <p>No Preview Available</p>
        </div>
      )}
    </>
  );
};

export default MarkdownPreview;