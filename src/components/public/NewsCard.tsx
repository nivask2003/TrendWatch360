import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

interface NewsCardProps {
    post: {
        title: string;
        slug: string;
        summary: string;
        featuredImage: string;
        category: { name: string; slug: string };
        createdAt: string;
        author: string;
    };
    variant?: 'horizontal' | 'vertical' | 'compact';
}

const NewsCard = ({ post, variant = 'vertical' }: NewsCardProps) => {
    if (variant === 'horizontal') {
        return (
            <div className="flex gap-4 items-start group">
                <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                        src={post.featuredImage || 'https://images.unsplash.com/photo-1504711432869-5d39a130f6c8?auto=format&fit=crop&q=80&w=800'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Link href={`/category/${post.category.slug}`} className="text-[10px] uppercase font-bold text-primary tracking-wider">
                        {post.category.name}
                    </Link>
                    <Link href={`/article/${post.slug}`}>
                        <h3 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                    </Link>
                    <p className="text-[10px] text-muted">{format(new Date(post.createdAt), 'MMM dd, yyyy')}</p>
                </div>
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div className="group border-b border-border pb-4 last:border-0">
                <Link href={`/category/${post.category.slug}`} className="text-[10px] uppercase font-bold text-primary tracking-wider">
                    {post.category.name}
                </Link>
                <Link href={`/article/${post.slug}`}>
                    <h3 className="text-base font-bold leading-tight mt-1 group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                </Link>
                <p className="text-xs text-muted mt-2">{format(new Date(post.createdAt), 'MMM dd, yyyy')}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 group">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 border border-border">
                <Image
                    src={post.featuredImage || 'https://images.unsplash.com/photo-1504711432869-5d39a130f6c8?auto=format&fit=crop&q=80&w=800'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="flex flex-col gap-2">
                <Link href={`/category/${post.category.slug}`} className="text-xs uppercase font-bold text-primary tracking-wider">
                    {post.category.name}
                </Link>
                <Link href={`/article/${post.slug}`}>
                    <h2 className="text-xl font-black leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                    </h2>
                </Link>
                <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                    {post.summary}
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200" />
                    <span className="text-xs font-semibold text-secondary">{post.author}</span>
                    <span className="text-xs text-muted">•</span>
                    <span className="text-xs text-muted">{format(new Date(post.createdAt), 'MMM dd, yyyy')}</span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
