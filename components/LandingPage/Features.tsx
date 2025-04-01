"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookText,
  Braces,
  FileCode,
  GitCompare,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

const featuresList = [
  {
    icon: <BookText className="h-6 w-6 text-gitdocs-blue" />,
    title: "Smart Documentation",
    description:
      "Automatically generate comprehensive documentation from your codebase using AI.",
    tag: "Popular",
    tagColor: "bg-gitdocs-blue",
  },
  {
    icon: <GitCompare className="h-6 w-6 text-gitdocs-purple" />,
    title: "Git Integration",
    description:
      "Seamlessly integrates with your Git workflow to keep documentation in sync with your code.",
    tag: "Core",
    tagColor: "bg-gitdocs-purple",
  },
  {
    icon: <Braces className="h-6 w-6 text-gitdocs-orange" />,
    title: "Code Analysis",
    description:
      "Intelligent parsing of your code to extract meaningful documentation and examples.",
    tag: "Smart",
    tagColor: "bg-gitdocs-orange",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-gitdocs-blue" />,
    title: "AI-Powered Insights",
    description:
      "Get suggestions for improving documentation based on AI analysis of your codebase.",
    tag: "New",
    tagColor: "bg-green-500",
  },
  {
    icon: <LayoutDashboard className="h-6 w-6 text-gitdocs-purple" />,
    title: "Custom Dashboard",
    description:
      "Beautiful dashboard to manage and organize all your documentation projects.",
    tag: "Pro",
    tagColor: "bg-indigo-600",
  },
  {
    icon: <FileCode className="h-6 w-6 text-gitdocs-orange" />,
    title: "Multi-Language Support",
    description:
      "Supports documentation for multiple programming languages and frameworks.",
    tag: "Versatile",
    tagColor: "bg-amber-600",
  },
];

const Features = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Set up intersection observer for the section
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Section is visible, prepare to animate items
          const timer = setTimeout(() => {
            animateItems();
          }, 200);
          return () => clearTimeout(timer);
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

  const animateItems = () => {
    // Animate items one by one with a delay
    itemRefs.current.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, index * 150);
    });
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section-padding relative overflow-hidden md:px-10"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gitdocs-blue/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-gitdocs-purple/5 to-transparent"></div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gitdocs-blue/5 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-gitdocs-purple/5 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-gitdocs-orange/5 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-4 border border-gitdocs-purple/30 rounded-full bg-gitdocs-purple/5 text-gitdocs-purple text-xs font-medium">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Everything You Need for{" "}
            <span className="text-gitdocs-blue relative">
              Perfect
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 300 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C32 2.5 62.5 8 93.5 9.5C124.5 11 156 6.5 187 4.5C218 2.5 249 5.5 280 8.5C311 11.5 330.5 5.83333 342 3"
                  stroke="currentColor"
                  strokeOpacity="0.35"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>{" "}
            Documentation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            GitDocs AI combines the power of artificial intelligence with your
            development workflow to create documentation that's always accurate
            and up-to-date.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (itemRefs.current) {
                  itemRefs.current[index] = el;
                }
              }}
              className={`relative bg-white backdrop-blur-sm rounded-2xl transition-all duration-500 group 
                  hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white/80 hover:to-white/90
                  border border-gray-100 shadow-sm overflow-hidden
                  ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Tag */}
              <div
                className={`absolute top-4 right-4 px-2 py-0.5 rounded-full text-white text-xs font-semibold ${feature.tagColor} 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                {feature.tag}
              </div>

              {/* Gradient border effect */}
              <div
                className="absolute inset-0 rounded-2xl p-[1px] -z-10 bg-gradient-to-br from-transparent via-transparent to-transparent 
                group-hover:from-gitdocs-blue/20 group-hover:via-gitdocs-purple/20 group-hover:to-gitdocs-orange/20 
                transition-all duration-500"
              ></div>

              <div className="p-8">
                <div
                  className="p-3 mb-4 inline-flex items-center justify-center rounded-full bg-white/80 shadow-sm 
                  group-hover:scale-110 group-hover:shadow-md group-hover:bg-white transition-all duration-300 
                  border border-gray-100"
                >
                  <div className="transition-transform duration-300 group-hover:rotate-[-8deg]">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gitdocs-blue transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-gitdocs-blue 
                    relative group-hover:font-semibold"
                >
                  <span className="relative z-10">Learn more</span>
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gitdocs-blue/30 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  ></span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                </a>

                {/* Background pattern */}
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0L100 100M20 0L100 80M40 0L100 60M60 0L100 40M80 0L100 20M0 20L80 100M0 40L60 100M0 60L40 100M0 80L20 100"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
