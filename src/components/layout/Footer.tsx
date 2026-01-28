import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="footer bg-secondary text-white pt-16 pb-8">
            <div className="max-w-news grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <Link href="/" className="text-2xl font-black tracking-tighter text-primary">
                        NEXGEN <span className="text-white tracking-normal">REPORT</span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Your trusted source for the latest news, trending topics, and in-depth analysis across technology, business, and lifestyle.
                    </p>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6">Categories</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link href="/category/technology" className="hover:text-primary transition-colors">Technology</Link></li>
                        <li><Link href="/category/business" className="hover:text-primary transition-colors">Business</Link></li>
                        <li><Link href="/category/lifestyle" className="hover:text-primary transition-colors">Lifestyle</Link></li>
                        <li><Link href="/category/politics" className="hover:text-primary transition-colors">Politics</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6">Legal</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                        <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6">Company</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link href="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/contact-us" className="hover:text-primary transition-colors">Contact Us</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-news border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} NexGen Report. All rights reserved.</p>
                <div className="mt-4 flex justify-center gap-6">
                    <p>AdSense Ready Layout</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
