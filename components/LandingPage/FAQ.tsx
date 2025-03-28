"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const faqs = [
    {
        question: "How does GitDocs AI generate documentation?",
        answer: "GitDocs AI uses advanced natural language processing to analyze your codebase, understand its structure, and generate comprehensive documentation. It identifies functions, classes, APIs, and their relationships to create accurate, well-structured documentation.",
    },
    {
        question: "Which programming languages are supported?",
        answer: "We currently support JavaScript, TypeScript, Python, Java, Go, Ruby, PHP, C#, and Rust. We're constantly adding support for more languages based on user demand.",
    },
    {
        question: "Can I customize the generated documentation?",
        answer: "Absolutely! You can customize the documentation templates, choose different themes, and edit any generated content. GitDocs AI also learns from your edits to improve future documentation.",
    },
    {
        question: "How does the GitHub integration work?",
        answer: "After connecting your GitHub repository, GitDocs AI automatically syncs with your codebase. When you push new changes, our system detects them and updates your documentation accordingly. You can also set up automatic pull requests for documentation updates.",
    },
    {
        question: "Is my code secure with GitDocs AI?",
        answer: "Security is our top priority. We use bank-level encryption and never store your actual code. We only analyze the structure and documentation-relevant parts, and all data is processed in isolated, secure environments.",
    },
    {
        question: "Can I export the documentation to my own servers?",
        answer: "Yes! GitDocs AI allows you to export documentation in multiple formats (Markdown, HTML, PDF) that you can host anywhere. For Pro users, we also offer continuous deployment options to your own domains.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="faq"
            className="section-padding relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50"
        >
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-gitdocs-blue/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gitdocs-purple/5 to-transparent"></div>

            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 transform rotate-45 w-10 h-10 border-2 border-gitdocs-blue/20 rounded-md"></div>
                <div className="absolute top-40 right-20 transform -rotate-12 w-16 h-16 border-2 border-gitdocs-purple/20 rounded-full"></div>
                <div className="absolute bottom-20 left-1/4 transform rotate-12 w-14 h-14 border-2 border-gitdocs-orange/20 rounded-full"></div>
                <div className="absolute top-1/4 right-10 text-6xl opacity-10 text-gitdocs-blue font-mono">
                    {"}"}
                </div>
                <div className="absolute bottom-1/4 left-10 text-6xl opacity-10 text-gitdocs-purple font-mono">
                    {"{"}
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div
                    className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}
                >
                    <div className="inline-flex items-center px-3 py-1 mb-4 border border-gitdocs-blue/30 rounded-full bg-gitdocs-blue/5 text-gitdocs-blue text-xs font-medium">
                        Frequently Asked Questions
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                        Got Questions? We've Got Answers
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to know about GitDocs AI. Can't find
                        the answer you're looking for?
                        <Link
                            href="/#contact"
                            className="text-gitdocs-blue font-medium hover:underline ml-1"
                        >
                            Contact our team
                        </Link>
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`transition-all duration-500 ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                                }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="flex justify-between items-center w-full p-6 text-left"
                                    >
                                        <span className="text-lg font-semibold">
                                            {faq.question}
                                        </span>
                                        <span
                                            className={`ml-6 flex-shrink-0 transition-transform duration-300 ${
                                                openIndex === index
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
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
                                            >
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </span>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            openIndex === index
                                                ? "max-h-96 opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="p-6 pt-0 text-muted-foreground">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
