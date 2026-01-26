import NewsCard from "@/components/public/NewsCard";
import Sidebar from "@/components/public/Sidebar";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import Post from "@/models/Post";

async function getCategoryData(slug: string) {
    await dbConnect();
    try {
        const category = await Category.findOne({ slug }).lean();
        return JSON.parse(JSON.stringify(category));
    } catch (error) {
        console.error("Error fetching category:", error);
        return null;
    }
}

async function getPostsByCategoryData(categoryId: string) {
    await dbConnect();
    try {
        const posts = await Post.find({ category: categoryId, status: 'published' })
            .populate('category')
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error("Error fetching category posts:", error);
        return [];
    }
}

async function getRecentPostsData() {
    await dbConnect();
    try {
        const posts = await Post.find({ status: 'published' })
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error("Error fetching recent posts:", error);
        return [];
    }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await getCategoryData(slug);

    if (!category) {
        return (
            <div className="max-w-news py-24 text-center">
                <h1 className="text-4xl font-black text-secondary mb-4">Category Not Found</h1>
                <p className="text-muted mb-8">The category you are looking for does not exist or has been removed.</p>
                <Link href="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl">Back to Home</Link>
            </div>
        );
    }

    const posts = await getPostsByCategoryData(category._id);
    const recentPosts = await getRecentPostsData();

    return (
        <div className="max-w-news py-10">
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-10 bg-primary rounded-full" />
                    <h1 className="text-5xl font-black uppercase text-secondary">{category.name}</h1>
                </div>
                <p className="text-muted text-lg">{category.description || `Exploring the latest updates and insights in ${category.name}.`}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {posts.length > 0 ? posts.map((post: any) => (
                            <NewsCard key={post._id} post={post} />
                        )) : (
                            <div className="col-span-2 py-12 text-center text-muted font-bold bg-gray-50 rounded-2xl border border-dashed border-border text-wrap break-words">
                                No articles found in this category yet.
                            </div>
                        )}
                    </div>
                </div>

                <aside className="lg:col-span-4">
                    <Sidebar trendingPosts={recentPosts} />
                </aside>
            </div>
        </div>
    );
}
