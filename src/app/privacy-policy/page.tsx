import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for NexGen Report. Learn how we collect, use, and protect your information.',
    alternates: {
        canonical: 'https://www.nexgenreport.com/privacy-policy',
    },
};

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto py-20 px-4 prose prose-slate">
            <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
            <p>Last updated: January 26, 2026</p>
            <p>At NexGen Report, accessible from nexgenreport.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by NexGen Report and how we use it.</p>

            <h2>Log Files</h2>
            <p>NexGen Report follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics.</p>

            <h2>Google DoubleClick DART Cookie</h2>
            <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.</p>

            <h2>Advertising Partners Privacy Policies</h2>
            <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on NexGen Report.</p>

            <h2>Consent</h2>
            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
        </div>
    );
}
