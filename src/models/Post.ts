import mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
    title: string;
    slug: string;
    content: string;
    summary: string;
    category: mongoose.Types.ObjectId;
    author: string;
    featuredImage: string;
    tags: string[];
    seo: {
        metaTitle?: string;
        metaDescription?: string;
        focusKeyword?: string;
    };
    status: 'draft' | 'published';
    isTrending: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    summary: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    author: { type: String, default: 'Admin' },
    featuredImage: { type: String },
    tags: [{ type: String }],
    seo: {
        metaTitle: { type: String },
        metaDescription: { type: String },
        focusKeyword: { type: String },
    },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    isTrending: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
