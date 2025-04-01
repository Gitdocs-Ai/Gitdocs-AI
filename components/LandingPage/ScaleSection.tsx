import {
  ArrowRight,
  Check,
  LightbulbIcon,
  TrendingUp,
  Server,
  Sparkles,
  Rocket,
  Code,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { useEffect, useRef, useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
const ScaleSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Create");
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;

    setAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => {
        setAnimating(false);
      }, 100);
    }, 300);
  };

  // Content for each tab
  const tabContent = {
    Create: {
      title: "Create",
      description:
        "Build beautiful documentation with our intuitive editor and customizable templates.",
      icon: <Code className="h-10 w-10 text-gitdocs-blue" />,
      benefits: [
        "Intelligent markdown editor with live preview",
        "Ready-to-use templates for any documentation need",
        "Automatic TOC and navigation generation",
      ],
    },
    Commit: {
      title: "Commit",
      description:
        "Share your documentation instantly with custom domains and versioning support.",
      icon: <Rocket className="h-10 w-10 text-gitdocs-purple" />,
      benefits: [
        "One-click publishing to custom domains",
        "Version control with easy rollbacks",
        "Automatic SEO optimization for documentation",
      ],
    },
    Collaborate: {
      title: "Collaborate",
      description:
        "Work together with your team on documentation with powerful collaboration tools.",
      icon: <Sparkles className="h-10 w-10 text-gitdocs-orange" />,
      benefits: [
        "Real-time collaborative editing",
        "Contextual comments and discussions",
        "Role-based permissions and access control",
      ],
    },
  };

  // Navigation buttons configuration
  const navButtons = [
    { icon: <LightbulbIcon className="h-5 w-5" />, label: "Create" },
    { icon: <Rocket className="h-5 w-5" />, label: "Commit" },
    { icon: <Sparkles className="h-5 w-5" />, label: "Collaborate" },
  ];

  // Get current content based on active tab
  const currentContent = tabContent[activeTab as keyof typeof tabContent];

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gradient-to-br from-white to-gray-50 py-24 md:px-10"
    >
      {/* Playful background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gitdocs-blue/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gitdocs-purple/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gitdocs-orange/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

        {/* Animated floating circles */}
        <div
          className="absolute top-1/4 right-1/4 w-16 h-16 bg-gitdocs-blue/10 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gitdocs-purple/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-12 h-12 bg-gitdocs-orange/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Decorative patterns */}
        <svg
          className="absolute right-0 top-0 -mt-16 opacity-10"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="dots-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gitdocs-blue"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#dots-pattern)" />
        </svg>

        <svg
          className="absolute left-0 bottom-0 -mb-16 opacity-10"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="dots-pattern-2"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gitdocs-purple"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#dots-pattern-2)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Navigation buttons */}
        <div className="flex justify-center mb-16 gap-4 relative z-10">
          {navButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(button.label)}
              className={`flex items-center gap-2 md:px-6 md:py-3 rounded-full text-sm px-3 py-2 transition-all duration-300 shadow-sm
                ${
                  button.label === activeTab
                    ? "bg-gradient-to-r from-gitdocs-blue to-gitdocs-purple text-white font-medium shadow-lg shadow-gitdocs-blue/20 scale-105"
                    : "bg-white/80 text-gray-600 border border-gray-200 hover:border-gitdocs-blue/20 hover:text-gitdocs-blue"
                }`}
            >
              {button.icon}
              <span className="font-medium">{button.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content with animation */}
          <div
            className={`transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } ${animating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-gradient-to-r from-gitdocs-blue to-gitdocs-purple rounded-full"></div>
              <p className="text-sm font-medium bg-gradient-to-r from-gitdocs-blue to-gitdocs-purple bg-clip-text text-transparent">
                Documentation Excellence
              </p>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              {currentContent.title} with Confidence
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-md">
              {currentContent.description}
            </p>

            <ul className="space-y-4 mb-10">
              {currentContent.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 transition-all duration-300 hover:translate-x-1"
                >
                  <span className="flex-shrink-0 p-1 rounded-full bg-gradient-to-r from-gitdocs-blue to-gitdocs-purple">
                    <Check className="h-5 w-5 text-white" />
                  </span>
                  <span className="text-lg text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <SignUpButton>
              <button
                className={`${buttonVariants({ variant: "gradient", size: "lg" })} 
                group inline-flex items-center transition-all shadow-md hover:shadow-lg`}
              >
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </SignUpButton>
          </div>

          {/* Right column - Visual element with animation */}
          <div
            className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 p-10 h-full min-h-[350px] rounded-2xl flex items-center justify-center relative">
              {/* Background blobs */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-gitdocs-blue/20 to-gitdocs-purple/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-br from-gitdocs-purple/20 to-gitdocs-orange/10 rounded-full blur-2xl"></div>

              <div className="relative bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-auto border border-gray-100 transform transition-all duration-500 hover:scale-105">
                <div className="absolute -top-10 -right-10 bg-gitdocs-blue/10 w-32 h-32 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-5 -left-5 bg-gitdocs-purple/10 w-24 h-24 rounded-full blur-xl"></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gitdocs-blue/10 to-gitdocs-purple/10 flex items-center justify-center mb-6 transform transition-all duration-300 hover:rotate-6">
                    {currentContent.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {currentContent.title} Your Docs
                  </h3>
                  <p className="text-gray-600">
                    GitDocs gives you the tools and features you need to{" "}
                    {activeTab.toLowerCase()} beautiful documentation that your
                    users will love.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScaleSection;
