"use client";

import { useState, useEffect } from "react";

interface MacbookScreenProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  placeholderText?: string;
}

const MacbookScreen = ({
  children,
  title,
  className = "",
  placeholderText = "Video content will be embedded here",
}: MacbookScreenProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Animate glow position
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowPosition({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x, y });
  };

  return (
    <div
      className={`relative perspective-1000 -mb-14 ${className} ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 group`}
      onMouseMove={handleMouseMove}
    >
      {/* Macbook Frame */}
      <div className="relative mx-auto md:w-full max-w-4xl transform transition-transform duration-300 w-[200%] -translate-x-1/2 left-1/2 md:translate-x-0 md:left-0 md:scale-110 sm:scale-75 scale-50">
        {/* Top Lid with Screen */}
        <div className="relative bg-gradient-to-b from-[#1A1F2C] to-[#272d3b] rounded-t-lg pt-3 pb-1 px-3 shadow-xl border-t border-l border-r border-gray-700">
          {/* Camera */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-black/20 border border-gray-600 overflow-hidden">
            <div className="absolute inset-0 bg-black/40 rounded-full scale-[0.6]"></div>
          </div>

          {/* Screen */}
          <div className="bg-black rounded-t-md overflow-hidden aspect-video relative">
            {/* Dynamic glow effect */}
            <div
              className="absolute w-[200%] h-[200%] pointer-events-none opacity-30 transition-opacity duration-500 group-hover:opacity-60"
              style={{
                background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(96, 165, 250, 0.3) 0%, rgba(126, 34, 206, 0.2) 30%, rgba(249, 115, 22, 0.1) 60%, transparent 70%)`,
                top: "-50%",
                left: "-50%",
                transition: "all 1.5s cubic-bezier(0.19, 1, 0.22, 1)",
              }}
            />

            {/* Content */}
            {children ? (
              <div className="relative z-10 w-full h-full">{children}</div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gitdocs-blue/10 to-gitdocs-purple/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/30 mb-4 animate-pulse"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                <p className="text-white/70 text-lg font-medium">
                  {placeholderText}
                </p>
                {title && <p className="text-white/50 text-sm mt-2">{title}</p>}

                {/* Animated code lines in background */}
                <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-px bg-white/30 absolute left-0 right-0"
                      style={{
                        top: `${i * 10 + Math.random() * 5}%`,
                        width: `${Math.random() * 50 + 50}%`,
                        opacity: Math.random() * 0.8 + 0.2,
                        transform: `translateX(${i % 2 === 0 ? "0" : "50%"})`,
                        animation: `slideIn ${Math.random() * 3 + 2}s infinite linear`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Screen edge reflection */}
            <div className="absolute inset-0 border border-white/5 pointer-events-none"></div>

            {/* Screen glare effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </div>

        {/* Bottom Base */}
        <div className="relative h-3 bg-gradient-to-b from-[#1A1F2C] to-[#272d3b] rounded-b-lg shadow-lg border-b border-l border-r border-gray-700">
          {/* Trackpad */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-1/4 h-1 bg-gray-700/30 rounded-b"></div>
        </div>

        {/* Table reflection */}
        <div className="h-4 mx-auto w-[80%] bg-gradient-to-b from-black/20 to-transparent rounded-b-full blur-sm"></div>
      </div>

      {/* Custom keyframes for the animated code lines */}
      <style>
        {`
        @keyframes slideIn {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        `}
      </style>
    </div>
  );
};

export default MacbookScreen;
