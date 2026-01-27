"use client";

import { Star, TrendingUp, GripVertical, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdminTrending() {
    const [trendingPosts, setTrendingPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTrending() {
            try {
                const res = await fetch('/api/posts?trending=true&all=true');
                const data = await res.json();
                setTrendingPosts(data);
            } catch (error) {
                console.error("Failed to fetch trending posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTrending();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-black text-secondary">Trending Content</h1>
                <p className="text-muted text-sm mt-1">These articles are currently marked as Trending and appear in the sidebar.</p>
            </div>

            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border bg-stone-50">
                    <h2 className="text-sm font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                        <Star className="text-yellow-500 fill-yellow-500" size={16} />
                        Top Trending Articles
                    </h2>
                </div>

                <div className="divide-y divide-border">
                    {trendingPosts.length > 0 ? trendingPosts.map((post, idx) => (
                        <div key={post._id} className="p-6 flex items-center gap-6 hover:bg-gray-50 transition-colors group">
                            <div className="text-muted cursor-grab active:cursor-grabbing">
                                <GripVertical size={20} />
                            </div>
                            <div className="text-2xl font-black text-gray-200 w-8">{idx + 1}</div>
                            <div className="w-20 h-14 relative bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                {post.featuredImage && (
                                    <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
                                )}
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-sm font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1">{post.title}</h3>
                                <div className="flex items-center gap-4 mt-1 text-[10px] font-bold uppercase tracking-wider">
                                    <span className="flex items-center gap-1 text-muted">
                                        <TrendingUp size={12} />
                                        {(post.views || 0).toLocaleString()} Views
                                    </span>
                                    <span className="text-primary">
                                        {post.category?.name || 'Uncategorized'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="p-10 text-center text-muted">
                            No trending posts found. Mark some posts as trending in the posts editor.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

