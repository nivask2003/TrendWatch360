import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import Category from '@/models/Category';

export async function GET() {
    try {
        await dbConnect();

        const [totalPosts, publishedPosts, draftPosts, totalCategories, viewStats] = await Promise.all([
            Post.countDocuments(),
            Post.countDocuments({ status: 'published' }),
            Post.countDocuments({ status: 'draft' }),
            Category.countDocuments(),
            Post.aggregate([
                { $group: { _id: null, totalViews: { $sum: "$views" } } }
            ])
        ]);

        const totalViews = viewStats.length > 0 ? viewStats[0].totalViews : 0;

        return NextResponse.json({
            totalPosts,
            publishedPosts,
            draftPosts,
            totalCategories,
            totalViews
        });
    } catch (error) {
        console.error("Stats API Error:", error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
