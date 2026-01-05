/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'
import { HiUser, HiClock, HiBookOpen, HiPencilAlt } from 'react-icons/hi'
import { FaQuoteLeft } from 'react-icons/fa'

const PostsSection = () => {
    const posts = [
        {
            id: 1,
            type: "blog",
            title: "The Art of Metaphor in Modern Poetry",
            author: "Priya Sharma",
            date: "2 days ago",
            category: "Poetry",
            image: "/poetry.jpg",
            excerpt: "Exploring how contemporary poets are reinventing classical metaphors to express modern emotions..."
        },
        {
            id: 2,
            type: "story",
            title: "The Midnight Writer",
            author: "Rahul Verma",
            date: "5 days ago",
            category: "Fiction",
            content: "In a small room lit only by the glow of a laptop screen, she typed furiously. The characters in her mind demanded to be heard...",
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
                "वो शब्दों में ढल कर कहानी बन गईं"
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
            excerpt: "Discover how to develop your unique writing style and stand out in the literary world..."
        },
        {
            id: 6,
            type: "story",
            title: "The Last Letter",
            author: "Arjun Reddy",
            date: "2 weeks ago",
            category: "Fiction",
            content: "She held the envelope with trembling hands. Twenty years had passed since she last saw his handwriting...",
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
                "कागज़ पे लिखी हर बात दिल की बात है"
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
                "Silence speaks volumes"
            ],
            style: "Free Verse"
        }
    ]

    const renderBlogCard = (post: any) => (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
            <div className="relative h-36 w-full">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
                <div className="absolute top-2 left-2 bg-skin-light text-skin-lightest px-2 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-base font-serif text-skin-deep font-bold leading-tight mb-2 line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-xs text-tan-dark leading-relaxed mb-3 line-clamp-2">
                    {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-tan-dark pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                        <HiUser className="text-skin-deep text-xs" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <HiClock className="text-skin-deep text-xs" />
                        <span>{post.date}</span>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderStoryCard = (post: any) => (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col border border-amber-200">
            <div className="flex items-center gap-2 mb-3">
                <HiBookOpen className="text-skin-deep text-lg" />
                <span className="text-xs font-semibold text-skin-deep uppercase">{post.category}</span>
            </div>
            <h3 className="text-base font-serif text-skin-deep font-bold leading-tight mb-2">
                {post.title}
            </h3>
            <p className="text-xs text-tan-dark leading-relaxed mb-3 flex-grow line-clamp-3 italic">
                &ldquo;{post.content}&rdquo;
            </p>
            <div className="flex items-center justify-between text-xs text-tan-dark pt-2 border-t border-amber-200">
                <div className="flex items-center gap-1">
                    <HiUser className="text-skin-deep text-xs" />
                    <span>{post.author}</span>
                </div>
                <span className="text-xs font-medium text-skin-deep">{post.readTime}</span>
            </div>
        </div>
    )

    const renderShayariCard = (post: any) => (
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between border border-rose-200">
            <div>
                <div className="flex justify-center mb-3">
                    <FaQuoteLeft className="text-skin-deep text-2xl opacity-50" />
                </div>
                <h3 className="text-base font-serif text-skin-deep font-bold text-center mb-4">
                    {post.title}
                </h3>
                <div className="space-y-2 mb-4">
                    {post.lines.map((line: string, index: number) => (
                        <p key={index} className="text-sm text-center text-tan-dark leading-relaxed font-serif italic">
                            {line}
                        </p>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between text-xs text-tan-dark pt-3 border-t border-rose-200">
                <div className="flex items-center gap-1">
                    <HiPencilAlt className="text-skin-deep text-xs" />
                    <span>{post.author}</span>
                </div>
                <span>{post.date}</span>
            </div>
        </div>
    )

    const renderPoemCard = (post: any) => (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between border border-purple-200">
            <div>
                <div className="text-xs font-semibold text-skin-deep uppercase mb-2 text-center">
                    {post.style}
                </div>
                <h3 className="text-base font-serif text-skin-deep font-bold text-center mb-4">
                    {post.title}
                </h3>
                <div className="space-y-2 mb-4">
                    {post.lines.map((line: string, index: number) => (
                        <p key={index} className="text-sm text-center text-tan-dark leading-relaxed font-serif">
                            {line}
                        </p>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between text-xs text-tan-dark pt-3 border-t border-purple-200">
                <div className="flex items-center gap-1">
                    <HiPencilAlt className="text-skin-deep text-xs" />
                    <span>{post.author}</span>
                </div>
                <span>{post.date}</span>
            </div>
        </div>
    )

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
                    {posts.map((post) => (
                        <div key={post.id}>
                            {post.type === 'blog' && renderBlogCard(post)}
                            {post.type === 'story' && renderStoryCard(post)}
                            {post.type === 'shayari' && renderShayariCard(post)}
                            {post.type === 'poem' && renderPoemCard(post)}
                        </div>
                    ))}
                </div>
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
                <button className="border-2 border-skin-deep hover:bg-skin-light text-skin-deep font-semibold py-3 px-8 rounded-xl transition-colors duration-300">
                    View All Posts
                </button>
            </div>
        </section>

    )
}

export default PostsSection
