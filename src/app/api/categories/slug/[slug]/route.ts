import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    await dbConnect();
    try {
        const category = await Category.findOne({ slug });
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
    }
}
