import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer',
    description: 'Disclaimer for TrendWatch360 content and services.',
    alternates: {
        canonical: 'https://trend-watch360.vercel.app/disclaimer',
    },
};

export default function Disclaimer() {
    return (
        <div className="max-w-4xl mx-auto py-20 px-4 prose prose-slate">
            <h1 className="text-4xl font-black mb-8">Disclaimer</h1>
            <p>Last updated: January 26, 2026</p>
            <p>The information provided by TrendWatch360 ("we," "us," or "our") on trendwatch360.com (the "Site") is for general informational purposes only.</p>

            <h2>No Warranties</h2>
            <p>All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>

            <h2>External Links</h2>
            <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising.</p>

            <h2>Professional Disclaimer</h2>
            <p>The Site cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.</p>

            <h2>Advertisement Disclaimer</h2>
            <p>This site contains advertisements and links to third party websites. We do not endorse the products or services advertised on these sites.</p>
        </div>
    );
}
