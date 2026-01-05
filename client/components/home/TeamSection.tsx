'use client';

import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaUser } from 'react-icons/fa';
import { useRef } from 'react';

interface TeamMember {
    id: number;
    name: string;
    position: string;
    thought: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Dr. Aisha Rahman",
        position: "President, Literary Council",
        thought: "Literature is not just words on paper; it's the heartbeat of our culture, the mirror of our society, and the window to our collective soul."
    },
    {
        id: 2,
        name: "Prof. Vikram Patel",
        position: "Head of Publications",
        thought: "Every writer has a unique voice waiting to be heard. Our mission is to amplify those voices."
    },
    {
        id: 3,
        name: "Ms. Elena Rodriguez",
        position: "Creative Director",
        thought: "Creativity knows no bounds. Let your imagination soar and your pen dance freely."
    },
    {
        id: 4,
        name: "Vaibhav Pandey",
        position: "Secretary",
        thought: "Words have the power to change minds, touch hearts, and shape the future of our literary community."
    },
    {
        id: 5,
        name: "Ananya Singh",
        position: "Kavita Club Head",
        thought: "कविता वो ज़ुबान है जो दिल की बात कहती है, हर शब्द में छुपी है एक अनकही कहानी।"
    },
    {
        id: 6,
        name: "Rahul Verma",
        position: "Debate Club Head",
        thought: "In debate, we don't just argue; we learn to think critically, speak confidently, and respect diverse perspectives."
    }
];

export default function TeamSection() {
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
        <section className="py-20 px-8 md:px-20 bg-skin-lightest">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <FaUser className="w-7 h-7 text-skin-deep" />
                    <h2 className="text-3xl md:text-4xl font-serif text-skin-darkest">
                        Council Heads & Their Thoughts
                    </h2>
                </div>
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
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="flex-shrink-0 w-96 bg-skin-lighter rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-skin-light"
                        >
                            {/* Quote Icon */}
                            <div className="mb-6">
                                <FaQuoteLeft className="text-3xl text-skin-medium/40" />
                            </div>

                            {/* Thought Text */}
                            <p className="text-skin-darkest text-base leading-relaxed mb-8 font-normal">
                                "{member.thought}"
                            </p>

                            {/* Member Info */}
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-skin-light border-2 border-skin-base flex items-center justify-center flex-shrink-0">
                                    <FaUser className="text-skin-deep text-lg" />
                                </div>

                                {/* Name and Position */}
                                <div>
                                    <h3 className="font-bold text-skin-darkest text-lg">
                                        {member.name}
                                    </h3>
                                    <p className="text-skin-deep text-sm">
                                        {member.position}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Scroll Indicator */}
            <div className="text-center mt-8 md:hidden">
                <p className="text-sm text-skin-medium">
                    ← Swipe to see more thoughts →
                </p>
            </div>
        </section>
    );
}
