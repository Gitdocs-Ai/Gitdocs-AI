import React from "react";
import Link from "next/link";
import Image from "next/image";

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

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <Link href={`/blog/${post.slug}`} className="group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative h-52 overflow-hidden">
                    <Image
                        width={500}
                        height={500}
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gitdocs-purple">
                        {post.category}
                    </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-gitdocs-blue transition-colors duration-300">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 flex-grow">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center text-sm pt-4 border-t border-gray-100">
                        <span className="font-medium text-gray-900">
                            By {post.author}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
