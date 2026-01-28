import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import Category from '@/models/Category';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await dbConnect();
    const baseUrl = 'https://www.nexgenreport.com';

    // Fetch all published posts
    const posts = await Post.find({ status: 'published' }).select('slug updatedAt').lean();
    const postUrls = posts.map((post: any) => ({
        url: `${baseUrl}/article/${post.slug}`,
        lastModified: post.updatedAt || new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // Fetch all categories
    const categories = await Category.find().select('slug').lean();
    const categoryUrls = categories.map((cat: any) => ({
        url: `${baseUrl}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Static pages
    const staticPages = [
        '',
        '/about-us',
        '/contact-us',
        '/privacy-policy',
        '/terms-and-conditions',
        '/disclaimer',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.5,
    }));

    return [...staticPages, ...categoryUrls, ...postUrls];
}
