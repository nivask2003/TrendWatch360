"use client";

import {
    Plus,
    Search,
    Layers,
    Edit2,
    Trash2,
    Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    posts?: number;
}

export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: ''
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Auto-generate slug from name if editing the name field
            ...(name === 'name' && !editingId ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') } : {})
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const url = editingId ? `/api/categories/${editingId}` : '/api/categories';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setFormData({ name: '', slug: '', description: '' });
                setEditingId(null);
                fetchCategories();
            }
        } catch (error) {
            console.error('Failed to save category:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingId(category._id);
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchCategories();
            }
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-secondary">Categories</h1>
                    <p className="text-muted text-sm mt-1">Organize your news articles into relevant categories.</p>
                </div>
                {!editingId && (
                    <button
                        onClick={() => document.getElementById('name-input')?.focus()}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                        <Plus size={20} />
                        Add Category
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Category List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-border">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-50 border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary outline-none"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="p-12 flex flex-col items-center justify-center text-muted">
                                    <Loader2 className="animate-spin mb-4" size={32} />
                                    <p className="font-bold">Loading categories...</p>
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="bg-stone-50 text-muted uppercase text-[10px] font-bold tracking-widest border-b border-border">
                                        <tr>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Slug</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {filteredCategories.map((cat) => (
                                            <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3 text-sm font-bold text-secondary">
                                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                                            <Layers size={16} />
                                                        </div>
                                                        {cat.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-muted font-medium">/{cat.slug}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2 text-muted">
                                                        <button
                                                            onClick={() => handleEdit(cat)}
                                                            className="p-2 hover:text-primary transition-colors"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(cat._id)}
                                                            className="p-2 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredCategories.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="px-6 py-12 text-center text-muted font-bold">
                                                    No categories found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Add/Edit Form */}
                <div className="bg-white p-8 rounded-2xl border border-border shadow-sm h-fit space-y-6">
                    <h3 className="text-xl font-black text-secondary">
                        {editingId ? 'Edit Category' : 'Quick Add'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Category Name</label>
                            <input
                                id="name-input"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-50 border border-border rounded-xl py-3 px-4 text-sm focus:ring-primary focus:border-primary outline-none"
                                placeholder="e.g. Entertainment"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Slug (Internal)</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-50 border border-border rounded-xl py-3 px-4 text-sm focus:ring-primary focus:border-primary outline-none"
                                placeholder="e.g. entertainment"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Description (Optional)</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full bg-gray-50 border border-border rounded-xl py-3 px-4 text-sm focus:ring-primary focus:border-primary outline-none"
                                placeholder="What is this category about?"
                            />
                        </div>
                        <div className="flex gap-3">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setFormData({ name: '', slug: '', description: '' });
                                    }}
                                    className="flex-1 bg-gray-100 text-secondary py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-[2] bg-secondary text-white py-3 rounded-xl font-bold hover:bg-black transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {submitting && <Loader2 className="animate-spin" size={16} />}
                                {editingId ? 'Update Category' : 'Save Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
