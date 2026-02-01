/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiUser, HiClock } from 'react-icons/hi'
import { formatDistanceToNow } from 'date-fns'

interface Post {
    _id: string;
    title: string;
    type: string;
    author: string;
    createdAt: string;
    image?: string;
    excerpt?: string;
    content?: string;
    lines?: string[];
}

const PostCard = ({ post }: { post: Post }) => {
    const [imageError, setImageError] = useState(false);

    const getExcerpt = (post: Post) => {
        if (post.excerpt) return post.excerpt;
        if (post.content) return post.content.substring(0, 100) + '...';
        if (post.lines && post.lines.length > 0) return post.lines.slice(0, 2).join(' ');
        return '';
    };

    const formatDate = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true });
        } catch {
            return 'Recently';
        }
    };

    // Helper to check if string looks like a valid URL or path
    const isValidImageSource = (src?: string) => {
        if (!src) return false;
        if (src.startsWith('/')) return true; // Local path
        try {
            new URL(src); // Valid absolute URL
            return true;
        } catch {
            return false;
        }
    };

    const showImage = post.image && !imageError && isValidImageSource(post.image);

    return (
        <Link href={`/posts/${post._id}`} className="block h-full">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                <div className="relative h-48 w-full bg-gray-200">
                    {showImage ? (
                        <Image
                            src={post.image!}
                            alt={post.title}
                            fill
                            className="object-cover"
                            onError={() => setImageError(true)}
                            unoptimized={true} // Add unoptimized to prevent Next.js image optimization errors with external URLs
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-skin-light/20 to-skin-deep/10 text-skin-deep/50">
                            <div className="text-center p-4">
                                <span className="text-4xl block mb-2 opacity-50">📝</span>
                                <span className="text-lg font-serif opacity-70 capitalize">{post.type}</span>
                            </div>
                        </div>
                    )}
                    <div className="absolute top-2 left-2 bg-skin-light text-skin-lightest px-2 py-1 rounded-full text-xs font-semibold capitalize shadow-sm z-10">
                        {post.type}
                    </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-serif text-skin-deep font-bold leading-tight mb-2 line-clamp-2 hover:text-skin-act transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-sm text-tan-dark leading-relaxed mb-4 line-clamp-3">
                        {getExcerpt(post)}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-tan-dark pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 font-medium">
                            <HiUser className="text-skin-deep text-sm" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <HiClock className="text-skin-deep text-sm" />
                            <span>{formatDate(post.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const PostsSection = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts?status=published');
                const data = await response.json();
                if (data.success) {
                    setPosts(data.data.slice(0, 8)); // Display max 8 latest posts
                } else {
                    setError('Failed to fetch posts');
                }
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <section className="w-full py-20 px-8 md:px-20 bg-skin-lightest">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 w-64 bg-gray-200 rounded mb-12"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        // handle empty/error state quietly or show minimal message
        return null;
    }

    return (
        <section id="posts-section" className="w-full py-20 px-8 md:px-20 bg-skin-lightest">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-skin-deep mb-4">
                        Latest Posts
                    </h2>
                    <p className="text-xl text-tan-dark max-w-2xl mx-auto">
                        Read our latest articles, stories, and insights from the literary community
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-tan-dark py-10">
                            No posts available at the moment.
                        </div>
                    )}
                </div>
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
                <Link
                    href="/posts"
                    className="inline-block border-2 border-skin-deep hover:bg-skin-light text-skin-deep font-semibold py-3 px-8 rounded-xl transition-colors duration-300"
                >
                    View All Posts
                </Link>
            </div>
        </section>

    )
}

export default PostsSection
