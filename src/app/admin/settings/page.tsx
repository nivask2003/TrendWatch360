"use client";

import { Save, Settings, Globe, Shield, Bell, User } from 'lucide-react';

export default function AdminSettings() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-black text-secondary">General Settings</h1>
                <p className="text-muted text-sm mt-1">Configure your branding, SEO, and global site preferences.</p>
            </div>

            <div className="space-y-6">
                {/* Branding Section */}
                <section className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <Globe size={20} />
                        </div>
                        <h2 className="text-xl font-black text-secondary">Branding & SEO</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Site Name</label>
                            <input type="text" className="w-full bg-gray-50 border border-border rounded-xl py-3 px-4 text-sm font-bold" defaultValue="NexGen Report" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Primary Color</label>
                            <div className="flex gap-3">
                                <input type="text" className="flex-grow bg-gray-50 border border-border rounded-xl py-3 px-4 text-sm font-mono" defaultValue="#ef4444" />
                                <div className="w-11 h-11 rounded-xl bg-primary border-4 border-white shadow-sm" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Global Meta Description</label>
                            <textarea rows={3} className="w-full bg-gray-50 border border-border rounded-xl py-3 px-4 text-sm" defaultValue="Stay updated with the latest news on technology, business, lifestyle, and more at NexGen Report." />
                        </div>
                    </div>
                </section>

                {/* AdSense Configuration */}
                <section className="bg-white p-8 rounded-2xl border border-border shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
                            <Shield size={20} />
                        </div>
                        <h2 className="text-xl font-black text-secondary">Google AdSense</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Client ID (AdSense)</label>
                            <input type="text" className="w-full bg-gray-50 border border-border rounded-xl py-3 px-4 text-sm font-mono" placeholder="ca-pub-xxxxxxxxxxxxxxxx" />
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-sm font-bold text-secondary">Enable Auto Ads</p>
                                <p className="text-xs text-muted">Let Google automatically place ads on your site.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all active:scale-95">
                        <Save size={20} />
                        Save All Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
