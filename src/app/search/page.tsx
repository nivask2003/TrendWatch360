import { Suspense } from 'react';
import SearchContent from './SearchContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Search Results',
    description: 'Search for the latest news, articles, and trending stories on NexGen Report.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="max-w-news py-20 text-center font-bold">Loading results...</div>}>
            <SearchContent />
        </Suspense>
    );
}
