"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { Save, X, Image as ImageIcon, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

type EditorMode = 'visual' | 'code';

export default function NewPost() {
    const router = useRouter();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [editorMode, setEditorMode] = useState<EditorMode>('code');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        summary: '',
        category: '',
        featuredImage: '',
        tags: '',
        status: 'draft',
        isTrending: false,
        seo: {
            metaTitle: '',
            metaDescription: '',
            focusKeyword: ''
        }
    });

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
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (name.startsWith('seo.')) {
            const seoField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                seo: { ...prev.seo, [seoField]: value }
            }));
            return;
        }

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'title' ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') } : {})
        }));
    };

    const handleSubmit = async (statusOverride?: string) => {
        setLoading(true);
        const finalStatus = statusOverride || formData.status;

        const payload = {
            ...formData,
            status: finalStatus,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        };

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.push('/admin/posts');
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to save post');
            }
        } catch (error) {
            console.error('Error saving post:', error);
            alert('An error occurred while saving');
        } finally {
            setLoading(false);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-secondary">Create New Article</h1>
                    <p className="text-muted text-sm mt-1">Draft your next big story. Remember to optimize for SEO.</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link href="/admin/posts" className="p-2.5 sm:p-3 text-muted hover:text-secondary hover:bg-gray-100 rounded-xl transition-all">
                        <X size={20} />
                    </Link>
                    <button
                        onClick={() => handleSubmit('draft')}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-white border border-border text-secondary px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        <span className="hidden sm:inline">Save Draft</span>
                    </button>
                    <button
                        onClick={() => handleSubmit('published')}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                        <span className="hidden sm:inline">Publish</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Article Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter title here..."
                                className="w-full text-2xl font-bold placeholder:text-gray-300 border-none focus:ring-0 p-0"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Summary</label>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleInputChange}
                                rows={2}
                                className="w-full bg-gray-50 border border-border rounded-lg py-3 px-4 text-sm focus:ring-primary focus:border-primary outline-none"
                                placeholder="Short description for the post card..."
                            />
                        </div>

                        <div className="pb-12">
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-bold text-muted uppercase tracking-wider">Body Content</label>
                                <div className="flex bg-gray-100 p-1 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => setEditorMode('visual')}
                                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${editorMode === 'visual' ? 'bg-white text-secondary shadow-sm' : 'text-muted hover:text-secondary'}`}
                                    >
                                        Visual
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditorMode('code')}
                                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${editorMode === 'code' ? 'bg-white text-secondary shadow-sm' : 'text-muted hover:text-secondary'}`}
                                    >
                                        Code
                                    </button>
                                </div>
                            </div>

                            {editorMode === 'visual' ? (
                                <div className="h-[400px]">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={(val) => setFormData(prev => ({ ...prev, content: val }))}
                                        className="h-[350px]"
                                        modules={modules}
                                    />
                                </div>
                            ) : (
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    placeholder="Write your raw HTML or plain text here..."
                                    className="w-full h-[400px] p-6 bg-gray-900 text-gray-100 font-mono text-sm rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none resize-none leading-relaxed shadow-inner"
                                />
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-secondary">SEO Optimization</h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Meta Title</label>
                                <input
                                    type="text"
                                    name="seo.metaTitle"
                                    value={formData.seo.metaTitle}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-50 border border-border rounded-lg py-3 px-4 text-sm focus:ring-primary focus:border-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Meta Description</label>
                                <textarea
                                    name="seo.metaDescription"
                                    value={formData.seo.metaDescription}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full bg-gray-50 border border-border rounded-lg py-3 px-4 text-sm focus:ring-primary focus:border-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Focus Keywords (Comma separated)</label>
                                <input
                                    type="text"
                                    name="seo.focusKeyword"
                                    value={formData.seo.focusKeyword}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-50 border border-border rounded-lg py-3 px-4 text-sm focus:ring-primary focus:border-primary outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-secondary">Post Settings</h3>

                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-50 border border-border rounded-lg py-3 px-4 text-sm font-bold focus:ring-primary focus:border-primary outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <ImageUpload
                            value={formData.featuredImage}
                            onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
                        />

                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Tags (Comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="Add tags..."
                                className="w-full bg-gray-50 border border-border rounded-lg py-3 px-4 text-sm focus:ring-primary focus:border-primary outline-none"
                            />
                        </div>

                        <div className="flex items-center justify-between py-4 border-t border-border">
                            <span className="text-sm font-bold text-secondary">Trending Now</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isTrending"
                                    checked={formData.isTrending}
                                    onChange={handleInputChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
