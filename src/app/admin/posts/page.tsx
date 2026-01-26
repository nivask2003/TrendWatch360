"use client";

import {
    FileText,
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    ExternalLink,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Post {
    _id: string;
    title: string;
    slug: string;
    category: {
        _id: string;
        name: string;
    };
    status: 'draft' | 'published';
    createdAt: string;
    author: string;
    featuredImage?: string;
}

export default function AdminPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts?all=true');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchPosts();
            }
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-secondary">News Posts</h1>
                    <p className="text-muted text-sm mt-1">Manage all your articles, drafts, and scheduled posts.</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                    <Plus size={20} />
                    Add New Post
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-border flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                    <div className="relative flex-grow max-w-none sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary outline-none"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-12 flex flex-col items-center justify-center text-muted">
                            <Loader2 className="animate-spin mb-4" size={32} />
                            <p className="font-bold">Loading posts...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-stone-50 text-muted uppercase text-[10px] font-bold tracking-widest border-b border-border">
                                <tr>
                                    <th className="px-6 py-4">Article Title</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredPosts.map((post) => (
                                    <tr key={post._id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {post.featuredImage ? (
                                                    <img src={post.featuredImage} alt="" className="w-12 h-8 rounded object-cover flex-shrink-0" />
                                                ) : (
                                                    <div className="w-12 h-8 bg-gray-200 rounded flex-shrink-0" />
                                                )}
                                                <p className="text-sm font-bold text-secondary line-clamp-1">{post.title}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-600">
                                                {post.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${post.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-muted font-semibold">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/posts/edit/${post._id}`} className="p-2 text-muted hover:text-primary transition-colors" title="Edit">
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post._id)}
                                                    className="p-2 text-muted hover:text-red-500 transition-colors" title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <Link href={`/news/${post.slug}`} target="_blank" className="p-2 text-muted hover:text-secondary transition-colors" title="View Publicly">
                                                    <ExternalLink size={16} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPosts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted font-bold">
                                            No posts found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
