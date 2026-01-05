'use client';

import { FaChevronLeft, FaChevronRight, FaStar, FaEye } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { useRef } from 'react';

interface TopItem {
    id: number;
    title: string;
    category: string;
    author: string;
    rating: number;
    reads: string;
    image: string;
}

const topItems: TopItem[] = [
    {
        id: 1,
        title: "The Art of Storytelling",
        category: "Creative Writing",
        author: "Sarah Mitchell",
        rating: 4.8,
        reads: "2.3K",
        image: "/img1.jpg"
    },
    {
        id: 2,
        title: "Poetry Workshop Highlights",
        category: "Poetry",
        author: "James Carter",
        rating: 4.9,
        reads: "1.8K",
        image: "/img2.jpg"
    },
    {
        id: 3,
        title: "Modern Literature Debate",
        category: "Discussion",
        author: "Emma Wilson",
        rating: 4.7,
        reads: "3.1K",
        image: "/img3.jpg"
    },
    {
        id: 4,
        title: "Short Stories Collection",
        category: "Fiction",
        author: "Michael Brown",
        rating: 4.6,
        reads: "1.5K",
        image: "/img1.jpg"
    },
    {
        id: 5,
        title: "Writers' Meetup Notes",
        category: "Community",
        author: "Lisa Anderson",
        rating: 4.9,
        reads: "2.7K",
        image: "/img2.jpg"
    },
    {
        id: 6,
        title: "Literary Analysis Series",
        category: "Analysis",
        author: "David Lee",
        rating: 4.8,
        reads: "2.2K",
        image: "/img3.jpg"
    }
];

export default function TopSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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
                    {topItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-skin-lighter hover:border-skin-base"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 bg-skin-light overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-skin-base/20 to-skin-deep/40 group-hover:opacity-80 transition-opacity duration-300" />

                                {/* Rank Badge */}
                                <div className="absolute top-4 left-4 bg-amber-600 text-white font-bold text-lg px-4 py-2 rounded-full shadow-lg">
                                    #{index + 1}
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-4 right-4 bg-white/90 text-skin-deep text-sm font-semibold px-3 py-1 rounded-full">
                                    {item.category}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-serif text-skin-darkest mb-2 line-clamp-2 group-hover:text-skin-deep transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-skin-medium mb-4">
                                    by {item.author}
                                </p>

                                {/* Stats */}
                                <div className="flex items-center justify-between pt-4 border-t border-skin-lighter">
                                    <div className="flex items-center gap-2">
                                        <FaStar className="w-5 h-5 text-amber-500" />
                                        <span className="text-skin-deep font-semibold">{item.rating}</span>
                                    </div>

                                    <div className="flex items-center gap-1 text-skin-medium">
                                        <FaEye className="w-5 h-5" />
                                        <span className="font-semibold">{item.reads}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
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
