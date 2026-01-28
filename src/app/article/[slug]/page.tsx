import Sidebar from "@/components/public/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Clock, Eye } from "lucide-react";
import ShareButtons from "@/components/public/ShareButtons";
import ViewTracker from "@/components/public/ViewTracker";
import CommentForm from "@/components/public/CommentForm";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import Category from "@/models/Category";

import type { Metadata, ResolvingMetadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostData(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: post.title,
        description: post.summary || post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
        keywords: [post.category?.name, ...(post.tags || []), 'NexGen Report', 'news'],
        openGraph: {
            title: post.title,
            description: post.summary || post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
            url: `https://www.nexgenreport.com/article/${slug}`,
            siteName: 'NexGen Report',
            type: 'article',
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt || post.createdAt,
            authors: [post.author || 'NexGen Report Team'],
            images: [
                {
                    url: post.featuredImage || '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
                ...previousImages,
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.summary || post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
            images: [post.featuredImage || '/og-image.png'],
        },
        alternates: {
            canonical: `https://www.nexgenreport.com/article/${slug}`,
        },
    };
}

async function getPostData(slug: string) {
    await dbConnect();
    try {
        const post = await Post.findOne({ slug, status: 'published' }).populate({ path: 'category', model: Category }).lean();
        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

async function getRecentPostsData() {
    await dbConnect();
    try {
        const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 }).limit(5).lean();
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error("Error fetching recent posts:", error);
        return [];
    }
}

export async function generateStaticParams() {
    await dbConnect();
    try {
        const posts = await Post.find({ status: 'published' }).select('slug').limit(20).lean();
        return posts.map((post: any) => ({
            slug: post.slug,
        }));
    } catch (error) {
        return [];
    }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch data in parallel for better performance
    const [post, recentPosts] = await Promise.all([
        getPostData(slug),
        getRecentPostsData()
    ]);

    if (!post) {
        return (
            <div className="max-w-news py-24 text-center">
                <h1 className="text-4xl font-black text-secondary mb-4">Post Not Found</h1>
                <p className="text-muted mb-8">The article you are looking for does not exist or has been moved.</p>
                <Link href="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl">Back to Home</Link>
            </div>
        );
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": post.title,
        "image": [post.featuredImage || 'https://images.unsplash.com/photo-1504711432869-5d39a130f6c8?auto=format&fit=crop&q=80&w=1200'],
        "datePublished": post.createdAt,
        "dateModified": post.updatedAt || post.createdAt,
        "author": [{
            "@type": "Person",
            "name": post.author || "Admin",
            "url": "https://www.nexgenreport.com"
        }]
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.nexgenreport.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": post.category?.name || "News",
                "item": `https://www.nexgenreport.com/category/${post.category?.slug}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://www.nexgenreport.com/article/${post.slug}`
            }
        ]
    };

    return (
        <div className="max-w-news py-6 md:py-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <ViewTracker slug={post.slug} />
            {/* Breadcrumbs - Hidden on very small screens for better space */}
            <nav className="hidden sm:flex items-center gap-2 text-[10px] md:text-xs font-bold text-muted mb-6 uppercase tracking-widest border-b border-border/50 pb-4">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link href={`/category/${post.category?.slug}`} className="hover:text-primary transition-colors">{post.category?.name || 'Uncategorized'}</Link>
                <span>/</span>
                <span className="text-secondary line-clamp-1">{post.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <article className="lg:col-span-8">
                    <header className="mb-8">
                        <Link href={`/category/${post.category?.slug}`} className="inline-block px-4 py-1.5 bg-primary text-white text-[10px] font-black rounded-full mb-6 uppercase tracking-wider">
                            {post.category?.name || 'Uncategorized'}
                        </Link>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-secondary leading-[1.15] mb-6 text-wrap break-words tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 py-6 border-y border-border">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 border border-border flex items-center justify-center text-secondary font-black text-xs">
                                    {post.author ? post.author[0] : 'T'}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-secondary">{post.author || 'NexGen Report'}</p>
                                    <p className="text-[10px] text-muted font-bold uppercase tracking-tighter">Lead Journalist</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 sm:ml-auto">
                                <div className="flex items-center gap-2 text-muted">
                                    <Clock size={16} />
                                    <span className="text-xs font-bold tracking-tight">{format(new Date(post.createdAt), 'MMM dd, yyyy')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted">
                                    <Eye size={16} />
                                    <span className="text-xs font-bold tracking-tight">{post.views || 0} views</span>
                                </div>
                                <ShareButtons title={post.title} />
                            </div>
                        </div>
                    </header>

                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl md:rounded-3xl mb-10 shadow-xl md:shadow-2xl ring-1 ring-border/50">
                        <Image
                            src={post.featuredImage || 'https://images.unsplash.com/photo-1504711432869-5d39a130f6c8?auto=format&fit=crop&q=80&w=1200'}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div
                        className="prose prose-base sm:prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-12 py-8 border-t border-border">
                            {post.tags.map((tag: string) => (
                                <span key={tag} className="px-3 md:px-4 py-1.5 bg-gray-100 text-secondary text-[10px] md:text-xs font-black rounded-lg uppercase tracking-widest hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <CommentForm postTitle={post.title} postSlug={post.slug} />
                </article>

                <aside className="lg:col-span-4 mt-8 lg:mt-0">
                    <Sidebar trendingPosts={recentPosts} />
                </aside>
            </div>
        </div>
    );
}
