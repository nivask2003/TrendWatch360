import NewsCard from "@/components/public/NewsCard";
import Sidebar from "@/components/public/Sidebar";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import Post from "@/models/Post";

async function getCategoryData(slug: string) {
    await dbConnect();
    try {
        const category = await Category.findOne({ slug }).lean();
        return JSON.parse(JSON.stringify(category));
    } catch (error) {
        console.error("Error fetching category:", error);
        return null;
    }
}

async function getPostsByCategoryData(categoryId: string) {
    await dbConnect();
    try {
        const posts = await Post.find({ category: categoryId, status: 'published' })
            .populate({ path: 'category', model: Category })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error("Error fetching category posts:", error);
        return [];
    }
}

async function getRecentPostsData() {
    await dbConnect();
    try {
        const posts = await Post.find({ status: 'published' })
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error("Error fetching recent posts:", error);
        return [];
    }
}

import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryData(slug);

    if (!category) {
        return {
            title: 'Category Not Found',
        };
    }

    const title = `${category.name} News & Updates`;
    const description = category.description || `Read the latest articles and stories about ${category.name} on NexGen Report.`;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: `https://nex-gen-report.vercel.app/category/${slug}`,
            siteName: 'NexGen Report',
            type: 'website',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: category.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
        },
        alternates: {
            canonical: `https://nex-gen-report.vercel.app/category/${slug}`,
        },
    };
}

export async function generateStaticParams() {
    await dbConnect();
    try {
        const categories = await Category.find().select('slug').lean();
        return categories.map((cat: any) => ({
            slug: cat.slug,
        }));
    } catch (error) {
        return [];
    }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await getCategoryData(slug);

    if (!category) {
        return (
            <div className="max-w-news py-24 text-center">
                <h1 className="text-4xl font-black text-secondary mb-4">Category Not Found</h1>
                <p className="text-muted mb-8">The category you are looking for does not exist or has been removed.</p>
                <Link href="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl">Back to Home</Link>
            </div>
        );
    }

    const [posts, recentPosts] = await Promise.all([
        getPostsByCategoryData(category._id),
        getRecentPostsData()
    ]);

    return (
        <div className="max-w-news py-6 md:py-10">
            <div className="mb-8 md:mb-12">
                <div className="flex items-center gap-3 md:gap-4 mb-4">
                    <div className="w-2 md:w-3 h-8 md:h-12 bg-primary rounded-full" />
                    <h1 className="text-3xl md:text-5xl font-black uppercase text-secondary tracking-tight">{category.name}</h1>
                </div>
                <p className="text-muted text-base md:text-lg max-w-3xl">{category.description || `Exploring the latest updates and insights in ${category.name}.`}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {posts.length > 0 ? posts.map((post: any) => (
                            <NewsCard key={post._id} post={post} />
                        )) : (
                            <div className="col-span-1 md:col-span-2 py-16 text-center text-muted font-bold bg-gray-50 rounded-2xl border border-dashed border-border px-6">
                                <p className="text-lg">No articles found in this category yet.</p>
                                <Link href="/" className="text-primary hover:underline mt-4 inline-block">Back to homepage</Link>
                            </div>
                        )}
                    </div>
                </div>

                <aside className="lg:col-span-4 mt-8 lg:mt-0">
                    <Sidebar trendingPosts={recentPosts} />
                </aside>
            </div>
        </div>
    );
}
