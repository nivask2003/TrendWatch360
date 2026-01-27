"use client";

import { useEffect } from "react";

interface ViewTrackerProps {
    slug: string;
}

export default function ViewTracker({ slug }: ViewTrackerProps) {
    useEffect(() => {
        const incrementView = async () => {
            try {
                // Use a small delay or check if it's already counted in this session
                // to avoid double counting if needed, but for now simple is fine.
                const viewedPosts = JSON.parse(sessionStorage.getItem('viewed_posts') || '[]');

                if (!viewedPosts.includes(slug)) {
                    await fetch(`/api/posts/view/${slug}`, {
                        method: 'POST',
                    });
                    viewedPosts.push(slug);
                    sessionStorage.setItem('viewed_posts', JSON.stringify(viewedPosts));
                }
            } catch (error) {
                console.error("Failed to track view:", error);
            }
        };

        incrementView();
    }, [slug]);

    return null; // This component doesn't render anything
}
