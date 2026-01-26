"use client";

import { useState } from 'react';
import { Facebook, Twitter, Link2 } from "lucide-react";

interface ShareButtonsProps {
    title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = (platform: string) => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const text = title;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                break;
        }
    };

    return (
        <div className="flex items-center gap-4 ml-auto">
            <button
                onClick={() => handleShare('facebook')}
                className="p-2 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
                title="Share on Facebook"
            >
                <Facebook size={18} />
            </button>
            <button
                onClick={() => handleShare('twitter')}
                className="p-2 hover:bg-gray-100 rounded-full text-sky-500 transition-colors"
                title="Share on Twitter"
            >
                <Twitter size={18} />
            </button>
            <button
                onClick={() => handleShare('copy')}
                className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${copied ? 'text-green-600' : 'text-secondary'}`}
                title="Copy Link"
            >
                <Link2 size={18} />
            </button>
        </div>
    );
}
