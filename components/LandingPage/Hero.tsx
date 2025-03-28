"use client";

import { buttonVariants } from "@/components/ui/button-variants";
import {
    FileText,
    MessageSquare,
    Copy,
    Sparkles,
    Zap,
    BrainCircuit,
    ChevronRight,
    CaseSensitive,
    Smile,
    Star,
    Rocket,
    Gift,
    Heart,
    Trophy,
    Lightbulb,
    Code,
    Palette,
} from "lucide-react";
import MacbookScreen from "./MacbookScreen";
import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-24 md:pt-28 md:pb-24">
            {/* Updated background gradient to match the reference image */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-gitdocs-purple/20 via-gitdocs-blue/15 to-white" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gitdocs-blue/10 via-gitdocs-purple/10 to-transparent opacity-70" />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gitdocs-orange/10 via-gitdocs-purple/5 to-transparent opacity-60" />

                {/* Elliptical shape with blur behind main heading */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[600px] h-[300px] bg-gradient-to-r from-gitdocs-blue/30 via-gitdocs-purple/25 to-gitdocs-orange/20 rounded-full blur-[80px] opacity-60" />

                {/* Noise texture overlay for glittering effect */}
                <div
                    className="absolute inset-0 mix-blend-overlay opacity-[0.25] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "200px 200px",
                    }}
                />

                {/* Additional subtle glittering effect */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 5%), 
                                radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 4%), 
                                radial-gradient(circle at 40% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 3%), 
                                radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.12) 0%, transparent 6%)`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "1000px 1000px",
                    }}
                />
            </div>

            {/* Floating elements */}
            <div
                className="absolute top-20 right-[10%] w-16 h-16 animate-float hidden md:block"
                style={{ animationDelay: "0.7s" }}
            >
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 rounded-full bg-gitdocs-blue/10 animate-pulse-subtle"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gitdocs-blue/70" />
                    </div>
                </div>
            </div>

            <div
                className="absolute bottom-32 left-[8%] w-14 h-14 animate-float hidden md:block"
                style={{ animationDelay: "1.2s", animationDuration: "7s" }}
            >
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 rounded-full bg-gitdocs-purple/10 animate-pulse-subtle"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <BrainCircuit className="h-7 w-7 text-gitdocs-purple/70" />
                    </div>
                </div>
            </div>

            <div
                className="absolute top-44 right-[28%] w-10 h-10 animate-float hidden md:block"
                style={{ animationDelay: "1.8s", animationDuration: "6s" }}
            >
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 rounded-full bg-gitdocs-orange/10 animate-pulse-subtle"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-gitdocs-orange/70" />
                    </div>
                </div>
            </div>

            <div className="hidden md:block">
                {/* Element 1: Rocket */}
                <div
                    className="absolute top-96 right-[15%] w-12 h-12 animate-float"
                    style={{
                        animationDelay: "1.5s",
                        animationDuration: "6.5s",
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 rounded-full bg-gitdocs-light-blue/15 animate-pulse-subtle"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-gitdocs-blue/70" />
                        </div>
                    </div>
                </div>

                {/* Element 2: Star */}
                <div
                    className="absolute hidden md:block top-[20%] left-[10%] w-14 h-14 animate-float"
                    style={{
                        animationDelay: "2.2s",
                        animationDuration: "5.5s",
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 rounded-full bg-gitdocs-orange/15 animate-pulse-subtle"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Star className="h-8 w-8 text-gitdocs-orange/80" />
                        </div>
                    </div>
                </div>

                {/* Element 3: Gift */}
                <div
                    className="absolute top-[45%] left-[5%] w-12 h-12 animate-float"
                    style={{
                        animationDelay: "0.9s",
                        animationDuration: "7.2s",
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 rounded-full bg-gitdocs-light-purple/15 animate-pulse-subtle"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Gift className="h-5 w-5 text-gitdocs-purple/80" />
                        </div>
                    </div>
                </div>

                {/* Element 4: Trophy */}
                <div
                    className="absolute bottom-[25%] right-[12%] w-9 h-9 animate-float"
                    style={{
                        animationDelay: "1.3s",
                        animationDuration: "6.8s",
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 rounded-full bg-gitdocs-light-orange/15 animate-pulse-subtle"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Trophy className="h-4.5 w-4.5 text-gitdocs-orange/80" />
                        </div>
                    </div>
                </div>

                {/* Element 5: Heart */}
                <div
                    className="absolute top-[28%] right-[40%] w-7 h-7 animate-float"
                    style={{
                        animationDelay: "2.5s",
                        animationDuration: "5.2s",
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 rounded-full bg-gitdocs-purple/10 animate-pulse-subtle"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Heart className="h-3.5 w-3.5 text-gitdocs-purple/70" />
                        </div>
                    </div>
                </div>

                {/* Element 6: Lightbulb */}
                <div
                    className="absolute bottom-[40%] left-[22%] w-11 h-11 animate-float"
                    style={{
                        animationDelay: "0.6s",
                        animationDuration: "7.8s",
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 rounded-full bg-gitdocs-light-blue/12 animate-pulse-subtle"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Lightbulb className="h-5.5 w-5.5 text-gitdocs-blue/75" />
                        </div>
                    </div>
                </div>

                {/* Element 7: Palette */}
                <div
                    className="absolute top-[60%] left-[35%] w-9 h-9 animate-float"
                    style={{
                        animationDelay: "1.7s",
                        animationDuration: "6.3s",
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 rounded-full bg-gitdocs-light-orange/12 animate-pulse-subtle"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Palette className="h-4.5 w-4.5 text-gitdocs-orange/75" />
                        </div>
                    </div>
                </div>

                {/* Element 8: Code */}
                <div
                    className="absolute top-[7%] left-[20%] w-10 h-10 animate-float"
                    style={{
                        animationDelay: "2.1s",
                        animationDuration: "5.9s",
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 rounded-full bg-gitdocs-blue/10 animate-pulse-subtle"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Code className="h-5 w-5 text-gitdocs-blue/70" />
                        </div>
                    </div>
                </div>

                {/* Element 9: Smile */}
                <div
                    className="absolute bottom-[15%] left-[15%] w-8 h-8 animate-float"
                    style={{
                        animationDelay: "1.4s",
                        animationDuration: "7.3s",
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 rounded-full bg-gitdocs-light-purple/12 animate-pulse-subtle"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Smile className="h-4 w-4 text-gitdocs-purple/75" />
                        </div>
                    </div>
                </div>

                {/* Element 10: CaseSensitive */}
                <div
                    className="absolute top-[50%] right-[5%] w-9 h-9 animate-float"
                    style={{
                        animationDelay: "0.8s",
                        animationDuration: "6.7s",
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 rounded-full bg-gitdocs-blue/12 animate-pulse-subtle"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <CaseSensitive className="h-4.5 w-4.5 text-gitdocs-blue/75" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative">
                {/* Main Hero Content */}
                <div className="max-w-5xl mx-auto text-center -mb-10 md:mb-16 px-3">
                    <div className="inline-flex items-center px-3 py-1 mb-6 border border-gitdocs-blue/30 rounded-full bg-gitdocs-blue/5 text-gitdocs-blue text-xs font-medium">
                        <Sparkles className="h-3.5 w-3.5 mr-2" />
                        <span>Documentation Reimagined with AI</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl mt-5 md:mt-0 font-bold tracking-tight mb-6 relative z-10">
                        <span className="text-gitdocs-blue">The fastest</span>{" "}
                        <span className="text-gray-900">— way to build</span>
                        <br />
                        <span className="text-gray-900">
                            perfect documentation
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Generate beautiful, comprehensive README files with just
                        a few prompts. Let AI handle your documentation while
                        you focus on coding.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 md:flex-row flex-col w-fit mx-auto">
                        <SignUpButton>
                            <span
                                className={`cursor-pointer flex group items-center ${buttonVariants({ variant: "gradient", size: "lg" })} pe-6 hover:bg-opacity-0 `}
                            >
                                Get Started Free
                                <ChevronRight
                                    className={`ml-2 w-5 h-5 group-hover:translate-x-1.5 transform transition-transform duration-300 `}
                                />
                            </span>
                        </SignUpButton>

                        <Link
                            href="#how-it-works"
                            className={`cursor-pointer ${buttonVariants({ variant: "outline-gradient", size: "lg" })} `}
                        >
                            How it works
                        </Link>
                    </div>
                </div>

                {/* Macbook Display with AI Interface and Markdown Preview */}
                <div className="lg:max-w-6xl sm:w-[95%] md:relative block mx-auto">
                    <MacbookScreen>
                        <div className="flex h-full">
                            {/* AI Chat Interface (Left Side) */}
                            <div className="w-1/2 h-full bg-gray-900 text-white p-4 border-r border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-sm font-medium">
                                        AI Assistant
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="p-1 rounded-md hover:bg-gray-700">
                                            <Sparkles className="h-4 w-4 text-gitdocs-blue" />
                                        </button>
                                        <button className="p-1 rounded-md hover:bg-gray-700">
                                            <MessageSquare className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                <div className="h-[calc(100%-8rem)] overflow-y-auto mb-4 space-y-4">
                                    <div className="bg-gray-800 p-3 rounded-lg max-w-[85%]">
                                        <p className="text-sm text-gray-200">
                                            Hello! I'm GitDocs AI. I can help
                                            you create documentation for your
                                            project. What would you like to
                                            generate today?
                                        </p>
                                    </div>

                                    <div className="bg-gitdocs-blue/20 p-3 rounded-lg ml-auto max-w-[85%]">
                                        <p className="text-sm">
                                            I need to create a README for my new
                                            React component library.
                                        </p>
                                    </div>

                                    <div className="bg-gray-800 p-3 rounded-lg max-w-[85%]">
                                        <p className="text-sm text-gray-200">
                                            Great! I can help with that. Could
                                            you provide some details about your
                                            library? What's the main purpose and
                                            what kind of components does it
                                            include?
                                        </p>
                                    </div>

                                    <div className="bg-gitdocs-blue/20 p-3 rounded-lg ml-auto max-w-[85%]">
                                        <p className="text-sm">
                                            It's a modern UI library with 30+
                                            components. It uses TypeScript and
                                            supports theming.
                                        </p>
                                    </div>

                                    <div className="bg-gray-800 p-3 rounded-lg max-w-[85%]">
                                        <p className="text-sm text-gray-200">
                                            Perfect! I'll generate a
                                            comprehensive README for your React
                                            component library. It will include
                                            installation instructions, usage
                                            examples, theming options, and
                                            component documentation.
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute bottom-4 left-4 right-[calc(50%+20px)] bg-gray-800 rounded-lg">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="w-full bg-transparent text-white p-3 pl-4 pr-10 outline-none text-sm"
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gitdocs-blue">
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Markdown Preview (Right Side) */}
                            <div className="w-1/2 h-full bg-white overflow-y-auto p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-lg font-semibold text-gray-800">
                                        README.md Preview
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="p-1 rounded-md hover:bg-gray-100">
                                            <Copy className="h-4 w-4 text-gray-500" />
                                        </button>
                                        <button className="p-1 rounded-md hover:bg-gray-100">
                                            <FileText className="h-4 w-4 text-gray-500" />
                                        </button>
                                    </div>
                                </div>

                                <div className="prose prose-slate max-w-none">
                                    <h1 className="text-2xl font-bold text-gitdocs-blue">
                                        React UI Component Library
                                    </h1>

                                    <div className="flex items-center space-x-2 my-4">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                                            TypeScript
                                        </span>
                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs">
                                            React
                                        </span>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                                            Components
                                        </span>
                                    </div>

                                    <p className="text-gray-700">
                                        A modern, lightweight and fully
                                        customizable UI component library for
                                        React applications.
                                    </p>

                                    <h2 className="text-xl font-semibold text-gray-800 mt-6">
                                        Installation
                                    </h2>
                                    <pre className="bg-gray-100 p-3 rounded-lg text-sm">
                                        npm install @your-org/react-ui-library
                                    </pre>

                                    <h2 className="text-xl font-semibold text-gray-800 mt-6">
                                        Features
                                    </h2>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                        <li>30+ customizable UI components</li>
                                        <li>
                                            Written in TypeScript with full type
                                            definitions
                                        </li>
                                        <li>Comprehensive theming system</li>
                                        <li>
                                            Accessible components following
                                            WAI-ARIA standards
                                        </li>
                                        <li>
                                            Tree-shakeable to minimize bundle
                                            size
                                        </li>
                                    </ul>

                                    <h2 className="text-xl font-semibold text-gray-800 mt-6">
                                        Basic Usage
                                    </h2>
                                    <pre className="bg-gray-100 p-3 rounded-lg text-sm">
                                        {`import { Button } from '@your-org/react-ui-library';

                    function App() {
                      return (
                        <Button variant="primary">
                          Click Me
                        </Button>
                      );
                    }`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </MacbookScreen>
                </div>
            </div>
        </section>
    );
};

export default Hero;
