import BlogPost1 from "@/blogs/BlogPost1";
import BlogPost2 from "@/blogs/BlogPost2";
import { blogPosts } from "@/data/BlogData";
import NotFound from "@/app/not-found";

const blogComponents = {
    BlogPost1,
    BlogPost2,
};

// Verify if the blog post exists
const verifyBlogPost = (slug: string) => {
    const post = blogPosts.find((post) => post.slug === slug);
    return post || null;
};

// Generate metadata for the page
export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params; // Await params here

    const post = verifyBlogPost(slug);

    if (!post) {
        return {
            title: "Not Found | GitDocs AI",
            description: "Page not found",
        };
    }

    return {
        title: `${post.title} | GitDocs AI`,
        description: post.excerpt,
    };
};

// Main component for the page
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params; // Await params here

    const post = verifyBlogPost(slug);

    if (!post) {
        return <NotFound />;
    }

    // Get the component to render based on the post ID
    const ComponentToRender =
        blogComponents[`BlogPost${post.id}` as keyof typeof blogComponents];

    if (!ComponentToRender) {
        return <NotFound />;
    }

    return <ComponentToRender />;
};

export default Page;
