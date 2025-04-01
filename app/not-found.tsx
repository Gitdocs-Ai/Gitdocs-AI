"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { useContext } from "react";
import { AppContext, AppContextType } from "@/contexts/AppContext";

const NotFound = () => {
  const pathname = usePathname();

  const { setStopAllActions } = useContext(
    AppContext,
  ) as unknown as AppContextType;

  const goDashboard = () => {
    if (
      pathname.includes("/update_readme") ||
      pathname.includes("/dashboard") ||
      pathname.includes("/subscription")
    ) {
      setStopAllActions(false);
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F1F0FB] flex flex-col justify-center items-center px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gitdocs-blue/5"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-gitdocs-purple/5"></div>
        <div className="absolute top-2/3 right-1/4 w-48 h-48 rounded-full border border-gitdocs-orange/10"></div>
        <div className="absolute bottom-1/4 left-1/5 w-40 h-40 rounded-full border border-gitdocs-blue/10"></div>

        {/* Code bracket decorations */}
        <div className="absolute top-20 right-10 text-9xl opacity-10 text-gitdocs-blue font-mono hidden md:block">
          {"{"}
        </div>
        <div className="absolute bottom-20 left-10 text-9xl opacity-10 text-gitdocs-purple font-mono hidden md:block">
          {"}"}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full text-center">
        <div className="mb-8 animate-float">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-gitdocs-blue via-gitdocs-purple to-gitdocs-orange bg-clip-text text-transparent drop-shadow-sm">
            404
          </h1>
        </div>

        <div className="space-y-6 max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#221F26]">
            Page Not Found
          </h2>

          <p className="text-lg text-gray-600 animate-fade-in">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4 animate-fade-in-delay-1">
            <Link
              href={goDashboard() ? "/dashboard" : "/"}
              className={buttonVariants({
                variant: "gradient",
                size: "lg",
              })}
            >
              Return Home
            </Link>

            <a
              href="mailto:abhas.kumar@gitdocs.space"
              className={buttonVariants({
                variant: "outline-gradient",
                size: "lg",
              })}
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Path info */}
        <div className="mt-12 bg-white/60 rounded-lg p-4 inline-block animate-fade-in-delay-2">
          <code className="text-sm text-gitdocs-purple font-mono">
            Attempted path:{" "}
            <span className="text-gitdocs-blue">{pathname}</span>
          </code>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
