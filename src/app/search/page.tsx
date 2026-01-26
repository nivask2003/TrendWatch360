"use client";

import { useSearchParams } from 'next/navigation';
import NewsCard from "@/components/public/NewsCard";
import Sidebar from "@/components/public/Sidebar";
import { Suspense, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [recentPosts, setRecentPosts] = useState<any[]>([]);

    useEffect(() => {
        if (query) {
            fetchPosts();
        }
        fetchRecent();
    }, [query]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/posts?q=${encodeURIComponent(query)}&limit=20`);
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecent = async () => {
        try {
            const res = await fetch('/api/posts?limit=5');
            const data = await res.json();
            setRecentPosts(data);
        } catch (error) {
            console.error('Failed to fetch recent posts:', error);
        }
    };

    return (
        <div className="max-w-news py-10">
            <div className="mb-12">
                <h1 className="text-3xl font-black text-secondary mb-2">Search Results</h1>
                <p className="text-muted">
                    {query ? (
                        <>Showing results for: <span className="font-bold text-primary">"{query}"</span></>
                    ) : (
                        "Browse our latest news articles."
                    )}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                    {loading ? (
                        <div className="p-20 flex flex-col items-center justify-center text-muted">
                            <Loader2 className="animate-spin mb-4" size={40} />
                            <p className="font-bold">Searching articles...</p>
                        </div>
                    ) : query ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {posts.length > 0 ? posts.map((post) => (
                                <NewsCard key={post._id} post={post} />
                            )) : (
                                <div className="col-span-2 bg-gray-50 border border-border p-12 rounded-3xl text-center">
                                    <p className="text-muted font-bold">No articles found matching "{query}".</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-gray-50 border border-border p-12 rounded-3xl text-center">
                            <p className="text-muted font-bold">Please enter a search query.</p>
                        </div>
                    )}
                </div>

                <aside className="lg:col-span-4">
                    <Sidebar trendingPosts={recentPosts} />
                </aside>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="max-w-news py-20 text-center font-bold">Loading results...</div>}>
            <SearchContent />
        </Suspense>
    );
}
