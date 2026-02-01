'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { HiUser, HiClock, HiCalendar, HiTag, HiShare, HiArrowLeft } from 'react-icons/hi';
import { FaQuoteLeft } from 'react-icons/fa';
import { format } from 'date-fns';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

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
    status: string;
}

export default function PostDetailPage() {
    const params = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${params.id}`);
                const data = await response.json();
                if (data.success) {
                    setPost(data.data);
                } else {
                    setError('Post not found');
                }
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchPost();
        }
    }, [params.id]);

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMMM d, yyyy');
        } catch {
            return 'Unknown Date';
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

    const LoadingState = () => (
        <div className="min-h-screen bg-skin-lightest flex flex-col">
            <Navbar />
            <div className="flex-grow max-w-4xl mx-auto w-full px-6 py-12">
                <div className="animate-pulse space-y-8">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-12 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                    <div className="h-96 w-full bg-gray-200 rounded-xl"></div>
                    <div className="space-y-4">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

    const ErrorState = () => (
        <div className="min-h-screen bg-skin-lightest flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center p-6">
                <div className="text-center">
                    <h2 className="text-3xl font-serif text-skin-deep mb-4">Post Not Found</h2>
                    <p className="text-tan-dark mb-8">{error || "The content you're looking for doesn't exist."}</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-skin-deep text-white rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        <HiArrowLeft /> Back to Home
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );

    if (loading) return <LoadingState />;
    if (error || !post) return <ErrorState />;

    const showImage = post.image && isValidImageSource(post.image);

    return (
        <div className="min-h-screen bg-skin-lightest flex flex-col">
            <Navbar />

            <main className="flex-grow pt-8 pb-20">
                <article className="max-w-4xl mx-auto px-6">
                    {/* Breadcrumbs / Back */}
                    <Link
                        href="/#posts-section"
                        className="inline-flex items-center gap-2 text-tan-dark hover:text-skin-deep mb-8 transition-colors text-sm font-medium"
                    >
                        <HiArrowLeft /> Back to Posts
                    </Link>

                    {/* Header */}
                    <header className="mb-10 text-center">
                        <div className="inline-block px-3 py-1 bg-skin-light/20 text-skin-deep rounded-full text-sm font-semibold capitalize mb-4">
                            {post.type}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif text-skin-deep font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-tan-dark text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <HiUser className="text-skin-deep" />
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <HiCalendar className="text-skin-deep" />
                                <span>{formatDate(post.createdAt)}</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image - Only show if valid */}
                    {showImage && (
                        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-12">
                            <Image
                                src={post.image!}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-orange-50/50">

                        {/* Poem / Shayari Layout */}
                        {(post.type === 'poem' || post.type === 'shayari') && post.lines && (
                            <div className="flex flex-col items-center">
                                <FaQuoteLeft className="text-4xl text-skin-light mb-8 opacity-50" />
                                <div className="space-y-4 text-center max-w-2xl">
                                    {post.lines.map((line, idx) => (
                                        <p key={idx} className="text-xl md:text-2xl font-serif text-skin-deep leading-relaxed">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-skin-light to-transparent mt-12"></div>
                            </div>
                        )}

                        {/* Story / Blog Layout */}
                        {(post.type === 'story' || post.type === 'blog') && (
                            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-skin-deep prose-p:text-tan-dark prose-a:text-skin-act max-w-none">
                                {post.excerpt && (
                                    <p className="lead text-xl italic text-gray-600 mb-8 border-l-4 border-skin-light pl-6">
                                        {post.excerpt}
                                    </p>
                                )}
                                <div className="font-serif leading-loose whitespace-pre-wrap">
                                    {post.content}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Share / Footer of Article */}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <HiTag className="text-skin-light" />
                            <span className="text-tan-dark text-sm capitalize">{post.type}</span>
                        </div>
                        <button className="flex items-center gap-2 text-skin-deep hover:text-skin-act transition-colors font-medium">
                            <HiShare />
                            <span>Share</span>
                        </button>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
