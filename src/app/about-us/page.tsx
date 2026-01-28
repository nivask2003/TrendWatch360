import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn more about NexGen Report, our mission, and our commitment to high-quality journalism.',
    alternates: {
        canonical: 'https://www.nexgenreport.com/about-us',
    },
};

export default function AboutUs() {
    return (
        <div className="max-w-4xl mx-auto py-20 px-4">
            <h1 className="text-5xl font-black mb-8 text-secondary text-center">About NexGen Report</h1>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                    Welcome to <strong>NexGen Report</strong>, your premier destination for high-quality journalism, trending stories, and in-depth analysis. We are committed to delivering accurate, timely, and engaging news content that matters to you.
                </p>

                <h2>Our Mission</h2>
                <p>
                    At NexGen Report, our mission is to empower our readers with knowledge. In a world of information overload, we strive to cut through the noise and provide clear, concise, and reliable news across various sectors including technology, business, politics, and lifestyle.
                </p>

                <h2>What We Cover</h2>
                <ul>
                    <li><strong>Technology:</strong> Stay ahead of the curve with the latest in AI, hardware, and digital trends.</li>
                    <li><strong>Business:</strong> Insights into global markets, startups, and economic shifts.</li>
                    <li><strong>Lifestyle:</strong> Tips on travel, health, and modern living for a better quality of life.</li>
                    <li><strong>National & World:</strong> Crucial updates on politics and global affairs.</li>
                </ul>

                <div className="bg-gray-50 p-8 rounded-3xl border border-border mt-12">
                    <h3 className="text-2xl font-black text-secondary mb-4">Integrity & Accuracy</h3>
                    <p>
                        We believe in the power of truth. Our team of writers and editors follows strict editorial guidelines to ensure every article is fact-checked and verified before it reaches your screen.
                    </p>
                </div>
            </div>
        </div>
    );
}
