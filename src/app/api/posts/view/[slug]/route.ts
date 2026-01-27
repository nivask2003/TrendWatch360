import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';

export async function POST(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await dbConnect();
        const { slug } = params;

        const post = await Post.findOneAndUpdate(
            { slug, status: 'published' },
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ views: post.views });
    } catch (error) {
        console.error("Error incrementing view count:", error);
        return NextResponse.json({ error: 'Failed to increment view count' }, { status: 500 });
    }
}
