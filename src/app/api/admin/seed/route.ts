import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Post from '@/models/Post';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await dbConnect();

        // 1. Clear existing data (Optional, handle with care)
        // await Post.deleteMany({});
        // await Category.deleteMany({});

        // 2. Create Admin User if not exists
        const adminExists = await User.findOne({ email: 'admin@nexgenreport.com' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                name: 'Admin User',
                email: 'admin@nexgenreport.com',
                password: hashedPassword,
                role: 'admin'
            });
        }

        // 3. Create Categories
        const categories = [
            { name: 'Technology', slug: 'technology', description: 'Latest in tech and gadgets' },
            { name: 'Business', slug: 'business', description: 'Economy and enterprise news' },
            { name: 'Lifestyle', slug: 'lifestyle', description: 'Travel, food, and culture' },
            { name: 'Politics', slug: 'politics', description: 'Global and domestic affairs' }
        ];

        const savedCategories = await Category.insertMany(categories);

        // 4. Create Demo Posts
        const demoPosts = [
            {
                title: "The Future of AI: How Generative Models are Changing the Creative Landscape",
                slug: "future-of-ai-generative-models",
                summary: "Artificial Intelligence is no longer just a buzzword. From coding to digital art, generative models are reshaping how we create and consume content.",
                content: "<p>Deep dive content about AI...</p>",
                category: savedCategories[0]._id,
                author: "Alex Rivera",
                featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
                status: 'published',
                isTrending: true,
                tags: ['AI', 'Tech']
            },
            {
                title: "Global Markets Brace for Economic Shift as Interest Rates Stabilize",
                slug: "global-markets-economic-shift",
                summary: "Investors are keeping a close eye on central bank decisions as inflation numbers show signs of cooling down across major economies.",
                content: "<p>Economy details...</p>",
                category: savedCategories[1]._id,
                author: "Sarah Chen",
                featuredImage: "https://images.unsplash.com/photo-1611974717482-aa4e3ff708a3",
                status: 'published',
                isTrending: true,
                tags: ['Finance', 'Economy']
            },
            {
                title: "10 Essential Travel Destinations for 2026: Beyond the Tourist Traps",
                slug: "travel-destinations-2026",
                summary: "Discover the hidden gems of the world that offer breathtaking views and authentic cultural experiences without the crowds.",
                content: "<p>Travel guide content...</p>",
                category: savedCategories[2]._id,
                author: "James Wilson",
                featuredImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
                status: 'published',
                isTrending: false,
                tags: ['Travel', 'Global']
            }
        ];

        await Post.insertMany(demoPosts);

        return NextResponse.json({ message: 'Database seeded successfully!' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
