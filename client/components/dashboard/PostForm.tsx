'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiUpload, FiX, FiImage, FiLoader } from 'react-icons/fi';
import Image from 'next/image';

interface PostFormProps {
    postId?: string;
}

export default function PostForm({ postId }: PostFormProps) {
    const isEdit = !!postId;
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(!!postId);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [form, setForm] = useState({
        title: '',
        type: 'blog',
        author: '',
        content: '',
        excerpt: '',
        category: '',
        style: '',
        image: '',
        readTime: '',
        status: 'published',
        isWeeklyTop: false,
    });

    useEffect(() => {
        if (postId) {
            fetchPost();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

    const fetchPost = async () => {
        try {
            const res = await fetch(`/api/posts/${postId}`);
            const data = await res.json();
            if (data.success && data.data) {
                const p = data.data;
                setForm({
                    title: p.title || '',
                    type: p.type || 'blog',
                    author: p.author || '',
                    content: p.content || '',
                    excerpt: p.excerpt || '',
                    category: p.category || '',
                    style: p.style || '',
                    image: p.image || '',
                    readTime: p.readTime || '',
                    status: p.status || 'published',
                    isWeeklyTop: p.isWeeklyTop || false,
                });
            } else {
                setError(data.message || 'Failed to load post');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to load post');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }

        // Max size 5MB
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileType', 'image');

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                setForm(prev => ({ ...prev, image: data.data.url }));
                toast.success('Image uploaded successfully');
            } else {
                toast.error(data.message || 'Failed to upload image');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Error uploading image');
        } finally {
            setUploading(false);
            // Reset input value to allow selecting same file again
            e.target.value = '';
        }
    };

    const removeImage = () => {
        setForm(prev => ({ ...prev, image: '' }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(postId ? `/api/posts/${postId}` : '/api/posts', {
                method: postId ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                const message = data.message || 'Something went wrong';
                setError(message);
                toast.error(message);
            } else {
                const message = postId ? 'Post updated successfully' : 'Post created successfully';
                setSuccess(message);
                toast.success(message);

                // After successful create/update, go back to posts list
                router.push('/admin/dashboard/posts');
            }
        } catch (err) {
            console.error(err);
            setError('Something went wrong');
            toast.error('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <p className="text-gray-500">Loading post...</p>;
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {isEdit ? 'Edit Post' : 'Create New Post'}
            </h2>

            {error && (
                <p className="mb-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
                    {error}
                </p>
            )}
            {success && (
                <p className="mb-3 text-sm text-green-600 bg-green-50 border border-green-100 rounded px-3 py-2">
                    {success}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="blog">Blog</option>
                            <option value="story">Story</option>
                            <option value="shayari">Shayari</option>
                            <option value="poem">Poem</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <input
                        type="checkbox"
                        id="isWeeklyTop"
                        name="isWeeklyTop"
                        checked={form.isWeeklyTop}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="isWeeklyTop" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                        Feature in Weekly Top Section
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                    <textarea
                        name="excerpt"
                        value={form.excerpt}
                        onChange={handleChange}
                        rows={2}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        rows={6}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
                        <input
                            type="text"
                            name="style"
                            value={form.style}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                        <input
                            type="text"
                            name="readTime"
                            value={form.readTime}
                            onChange={handleChange}
                            placeholder="e.g. 5 min read"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                    <div className="space-y-4">
                        {/* Image Preview Area */}
                        {form.image ? (
                            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                                <Image
                                    src={form.image}
                                    alt="Post preview"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none transform hover:scale-110 transition-transform"
                                        title="Remove Image"
                                    >
                                        <FiX size={20} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors relative">
                                {uploading ? (
                                    <div className="flex flex-col items-center text-blue-600">
                                        <FiLoader className="animate-spin text-3xl mb-2" />
                                        <span className="text-sm font-medium">Uploading...</span>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            disabled={uploading}
                                        />
                                        <div className="flex flex-col items-center text-gray-500">
                                            <FiUpload className="text-3xl mb-2" />
                                            <span className="text-sm font-medium">Click to upload image</span>
                                            <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* URL Fallback */}
                        <div className="flex items-center gap-2">
                            <div className="flex-grow">
                                <input
                                    type="text"
                                    name="image"
                                    value={form.image}
                                    onChange={handleChange}
                                    placeholder="Or paste an image URL here"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={uploading}
                                />
                            </div>
                            {form.image && (
                                <span className="text-xs text-green-600 flex items-center gap-1">
                                    <FiImage /> Image Set
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {submitting ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update Post' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}
