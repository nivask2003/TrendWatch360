import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms and Conditions',
    description: 'Terms and Conditions for using TrendWatch360 services.',
    alternates: {
        canonical: 'https://trend-watch360.vercel.app/terms-and-conditions',
    },
};

export default function TermsAndConditions() {
    return (
        <div className="max-w-4xl mx-auto py-20 px-4 prose prose-slate">
            <h1 className="text-4xl font-black mb-8">Terms and Conditions</h1>
            <p>Last updated: January 26, 2026</p>

            <h2>1. Introduction</h2>
            <p>Welcome to TrendWatch360. These Terms and Conditions outline the rules and regulations for the use of our website.</p>

            <h2>2. Intellectual Property Rights</h2>
            <p>Unless otherwise stated, TrendWatch360 and/or its licensors own the intellectual property rights for all material on TrendWatch360. All intellectual property rights are reserved.</p>

            <h2>3. User Content</h2>
            <p>In these Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant TrendWatch360 a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>

            <h2>4. Governing Law</h2>
            <p>These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which TrendWatch360 operates, and you submit to the non-exclusive jurisdiction of the state and federal courts for the resolution of any disputes.</p>
        </div>
    );
}
