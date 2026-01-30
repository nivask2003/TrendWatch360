"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface Category {
    _id: string;
    name: string;
    slug: string;
}

const Footer = () => {
    const [categories, setCategories] = useState<Category[]>([]);

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


    return (
        <footer className="relative bg-[#0a0a0a] text-white pt-20 pb-10 overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-news relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="text-3xl font-black tracking-tighter text-primary inline-block">
                            NEXGEN <span className="text-white tracking-normal">REPORT</span>
                        </Link>
                        <p className="text-gray-400 text-base leading-relaxed max-w-sm">
                            Your premier destination for high-impact journalism, breaking technology news, and insightful analysis of the modern world.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, href: "#", color: "hover:text-blue-500" },
                                { Icon: Twitter, href: "#", color: "hover:text-sky-400" },
                                { Icon: Instagram, href: "#", color: "hover:text-pink-500" },
                                { Icon: Youtube, href: "#", color: "hover:text-red-600" }
                            ].map((social, idx) => (
                                <Link
                                    key={idx}
                                    href={social.href}
                                    className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-white/10 ${social.color}`}
                                >
                                    <social.Icon size={18} />
                                </Link>
                            ))}
                        </div>

                        <div className="pt-4 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                                <Mail size={16} className="text-primary" />
                                <span>nexgenreport26@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                                <Phone size={16} className="text-primary" />
                                <span>+91 9244544591</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                                <MapPin size={16} className="text-primary" />
                                <span>India</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold mb-8 relative inline-block text-white">
                            Categories
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full" />
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {categories.length > 0 ? categories.slice(0, 5).map(cat => (
                                <li key={cat._id}>
                                    <Link href={`/category/${cat.slug}`} className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                                        {cat.name}
                                    </Link>
                                </li>
                            )) : (
                                <>
                                    <li><Link href="/category/technology" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Technology</Link></li>
                                    <li><Link href="/category/business" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Business</Link></li>
                                    <li><Link href="/category/lifestyle" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Lifestyle</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Legal & Info */}
                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold mb-8 relative inline-block text-white">
                            Company
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full" />
                        </h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/about-us" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Our Story</Link></li>
                            <li><Link href="/contact-us" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Contact Us</Link></li>
                            <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Privacy Policy</Link></li>
                            <li><Link href="/terms-and-conditions" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-4">
                        <div className="p-8 rounded-[2rem] bg-secondary border border-white/10 relative overflow-hidden group shadow-2xl">
                            {/* Decorative Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                        <Mail size={20} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white">Newsletter</h4>
                                </div>

                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    Get the most important stories of the day delivered straight to your inbox.
                                </p>

                                <form className="space-y-3">
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                                        />
                                    </div>
                                    <button className="w-full bg-primary hover:bg-red-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98] uppercase tracking-wider text-xs">
                                        Subscribe Now
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-500 font-medium">
                        &copy; {new Date().getFullYear()} <span className="text-gray-300">NexGen Report</span>. Premium Digital News Experience.
                    </p>

                    <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Live Updates
                        </span>
                        <span>v2.1.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
