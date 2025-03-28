"use client";

import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { SignUpButton } from "@clerk/nextjs";

const steps = [
    {
        number: "01",
        title: "Connect Your Repository",
        description:
            "Link your GitHub, GitLab, or Bitbucket repository to GitDocs AI with a few clicks.",
        color: "from-gitdocs-blue/20 to-gitdocs-blue/5",
        hoverColor: "hover:from-gitdocs-blue/30 hover:to-gitdocs-blue/10",
    },
    {
        number: "02",
        title: "AI Analyzes Your Code",
        description:
            "Our AI scans your codebase, understanding its structure, functions, and relationships.",
        color: "from-gitdocs-purple/20 to-gitdocs-purple/5",
        hoverColor: "hover:from-gitdocs-purple/30 hover:to-gitdocs-purple/10",
    },
    {
        number: "03",
        title: "Generate Documentation",
        description:
            "Beautiful, accurate documentation is created automatically, ready for your team.",
        color: "from-gitdocs-orange/20 to-gitdocs-orange/5",
        hoverColor: "hover:from-gitdocs-orange/30 hover:to-gitdocs-orange/10",
    },
    {
        number: "04",
        title: "Stay In Sync",
        description:
            "As your code evolves, GitDocs AI updates your documentation automatically.",
        color: "from-gitdocs-blue/20 to-gitdocs-blue/5",
        hoverColor: "hover:from-gitdocs-blue/30 hover:to-gitdocs-blue/10",
    },
];

const HowItWorks = () => {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set up intersection observer for the section
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    // Start animating steps with delay
                    steps.forEach((_, index) => {
                        setTimeout(
                            () => {
                                setVisibleItems((prev) => [...prev, index]);
                            },
                            300 + index * 200,
                        );
                    });

                    // Animate button after steps
                    setTimeout(
                        () => {
                            setIsButtonVisible(true);
                        },
                        300 + steps.length * 200 + 200,
                    );
                }
            },
            { threshold: 0.2 },
        );

        if (sectionRef.current) {
            sectionObserver.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                sectionObserver.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            className="section-padding bg-gray-50/50 relative overflow-hidden"
        >
            {/* Background decorative elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gitdocs-blue/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gitdocs-purple/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-3 py-1 mb-4 border border-gitdocs-orange/30 rounded-full bg-gitdocs-orange/5 text-gitdocs-orange text-xs font-medium">
                        How It Works
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                        Simple Process, Powerful Results
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        GitDocs AI seamlessly integrates with your development
                        workflow, making documentation a breeze rather than a
                        burden.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (stepsRefs.current) {
                                    stepsRefs.current[index] = el;
                                }
                            }}
                            className={`relative bg-white rounded-2xl shadow-sm overflow-hidden group 
                  transition-all duration-500 hover:shadow-lg hover:-translate-y-1
                  ${
                      visibleItems.includes(index)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-20"
                  }`}
                            style={{
                                transitionDelay: `${index * 100}ms`,
                                transformOrigin:
                                    index % 2 === 0 ? "left" : "right",
                            }}
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${step.color} ${step.hoverColor} 
                opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                            />

                            {/* Number indicator with animation */}
                            <div
                                className="absolute top-4 right-6 opacity-40 group-hover:opacity-70 
                transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
                            >
                                <span className="text-7xl font-bold text-black/10">
                                    {step.number}
                                </span>
                            </div>

                            <div className="relative p-8">
                                <span className="text-5xl font-bold text-black/10">
                                    {step.number}
                                </span>
                                <h3 className="text-xl font-semibold mt-4 mb-3 group-hover:text-gitdocs-blue transition-colors duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground group-hover:text-gray-700 transition-colors duration-300">
                                    {step.description}
                                </p>

                                {/* Hidden icon that appears on hover */}
                                <div
                                    className="absolute bottom-4 right-4 transform translate-y-8 opacity-0 
                  group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-gitdocs-blue/40"
                                    >
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    ref={buttonRef}
                    className={`mt-16 text-center transition-all duration-700
          ${isButtonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <SignUpButton>
                        <p
                            className={`cursor-pointer ${buttonVariants({ variant: "gradient", size: "lg" })} 
                shadow-md hover:shadow-xl hover:shadow-gitdocs-blue/10`}
                        >
                            Start Documenting Smarter
                        </p>
                    </SignUpButton>

                    <div className="mt-4 ms-5 inline-flex items-center text-sm text-muted-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2"
                        >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                        </svg>
                        No credit card required to start
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
