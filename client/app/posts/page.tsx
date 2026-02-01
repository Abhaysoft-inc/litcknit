/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiUser, HiClock } from 'react-icons/hi'
import { formatDistanceToNow } from 'date-fns'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'

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
    category?: string;
    style?: string;
    readTime?: string;
    status: string;
}

const PostsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/posts?status=published');
                const data = await res.json();
                if (data.success) {
                    setPosts(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const categories = [
        { id: 'all', label: 'All Posts' },
        { id: 'blog', label: 'Blogs' },
        { id: 'story', label: 'Stories' },
        { id: 'shayari', label: 'Shayari' },
        { id: 'poem', label: 'Poems' }
    ]

    const filteredPosts = selectedCategory === 'all'
        ? posts
        : posts.filter(post => post.type === selectedCategory)

    // Helper to format date
    const formatDate = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true });
        } catch {
            return 'Recently';
        }
    };

    // Helper to check valid image source
    const isValidImageSource = (src?: string) => {
        if (!src) return false;
        if (src.startsWith('/')) return true;
        try {
            new URL(src);
            return true;
        } catch {
            return false;
        }
    };

    const PostCard = ({ post }: { post: Post }) => (
        <Link href={`/posts/${post._id}`} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col block">
            <div className="relative h-48 w-full bg-gray-200">
                {isValidImageSource(post.image) ? (
                    <Image
                        src={post.image!}
                        alt={post.title}
                        fill
                        className="object-cover"
                        unoptimized={!!post.image && !post.image.startsWith('/')}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-skin-light">
                        <span className="text-4xl text-skin-medium opacity-20">📝</span>
                    </div>
                )}
                {post.category && (
                    <div className="absolute top-3 left-3 bg-skin-light text-skin-lightest px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                    </div>
                )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-serif text-skin-deep font-bold leading-tight mb-3 line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-sm text-tan-dark leading-relaxed mb-4 flex-1 line-clamp-3">
                    {post.excerpt
                        || (post.content ? post.content.substring(0, 100) + '...' : '')
                        || (post.lines ? post.lines.slice(0, 3).join(' / ') : '')}
                </p>
                <div className="flex items-center justify-between text-xs text-tan-dark pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                        <HiUser className="text-skin-deep text-sm" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <HiClock className="text-skin-deep text-sm" />
                        <span>{formatDate(post.createdAt)}</span>
                    </div>
                </div>
                <div className="mt-4 w-full bg-skin-deep text-white py-2 px-4 rounded-lg hover:bg-skin-darker transition-colors text-sm font-semibold text-center">
                    Read More
                </div>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-skin-lightest">
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full py-20 px-8 md:px-20 bg-gradient-to-br from-skin-light via-skin-lighter to-skin-lightest">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-serif text-skin-deep mb-6">
                        Literary Posts
                    </h1>
                    <p className="text-xl md:text-2xl text-skin-darker max-w-3xl mx-auto leading-relaxed">
                        Explore our collection of blogs, stories, shayari, and poems created by talented writers from our literary community
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="w-full py-8 px-8 md:px-20 bg-skin-light">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category.id
                                    ? 'bg-skin-deep text-white shadow-lg'
                                    : 'bg-white text-skin-deep hover:bg-skin-lighter border-2 border-skin-deep'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="w-full py-16 px-8 md:px-20 bg-skin-lightest">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-skin-base"></div>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-2xl text-skin-deep font-serif">
                                No posts found in this category
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredPosts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="w-full py-16 px-8 md:px-20 bg-skin-light">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-skin-deep mb-6">
                        Share Your Story
                    </h2>
                    <p className="text-lg text-skin-darker mb-8">
                        Have a story, poem, or article you&apos;d like to share? Join our community of writers and contribute to our literary collection.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/contact"
                            className="bg-skin-deep text-white font-semibold py-3 px-8 rounded-xl hover:bg-skin-darker transition-colors duration-300"
                        >
                            Submit Your Work
                        </a>
                        <a
                            href="/"
                            className="border-2 border-skin-deep text-skin-deep font-semibold py-3 px-8 rounded-xl hover:bg-skin-lighter transition-colors duration-300"
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default PostsPage
