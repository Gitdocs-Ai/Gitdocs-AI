"use client";

import React, { useState } from "react";
import PageHeader from "@/components/LandingPage/PageHeader";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import BlogCard from "@/components/Blogs/BlogCard";
import { blogPosts } from "@/data/BlogData";

const categories = ["All", "AI & Documentation", "Development", "Productivity"];

const BlogIndex = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredPosts =
        selectedCategory === "All"
            ? blogPosts
            : blogPosts.filter((post) => post.category === selectedCategory);

    return (
        <>
            <Navbar />
            <PageHeader
                title="Blog"
                subtitle="Insights, guides, and news about documentation, development, and AI"
            />

            <div className="container mx-auto px-4 py-16">
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === category
                                        ? "bg-gitdocs-blue text-white shadow-md"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-medium text-gray-600">
                            No posts found in this category
                        </h3>
                        <p className="mt-2 text-gray-500">
                            Try selecting a different category or check back
                            later.
                        </p>
                    </div>
                )}

                <div className="mt-16 text-center">
                    <div className="inline-block bg-gray-100 px-6 w-1/2 py-8 rounded-3xl">
                        <p className="text-gray-600">
                            Subscribe to our newsletter to get the latest
                            articles
                        </p>
                        <div className="mt-4 flex mx-auto max-w-[60%]">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gitdocs-blue/50 focus:border-gitdocs-blue/50 w-full"
                            />
                            <button className="bg-gitdocs-blue text-white rounded-r-full px-6 py-2 font-medium hover:bg-gitdocs-blue/90 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default BlogIndex;
