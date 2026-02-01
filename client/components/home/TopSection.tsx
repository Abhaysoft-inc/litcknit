'use client';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
    _id: string;
    title: string;
    type: string; // Used as category
    author: string;
    image?: string;
    excerpt?: string;
    createdAt: string;
    // We don't have rating/reads in the backend model yet, so we'll omit them or use placeholders
}

export default function TopSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopPosts = async () => {
            try {
                const res = await fetch('/api/posts?isWeeklyTop=true&status=published');
                const data = await res.json();
                if (data.success) {
                    setPosts(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch top posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopPosts();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const newScrollPosition = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        }
    };

    // Helper to check valid image source (same as PostsSection)
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

    if (loading) {
        return (
            <section className="py-20 px-8 md:px-20 bg-gradient-to-b from-skin-lightest to-white">
                <div className="max-w-7xl mx-auto flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-skin-base"></div>
                </div>
            </section>
        );
    }

    if (posts.length === 0) return null; // Don't show section if no top posts

    return (
        <section className="py-20 px-8 md:px-20 bg-gradient-to-b from-skin-lightest to-white">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <FiTrendingUp className="w-8 h-8 text-skin-deep" />
                    <h2 className="text-4xl md:text-5xl font-serif text-skin-darkest">
                        This Week's Top
                    </h2>
                </div>
                <p className="text-lg text-skin-deep max-w-2xl">
                    Discover the most loved writings and events from our literary community this week
                </p>
            </div>

            {/* Scrollable Cards Container */}
            <div className="relative max-w-7xl mx-auto">
                {/* Left Scroll Button */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-skin-base hover:bg-skin-deep text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hidden md:block"
                    aria-label="Scroll left"
                >
                    <FaChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Scroll Button */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-skin-base hover:bg-skin-deep text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hidden md:block"
                    aria-label="Scroll right"
                >
                    <FaChevronRight className="w-6 h-6" />
                </button>

                {/* Cards Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 py-4"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {posts.map((post, index) => (
                        <Link
                            href={`/posts/${post._id}`}
                            key={post._id}
                            className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-skin-lighter hover:border-skin-base"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 bg-skin-light overflow-hidden">
                                {isValidImageSource(post.image) && (
                                    <Image
                                        src={post.image!}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        unoptimized={!!post.image && !post.image.startsWith('/')}
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-br from-skin-base/20 to-skin-deep/40 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

                                {/* Rank Badge */}
                                <div className="absolute top-4 left-4 bg-amber-600 text-white font-bold text-lg px-4 py-2 rounded-full shadow-lg z-10">
                                    #{index + 1}
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-4 right-4 bg-white/90 text-skin-deep text-sm font-semibold px-3 py-1 rounded-full z-10 capitalize">
                                    {post.type}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-serif text-skin-darkest mb-2 line-clamp-2 group-hover:text-skin-deep transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-sm text-skin-medium mb-4">
                                    by {post.author}
                                </p>

                                {/* Date */}
                                <div className="flex items-center justify-between pt-4 border-t border-skin-lighter">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Scroll Indicator */}
            <div className="text-center mt-6 md:hidden">
                <p className="text-sm text-skin-medium">
                    ← Swipe to explore more →
                </p>
            </div>
        </section>
    );
}
