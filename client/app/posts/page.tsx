/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { HiUser, HiClock, HiBookOpen, HiPencilAlt } from 'react-icons/hi'
import { FaQuoteLeft } from 'react-icons/fa'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'

const PostsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')

    const posts = [
        {
            id: 1,
            type: "blog",
            title: "The Art of Metaphor in Modern Poetry",
            author: "Priya Sharma",
            date: "2 days ago",
            category: "Poetry",
            image: "/poetry.jpg",
            excerpt: "Exploring how contemporary poets are reinventing classical metaphors to express modern emotions. This deep dive examines the evolution of poetic devices in the digital age."
        },
        {
            id: 2,
            type: "story",
            title: "The Midnight Writer",
            author: "Rahul Verma",
            date: "5 days ago",
            category: "Fiction",
            content: "In a small room lit only by the glow of a laptop screen, she typed furiously. The characters in her mind demanded to be heard, their stories refusing to wait for a more convenient hour. Each keystroke was a step deeper into a world only she could see.",
            readTime: "5 min read"
        },
        {
            id: 3,
            type: "shayari",
            title: "Dil Ki Baat",
            author: "Ananya Singh",
            date: "1 week ago",
            lines: [
                "ख़्वाबों में जो बातें अधूरी रह गईं",
                "वो शब्दों में ढल कर कहानी बन गईं",
                "दिल की गहराइयों से निकली हर बात",
                "कागज़ पर लिखते ही मुस्कान बन गईं"
            ]
        },
        {
            id: 4,
            type: "poem",
            title: "Whispers of Dawn",
            author: "Vikram Malhotra",
            date: "1 week ago",
            lines: [
                "Morning light breaks through",
                "Silent words find their voice",
                "A new day begins"
            ],
            style: "Haiku"
        },
        {
            id: 5,
            type: "blog",
            title: "Finding Your Voice as a Young Writer",
            author: "Neha Kapoor",
            date: "2 weeks ago",
            category: "Writing Tips",
            image: "/poetry.jpg",
            excerpt: "Discover how to develop your unique writing style and stand out in the literary world. Learn from experienced authors about the journey of finding your authentic voice."
        },
        {
            id: 6,
            type: "story",
            title: "The Last Letter",
            author: "Arjun Reddy",
            date: "2 weeks ago",
            category: "Fiction",
            content: "She held the envelope with trembling hands. Twenty years had passed since she last saw his handwriting. The ink had faded slightly, but the words inside would change everything she thought she knew about their past.",
            readTime: "8 min read"
        },
        {
            id: 7,
            type: "shayari",
            title: "Ek Ehsaas",
            author: "Meera Nair",
            date: "3 weeks ago",
            lines: [
                "लफ्ज़ों की महफिल में तन्हाई का साथ है",
                "कागज़ पे लिखी हर बात दिल की बात है",
                "शब्दों से बनती है जो दुनिया अपनी",
                "उस दुनिया में बस तुम्हारी याद है"
            ]
        },
        {
            id: 8,
            type: "poem",
            title: "Echoes of Silence",
            author: "Kabir Das",
            date: "3 weeks ago",
            lines: [
                "In the quiet between words",
                "Lives the truth we seek",
                "Silence speaks volumes",
                "When we learn to listen"
            ],
            style: "Free Verse"
        },
        {
            id: 9,
            type: "blog",
            title: "The Power of Storytelling in Digital Age",
            author: "Sanjay Kumar",
            date: "1 month ago",
            category: "Digital Writing",
            image: "/poetry.jpg",
            excerpt: "How traditional storytelling methods are adapting to new media platforms. Examining the intersection of classic narrative techniques and modern technology."
        },
        {
            id: 10,
            type: "story",
            title: "Coffee and Conversations",
            author: "Divya Patel",
            date: "1 month ago",
            category: "Fiction",
            content: "The café was nearly empty at this hour. Across the table, he stirred his coffee absently, gathering courage to say the words that had been weighing on his heart for months. Sometimes, the smallest moments become the biggest memories.",
            readTime: "6 min read"
        },
        {
            id: 11,
            type: "shayari",
            title: "Intezaar",
            author: "Aarav Mehta",
            date: "1 month ago",
            lines: [
                "इन्तज़ार में खो गया हूँ मैं कहीं",
                "तुम्हारी याद में बस रह गया हूँ यहीं",
                "वक्त की रेत पर लिखी हर दास्तां",
                "तुम्हारे नाम की एक कहानी सहीं"
            ]
        },
        {
            id: 12,
            type: "poem",
            title: "Autumn Leaves",
            author: "Priya Gupta",
            date: "1 month ago",
            lines: [
                "Golden leaves dance and fall",
                "Each one a memory of summer past",
                "Nature's gentle farewell",
                "Before winter's embrace"
            ],
            style: "Contemporary"
        }
    ]

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

    const renderBlogCard = (post: any) => (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
            <div className="relative h-48 w-full">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-skin-light text-skin-lightest px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-serif text-skin-deep font-bold leading-tight mb-3 line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-sm text-tan-dark leading-relaxed mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-tan-dark pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                        <HiUser className="text-skin-deep text-sm" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <HiClock className="text-skin-deep text-sm" />
                        <span>{post.date}</span>
                    </div>
                </div>
                <button className="mt-4 w-full bg-skin-deep text-white py-2 px-4 rounded-lg hover:bg-skin-darker transition-colors text-sm font-semibold">
                    Read More
                </button>
            </div>
        </div>
    )

    const renderStoryCard = (post: any) => (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col border border-amber-200">
            <div className="flex items-center gap-2 mb-4">
                <HiBookOpen className="text-skin-deep text-xl" />
                <span className="text-xs font-semibold text-skin-deep uppercase">{post.category}</span>
            </div>
            <h3 className="text-lg font-serif text-skin-deep font-bold leading-tight mb-3">
                {post.title}
            </h3>
            <p className="text-sm text-tan-dark leading-relaxed mb-4 flex-grow italic">
                &ldquo;{post.content}&rdquo;
            </p>
            <div className="flex items-center justify-between text-xs text-tan-dark pt-3 border-t border-amber-200">
                <div className="flex items-center gap-1">
                    <HiUser className="text-skin-deep text-sm" />
                    <span>{post.author}</span>
                </div>
                <span className="text-xs font-medium text-skin-deep">{post.readTime}</span>
            </div>
            <button className="mt-4 w-full bg-skin-deep text-white py-2 px-4 rounded-lg hover:bg-skin-darker transition-colors text-sm font-semibold">
                Read Full Story
            </button>
        </div>
    )

    const renderShayariCard = (post: any) => (
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between border border-rose-200">
            <div>
                <div className="flex justify-center mb-4">
                    <FaQuoteLeft className="text-skin-deep text-3xl opacity-50" />
                </div>
                <h3 className="text-lg font-serif text-skin-deep font-bold text-center mb-5">
                    {post.title}
                </h3>
                <div className="space-y-2 mb-5">
                    {post.lines.map((line: string, index: number) => (
                        <p key={index} className="text-sm text-center text-tan-dark leading-relaxed font-serif italic">
                            {line}
                        </p>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between text-xs text-tan-dark pt-3 border-t border-rose-200">
                <div className="flex items-center gap-1">
                    <HiPencilAlt className="text-skin-deep text-sm" />
                    <span>{post.author}</span>
                </div>
                <span>{post.date}</span>
            </div>
        </div>
    )

    const renderPoemCard = (post: any) => (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between border border-purple-200">
            <div>
                <div className="text-xs font-semibold text-skin-deep uppercase mb-3 text-center">
                    {post.style}
                </div>
                <h3 className="text-lg font-serif text-skin-deep font-bold text-center mb-5">
                    {post.title}
                </h3>
                <div className="space-y-2 mb-5">
                    {post.lines.map((line: string, index: number) => (
                        <p key={index} className="text-sm text-center text-tan-dark leading-relaxed font-serif">
                            {line}
                        </p>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between text-xs text-tan-dark pt-3 border-t border-purple-200">
                <div className="flex items-center gap-1">
                    <HiPencilAlt className="text-skin-deep text-sm" />
                    <span>{post.author}</span>
                </div>
                <span>{post.date}</span>
            </div>
        </div>
    )

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
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-2xl text-skin-deep font-serif">
                                No posts found in this category
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredPosts.map((post) => (
                                <div key={post.id}>
                                    {post.type === 'blog' && renderBlogCard(post)}
                                    {post.type === 'story' && renderStoryCard(post)}
                                    {post.type === 'shayari' && renderShayariCard(post)}
                                    {post.type === 'poem' && renderPoemCard(post)}
                                </div>
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
                        Have a story, poem, or article you'd like to share? Join our community of writers and contribute to our literary collection.
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
