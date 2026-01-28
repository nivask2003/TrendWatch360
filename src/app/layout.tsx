import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "NexGen Report - Latest Trending News & Updates",
    template: "%s | NexGen Report"
  },
  description: "Stay updated with the latest news on technology, business, lifestyle, and more at NexGen Report. Fast, reliable, and professional news reporting.",
  keywords: ["news", "latest news", "trending topics", "technology", "business", "NexGen Report", "world news", "lifestyle news"],
  authors: [{ name: "NexGen Report Team" }],
  creator: "NexGen Report",
  publisher: "NexGen Report",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nex-gen-report.vercel.app"),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': 'https://nex-gen-report.vercel.app/rss.xml',
    },
  },
  openGraph: {
    title: "NexGen Report - Latest Trending News & Updates",
    description: "Stay updated with the latest news on technology, business, lifestyle, and more at NexGen Report.",
    url: 'https://nex-gen-report.vercel.app',
    siteName: 'NexGen Report',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NexGen Report News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "NexGen Report - Latest Trending News & Updates",
    description: "Stay updated with the latest news on technology, business, lifestyle, and more at NexGen Report.",
    creator: '@nexgenreport',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "google-adsense-account": "ca-pub-6285124566181151",
    "google-site-verification": "K9bI53gF-qdCXG3q9akYElVdWPfFwR-qThr1y98ndQU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NexGen Report",
    "url": "https://nex-gen-report.vercel.app",
    "logo": "https://nex-gen-report.vercel.app/og-image.png",
    "sameAs": [
      "https://twitter.com/nexgenreport",
      "https://facebook.com/nexgenreport"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NexGen Report",
    "url": "https://nex-gen-report.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nex-gen-report.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6285124566181151"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
