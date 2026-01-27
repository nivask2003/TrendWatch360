import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with TrendWatch360. Send us your news tips, feedback, or business inquiries.',
    alternates: {
        canonical: 'https://trend-watch360.vercel.app/contact-us',
    },
};

export default function ContactUs() {
    return (
        <div className="max-w-news py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <h1 className="text-5xl font-black text-secondary leading-tight mb-8">
                        Get in touch with <br /><span className="text-primary">TrendWatch360</span>
                    </h1>
                    <p className="text-muted text-lg leading-relaxed mb-12">
                        Have a news tip, correction, or business inquiry? We'd love to hear from you. Fill out the form or reach out via our contact details.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-muted uppercase tracking-widest">Email Us</p>
                                <p className="text-xl font-bold text-secondary">contact@trendwatch360.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-muted uppercase tracking-widest">Call Us</p>
                                <p className="text-xl font-bold text-secondary">+1 (555) 000-0000</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-muted uppercase tracking-widest">Office</p>
                                <p className="text-xl font-bold text-secondary">New York, NY 10001, USA</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-border p-10 rounded-3xl shadow-xl">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">First Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-border rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Last Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-border rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" placeholder="Doe" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Email Address</label>
                            <input type="email" className="w-full bg-gray-50 border border-border rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" placeholder="john@example.com" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Message</label>
                            <textarea rows={5} className="w-full bg-gray-50 border border-border rounded-xl py-4 px-6 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" placeholder="Tell us more about your inquiry..." />
                        </div>

                        <button className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                            <Send size={18} />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
