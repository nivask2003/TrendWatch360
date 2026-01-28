"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // For now, allow access with dummy check or just redirect
        // Real implementation would call /api/auth/login
        if (email === 'admin@nexgenreport.com' && password === 'admin123') {
            router.push('/admin');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-3xl border border-border shadow-xl w-full max-w-md">
                <div className="text-center mb-10">
                    <Link href="/" className="text-3xl font-black tracking-tighter text-primary inline-block mb-4">
                        NEXGEN <span className="text-secondary tracking-normal">REPORT</span>
                    </Link>
                    <h1 className="text-xl font-bold text-secondary">Admin Dashboard Access</h1>
                    <p className="text-muted text-sm mt-2">Please enter your credentials to manage the news portal.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-xl border border-red-100">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full bg-gray-50 border border-border rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-gray-50 border border-border rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-secondary text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-xs font-bold text-primary hover:underline">Back to Public Site</Link>
                </div>
            </div>
        </div>
    );
}
