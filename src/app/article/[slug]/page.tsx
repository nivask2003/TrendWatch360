import Sidebar from "@/components/public/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Clock, Share2, Facebook, Twitter, Link2 } from "lucide-react";
import ShareButtons from "@/components/public/ShareButtons";

async function getPost(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

async function getRecentPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts?limit=5`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);
    const recentPosts = await getRecentPosts();

    if (!post) {
        return (
            <div className="max-w-news py-24 text-center">
                <h1 className="text-4xl font-black text-secondary mb-4">Post Not Found</h1>
                <p className="text-muted mb-8">The article you are looking for does not exist or has been moved.</p>
                <Link href="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="max-w-news py-10">
            <nav className="flex items-center gap-2 text-xs font-bold text-muted mb-6 uppercase tracking-widest">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link href={`/category/${post.category?.slug}`} className="hover:text-primary transition-colors">{post.category?.name || 'Uncategorized'}</Link>
                <span>/</span>
                <span className="text-secondary line-clamp-1">{post.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <article className="lg:col-span-8">
                    <header className="mb-8">
                        <Link href={`/category/${post.category?.slug}`} className="inline-block px-4 py-1 bg-primary text-white text-xs font-bold rounded-full mb-6">
                            {post.category?.name || 'Uncategorized'}
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-secondary leading-tight mb-6 text-wrap break-words">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 py-6 border-y border-border">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-gray-200" />
                                <div>
                                    <p className="text-sm font-bold text-secondary">{post.author || 'Admin'}</p>
                                    <p className="text-[10px] text-muted">Lead Journalist</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-muted">
                                <Clock size={16} />
                                <span className="text-xs font-semibold">{format(new Date(post.createdAt), 'MMMM dd, yyyy')}</span>
                            </div>
                            <ShareButtons title={post.title} />
                        </div>
                    </header>

                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl mb-10 shadow-2xl">
                        <Image
                            src={post.featuredImage || 'https://images.unsplash.com/photo-1504711432869-5d39a130f6c8?auto=format&fit=crop&q=80&w=1200'}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div
                        className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-secondary prose-p:text-gray-700 prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-12 py-8 border-t border-border">
                            {post.tags.map((tag: string) => (
                                <span key={tag} className="px-4 py-1.5 bg-gray-100 text-secondary text-xs font-bold rounded-lg uppercase tracking-wider hover:bg-primary hover:text-white transition-all cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </article>

                <aside className="lg:col-span-4">
                    <Sidebar trendingPosts={recentPosts} />
                </aside>
            </div>
        </div>
    );
}
