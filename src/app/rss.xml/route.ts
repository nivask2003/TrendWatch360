
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    const baseUrl = 'https://www.nexgenreport.com';

    // Fetch latest 20 posts
    const posts = await Post.find({ status: 'published' })
        .sort({ createdAt: -1 })
        .limit(20)
        .populate('category')
        .lean();

    const rssItems = posts.map((post: any) => `
        <item>
            <title><![CDATA[${post.title}]]></title>
            <link>${baseUrl}/article/${post.slug}</link>
            <guid isPermaLink="true">${baseUrl}/article/${post.slug}</guid>
            <description><![CDATA[${post.summary || post.content.substring(0, 160)}]]></description>
            <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
            <category>${post.category?.name || 'News'}</category>
            <author>contact@nexgenreport.com (${post.author || 'NexGen Report'})</author>
        </item>
    `).join('');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>NexGen Report</title>
            <link>${baseUrl}</link>
            <description>Stay updated with the latest news on technology, business, lifestyle, and more.</description>
            <language>en-us</language>
            <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
            <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
            <copyright>Copyright ${new Date().getFullYear()} NexGen Report</copyright>
            ${rssItems}
        </channel>
    </rss>`;

    return new NextResponse(rssFeed, {
        headers: {
            'Content-Type': 'text/xml',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
    });
}
