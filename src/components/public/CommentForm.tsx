"use client";

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface CommentFormProps {
    postTitle: string;
    postSlug: string;
}

export default function CommentForm({ postTitle, postSlug }: CommentFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/article/${postSlug}` : '';

            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    postTitle,
                    postUrl: currentUrl
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit comment');
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000); // Reset after 5 seconds
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="bg-stone-50 border border-border rounded-2xl p-6 md:p-8 mt-12 mb-8">
            <h3 className="text-2xl font-black text-secondary mb-2">Leave a Comment</h3>
            <p className="text-muted text-sm mb-6">
                Your email address will not be published. Required fields are marked *
                <br />
                Comments are sent directly to the author.
            </p>

            {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center text-green-800 animate-in fade-in zoom-in duration-300">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-600" />
                    <h4 className="font-bold text-lg mb-1">Thank you!</h4>
                    <p>Your comment has been sent to the author successfully.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-secondary">
                                Name <span className="text-primary">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-secondary"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-secondary">
                                Email <span className="text-primary">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-secondary"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-secondary">
                            Message <span className="text-primary">*</span>
                        </label>
                        <textarea
                            id="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-secondary resize-none"
                            placeholder="Write your thoughts here..."
                        />
                    </div>

                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                            <AlertCircle size={16} />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-secondary/10"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send size={18} />
                                Post Comment
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
