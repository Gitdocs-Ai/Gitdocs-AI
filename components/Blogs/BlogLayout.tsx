import React from "react";
import Link from "next/link";
import Navbar from "../LandingPage/Navbar";
import Footer from "../LandingPage/Footer";
import { blogPosts } from "@/data/BlogData";
import Image from "next/image";

interface BlogLayoutProps {
    children: React.ReactNode;
    post: BlogPost;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
    slug: string;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children, post }) => {
    // Find related posts (excluding the current one)
    const relatedPosts = blogPosts
        .filter((p: BlogPost) => p.id !== post.id)
        .filter(
            (p: BlogPost) =>
                p.category === post.category || Math.random() > 0.5,
        )
        .slice(0, 2);

    return (
        <>
            <Navbar />

            <div className="bg-[#F1F0FB] pt-24 pb-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <Link
                                href="/blog"
                                className="text-gitdocs-blue hover:underline inline-flex items-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Back to Blog
                            </Link>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            {post.title}
                        </h1>

                        <div className="flex items-center mb-8">
                            <div className="flex-1">
                                <div className="text-sm text-gray-500 flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <span>{post.date}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span>{post.readTime}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-gitdocs-purple">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-gitdocs-blue"
                                >
                                    <span className="sr-only">
                                        Share on Twitter
                                    </span>
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-gitdocs-blue"
                                >
                                    <span className="sr-only">
                                        Share on LinkedIn
                                    </span>
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                            <Image
                                width={500}
                                height={500}
                                src={post.image}
                                alt={post.title}
                                className="w-full h-[300px] md:h-[400px] object-cover"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-2/3">
                                <article className="prose prose-lg max-w-none">
                                    {children}
                                </article>

                                <div className="mt-12 pt-6 border-t border-gray-100">
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                By {post.author}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Founder of GitDocs AI
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-1/3">
                                <div className="sticky top-20">
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Related Articles
                                        </h3>
                                        <div className="space-y-4">
                                            {relatedPosts.map(
                                                (relatedPost: BlogPost) => (
                                                    <Link
                                                        key={relatedPost.id}
                                                        href={`/blog/${relatedPost.slug}`}
                                                        className="block group"
                                                    >
                                                        <div className="flex gap-3">
                                                            <div className="w-20 h-16 rounded-md overflow-hidden flex-shrink-0">
                                                                <Image
                                                                    width={500}
                                                                    height={500}
                                                                    src={
                                                                        relatedPost.image
                                                                    }
                                                                    alt={
                                                                        relatedPost.title
                                                                    }
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-medium group-hover:text-gitdocs-blue transition-colors">
                                                                    {
                                                                        relatedPost.title
                                                                    }
                                                                </h4>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {
                                                                        relatedPost.readTime
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Subscribe to our newsletter
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Get the latest articles and
                                            resources delivered straight to your
                                            inbox.
                                        </p>
                                        <div>
                                            <input
                                                type="email"
                                                placeholder="Your email address"
                                                className="w-full px-4 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-gitdocs-blue/50 focus:border-gitdocs-blue/50"
                                            />
                                            <button className="w-full bg-gitdocs-blue text-white rounded-md px-4 py-2 font-medium hover:bg-gitdocs-blue/90 transition-colors">
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default BlogLayout;
