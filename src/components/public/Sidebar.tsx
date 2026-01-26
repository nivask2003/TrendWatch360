"use client";

import Link from 'next/link';
import NewsCard from './NewsCard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const Sidebar = ({ trendingPosts = [] }: { trendingPosts?: any[] }) => {
    const [query, setQuery] = useState('');
    const [categories, setCategories] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategories(data);
                }
            })
            .catch(err => console.error('Failed to fetch categories:', err));
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
            setQuery('');
        }
    };

    return (
        <aside className="space-y-10">
            {/* Search Sidebar */}
            <div className="bg-gray-50 border border-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">Search News</h3>
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="Search keywords..."
                        className="w-full bg-white border border-border rounded-lg py-3 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary">
                        <Search size={18} />
                    </button>
                </form>
            </div>

            {/* trending Section */}
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    <h3 className="text-xl font-black">TRENDING</h3>
                </div>
                <div className="flex flex-col gap-6">
                    {trendingPosts.length > 0 ? (
                        trendingPosts.slice(0, 5).map((post) => (
                            <NewsCard key={post._id || post.slug} post={post} variant="horizontal" />
                        ))
                    ) : (
                        <p className="text-sm text-muted">No trending news at the moment.</p>
                    )}
                </div>
            </div>

            {/* Ad Placeholder */}
            <div className="bg-gray-100 aspect-square flex items-center justify-center border border-dashed border-gray-300 rounded-lg text-gray-400 text-xs text-center p-4">
                ADVERTISEMENT AREA<br />(Sidebar Ad)
            </div>

            {/* Categories */}
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    <h3 className="text-xl font-black">CATEGORIES</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <Link
                            key={cat._id}
                            href={`/category/${cat.slug}`}
                            className="px-4 py-2 bg-white border border-border rounded-full text-xs font-bold hover:bg-primary hover:text-white hover:border-primary transition-all text-center"
                        >
                            {cat.name}
                        </Link>
                    ))}
                    {categories.length === 0 && <p className="text-sm text-muted">No categories available.</p>}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
