"use client";

import {
    FileText,
    Eye,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    Plus,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [recentPosts, setRecentPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [statsRes, postsRes] = await Promise.all([
                    fetch('/api/admin/stats'),
                    fetch('/api/posts?limit=5')
                ]);

                const statsData = await statsRes.json();
                const postsData = await postsRes.json();

                setStats(statsData);
                setRecentPosts(postsData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const statsCards = [
        { name: 'Total Posts', value: stats?.totalPosts ?? 0, icon: FileText, color: 'bg-blue-500', trend: '+0%' },
        { name: 'Total Views', value: stats?.totalViews ?? '0', icon: Eye, color: 'bg-purple-500', trend: '+0%' },
        { name: 'Categories', value: stats?.totalCategories ?? 0, icon: TrendingUp, color: 'bg-green-500', trend: '0%' },
        { name: 'Drafts', value: stats?.draftPosts ?? 0, icon: MessageSquare, color: 'bg-orange-500', trend: '0%' },
    ];

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-secondary">Dashboard</h1>
                    <p className="text-muted text-sm mt-1">Welcome back, Admin! Here's what's happening today.</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                    <Plus size={20} />
                    Create New Post
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-2xl border border-border shadow-sm group hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg`}>
                                <stat.icon size={20} />
                            </div>
                            <div className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                                <ArrowUpRight size={14} />
                                {stat.trend}
                            </div>
                        </div>
                        <h3 className="text-muted text-xs font-bold uppercase tracking-wider">{stat.name}</h3>
                        <p className="text-3xl font-black text-secondary mt-1 tracking-tight">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Table */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h3 className="font-black text-lg text-secondary">Recent News Posts</h3>
                    <Link href="/admin/posts" className="text-primary text-sm font-bold hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    {recentPosts.length > 0 ? (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-muted uppercase text-[10px] font-bold tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Article</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4 text-center">Views</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border text-sm">
                                {recentPosts.map((post) => (
                                    <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={post.featuredImage || 'https://via.placeholder.com/100x60'}
                                                    className="w-12 h-8 object-cover rounded shadow-sm flex-shrink-0"
                                                    alt="thumb"
                                                />
                                                <p className="font-bold text-secondary line-clamp-1">{post.title}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase tracking-wide">
                                                {post.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-secondary">
                                                {(post.views || 0).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${post.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                                }`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-semibold text-muted">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/posts/edit/${post._id}`}
                                                className="font-bold text-secondary hover:text-primary transition-colors pr-2"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-10 text-center text-muted">
                            <p className="font-bold">No articles found in the database.</p>
                            <Link href="/admin/posts/new" className="text-primary hover:underline text-sm font-bold block mt-2">Start writing your first story!</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
