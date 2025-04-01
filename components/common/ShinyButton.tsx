"use client";

import { useRef } from "react";

interface ShinyButtonProps {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  isPreview: boolean;
}

const ShinyButton = ({ label, onClick, icon, isPreview }: ShinyButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    if (containerRef.current) {
      containerRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(100,200,255,0.5), transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.background = "transparent";
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block rounded-full p-[1.5px] cursor-pointer transition-all duration-300"
    >
      <span
        className={`bg-[#0A0A0A] text-[#c1c1c1] rounded-full border border-[#3e3d3d] hover:border-transparent flex items-center gap-2 whitespace-nowrap overflow-hidden transition-all duration-150 ${isPreview ? "text-xs px-2.5 py-1" : "text-sm px-4 py-1.5"}`}
      >
        {icon}
        {label}
      </span>
    </div>
  );
};

export default ShinyButton;
