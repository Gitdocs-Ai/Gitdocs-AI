"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        content:
            "The developer experience is unmatched. It's like they read my mind and built exactly what I needed.",
        author: "Eugenia Knox",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
        content:
            "GitDocs AI has completely transformed our documentation workflow. What used to take days now happens automatically, and the quality is actually better!",
        author: "Markus Kaiser",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
        content:
            "I was skeptical about AI-generated documentation, but GitDocs AI impressed me with its accuracy and context-awareness. It actually understands our codebase.",
        author: "Karen Sims",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
        content:
            "As a startup with limited resources, having our documentation automatically generated and maintained has been a game-changer. One less thing to worry about!",
        author: "Hugo Greene",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Set up intersection observer for animation
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 },
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

    const goToTestimonial = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="relative py-24 md:py-32 overflow-hidden bg-white"
        >
            {/* Background elements */}
            <div className="absolute inset-0 opacity-70">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-gitdocs-blue/5 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gitdocs-purple/5 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div
                    className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                        Loved by developers
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our users
                        have to say.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div
                        className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
                    >
                        {/* Testimonial slider */}
                        <div className="overflow-hidden">
                            <div className="relative">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className={`text-center transition-all duration-700 ease-in-out ${activeIndex === index ? "opacity-100 block" : "opacity-0 hidden"}`}
                                    >
                                        <div className="mb-10 relative">
                                            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                                                <Image
                                                    width={80}
                                                    height={80}
                                                    src={testimonial.image}
                                                    alt={testimonial.author}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute inset-0 mx-auto w-24 h-24 bg-gradient-to-r from-gitdocs-blue/20 to-gitdocs-purple/20 rounded-full blur-md"></div>
                                        </div>

                                        <blockquote className="max-w-3xl mx-auto">
                                            <p className="text-2xl md:text-3xl font-medium italic text-gray-800 mb-8 leading-relaxed">
                                                "{testimonial.content}"
                                            </p>
                                            <footer className="mt-8">
                                                <div className="font-semibold text-lg text-gray-900">
                                                    {testimonial.author}
                                                </div>
                                            </footer>
                                        </blockquote>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation dots */}
                        <div className="flex justify-center items-center space-x-2 mt-12">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToTestimonial(index)}
                                    className={`transition-all duration-300 rounded-full ${
                                        activeIndex === index
                                            ? "w-8 h-2 bg-gitdocs-blue"
                                            : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                                    }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Custom navigation buttons for larger screens */}
                        <button
                            onClick={() =>
                                goToTestimonial(
                                    (activeIndex - 1 + testimonials.length) %
                                        testimonials.length,
                                )
                            }
                            className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5 text-gitdocs-blue" />
                        </button>

                        <button
                            onClick={() =>
                                goToTestimonial(
                                    (activeIndex + 1) % testimonials.length,
                                )
                            }
                            className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-5 h-5 text-gitdocs-blue" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
