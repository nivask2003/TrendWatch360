import NewsCard from "@/components/public/NewsCard";
import Sidebar from "@/components/public/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { format } from 'date-fns';

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts?limit=10`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getTrendingPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts?trending=true&limit=5`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();
  const trendingPosts = await getTrendingPosts();

  if (posts.length === 0) {
    return (
      <div className="max-w-news py-20 text-center">
        <h2 className="text-2xl font-bold text-secondary">No news articles found.</h2>
        <p className="text-muted mt-2">Check back later for the latest updates.</p>
      </div>
    );
  }

  const heroPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);
  const latestNews = posts.slice(3);

  return (
    <div className="max-w-news py-10">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-8 group relative overflow-hidden rounded-3xl bg-gray-900 aspect-[16/9]">
          <Image
            src={heroPost.featuredImage || 'https://images.unsplash.com/photo-1504711432869-5d39a130f6c8?auto=format&fit=crop&q=80&w=1200'}
            alt={heroPost.title}
            fill
            className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
            <Link href={`/category/${heroPost.category?.slug}`} className="w-fit px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full mb-4">
              {heroPost.category?.name || 'Uncategorized'}
            </Link>
            <Link href={`/article/${heroPost.slug}`}>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:text-primary transition-colors">
                {heroPost.title}
              </h1>
            </Link>
            <p className="text-gray-300 text-lg line-clamp-2 max-w-2xl mb-6">
              {heroPost.summary}
            </p>
            <div className="flex items-center gap-4 text-white text-sm">
              <span className="font-bold">{heroPost.author}</span>
              <span className="opacity-50">•</span>
              <span className="opacity-50">{format(new Date(heroPost.createdAt), 'MMM dd, yyyy')}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          {secondaryPosts.length > 0 ? secondaryPosts.map((post: any) => (
            <div key={post.slug} className="group relative overflow-hidden rounded-2xl bg-gray-900 flex-grow aspect-video lg:aspect-auto">
              <Image
                src={post.featuredImage || 'https://images.unsplash.com/photo-1504711432869-5d39a130f6c8?auto=format&fit=crop&q=80&w=800'}
                alt={post.title}
                fill
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                <Link href={`/category/${post.category?.slug}`} className="w-fit px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold rounded-full mb-2">
                  {post.category?.name || 'Uncategorized'}
                </Link>
                <Link href={`/article/${post.slug}`}>
                  <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
              </div>
            </div>
          )) : (
            <div className="flex-grow bg-gray-50 rounded-2xl border border-dashed border-border flex items-center justify-center text-muted font-bold">
              More stories coming soon
            </div>
          )}
        </div>
      </section>

      {/* Ad Placement: Header Banner */}
      <div className="w-full bg-gray-50 border border-border h-32 mb-16 flex items-center justify-center text-muted text-xs font-bold rounded-xl border-dashed">
        ADVERTISEMENT AREA (Header Banner)
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Latest News */}
        <div className="lg:col-span-8 space-y-12">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                <h2 className="text-3xl font-black uppercase">Latest News</h2>
              </div>
              <Link href="/latest" className="text-sm font-bold text-primary hover:underline">View All</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {latestNews.length > 0 ? latestNews.map((post: any) => (
                <NewsCard key={post._id} post={post} />
              )) : (
                <div className="col-span-2 py-10 text-center text-muted font-bold">
                  No more news articles at the moment.
                </div>
              )}
            </div>
          </div>

          {/* Ad Placement: In-feed Ad */}
          <div className="w-full bg-gray-50 border border-border h-48 flex items-center justify-center text-muted text-xs font-bold rounded-xl border-dashed">
            ADVERTISEMENT AREA (In-feed Ad)
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar trendingPosts={trendingPosts.length > 0 ? trendingPosts : posts.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}

