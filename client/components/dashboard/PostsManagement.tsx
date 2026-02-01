'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Post {
    _id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    status: string;
    createdAt: string;
    isWeeklyTop?: boolean;
}

export default function PostsManagement() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/posts');
            const data = await res.json();
            let filteredPosts: Post[] = data.data || [];

            if (filter === 'published') {
                filteredPosts = filteredPosts.filter((p: Post) => p.status === 'published');
            } else if (filter === 'draft') {
                filteredPosts = filteredPosts.filter((p: Post) => p.status === 'draft');
            }

            setPosts(filteredPosts);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            toast.error('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(prev => prev.filter(p => p._id !== id));
                toast.success('Post deleted successfully');
            } else {
                const data = await res.json().catch(() => null);
                toast.error(data?.message || 'Failed to delete post');
            }
        } catch (error) {
            console.error('Failed to delete post:', error);
            toast.error('Failed to delete post');
        }
    };

    const togglePublish = async (id: string, currentStatus: string) => {
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: currentStatus === 'published' ? 'draft' : 'published' })
            });

            if (res.ok) {
                toast.success(currentStatus === 'published' ? 'Post moved to draft' : 'Post published');
                fetchPosts();
            } else {
                const data = await res.json().catch(() => null);
                toast.error(data?.message || 'Failed to update post');
            }
        } catch (error) {
            console.error('Failed to update post:', error);
            toast.error('Failed to update post');
        }
    };

    const toggleWeeklyTop = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isWeeklyTop: !currentStatus })
            });

            if (res.ok) {
                toast.success(!currentStatus ? 'Added to Weekly Top' : 'Removed from Weekly Top');
                fetchPosts();
            } else {
                const data = await res.json().catch(() => null);
                toast.error(data?.message || 'Failed to update post');
            }
        } catch (error) {
            console.error('Failed to update post:', error);
            toast.error('Failed to update post');
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Posts Management</h2>
                    <Link
                        href="/admin/dashboard/posts/new"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        + New Post
                    </Link>
                </div>
                <div className="flex gap-2 mt-4">
                    {['all', 'published', 'draft'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6">
                {posts.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No posts found</p>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {post.title}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {post.status === 'published' ? 'Published' : 'Draft'}
                                            </span>
                                            {post.category && (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                    {post.category}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span>👤 {post.author}</span>
                                            <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                                            {post.isWeeklyTop && (
                                                <span className="text-indigo-600 font-medium">✨ Weekly Top</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleWeeklyTop(post._id, post.isWeeklyTop || false)}
                                            className={`px-3 py-1 text-sm rounded transition-colors ${post.isWeeklyTop
                                                    ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {post.isWeeklyTop ? '★ Top' : '☆ Top'}
                                        </button>
                                        <button
                                            onClick={() => togglePublish(post._id, post.status)}
                                            className={`px-3 py-1 text-sm rounded transition-colors ${post.status === 'published'
                                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                        >
                                            {post.status === 'published' ? 'Unpublish' : 'Publish'}
                                        </button>
                                        <Link
                                            href={`/admin/dashboard/posts/${post._id}`}
                                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deletePost(post._id)}
                                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
