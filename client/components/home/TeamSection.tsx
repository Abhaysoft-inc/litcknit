'use client';

import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaUser } from 'react-icons/fa';
import { useRef } from 'react';
import Image from 'next/image';

interface TeamMember {
    id: number;
    name: string;
    position: string;
    thought: string;
    image?: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Vaibhav Pandey",
        position: "Secretary, Literary Council",
        thought: "Always go all in, I dont' believe in half efforts.",
        image: "/vaibhav-pandey.jpg"
    },
    {
        id: 2,
        name: "Anushka Shekhar",
        position: "Secretary, Literary Council",
        thought: "From fixing commas to negotiating deadlines better than a diplomat, I, as a secretary, throughly beleive that each one of us is a story in movement, and it is a privilege for me to collect and bring these stories into the spotlight.",
        image: "/anushka-shekhar.jpg"
    },
    {
        id: 3,
        name: "Piyush Pandey",
        position: "Event Head",
        thought: "There is nothing in the world so irresistibly contagious as laughter and good humor",
        image: "/piyush-pandey.jpg"
    },
    {
        id: 4,
        name: "Sankalp Tiwari",
        position: "Event Head",
        thought: "परम सत्य शाश्वत है!! ध्यान ही जीवन का आंतरिक उत्तर है!!",
        image: ""
    },
    {
        id: 5,
        name: "Aniket Singh",
        position: "Debate Club Head",
        thought: "The world is built by those who dare to begin. One idea, one breath, one brave step – that's all it takes to awaken your extraordinary.",
        image: ""
    },
    {
        id: 6,
        name: "Udichi Srivastava",
        position: "Debate Club Head",
        thought: "I'm a person who can politely ask, “but why though?” and somehow turn a simple statement into a thoughtful exploration of perspectives. I enjoy the gentle chaos of conversations where everyone feels heard. And, debate simply is my favourite way to think out loud, with company.",
        image: ""
    },
    {
        id: 7,
        name: "Siddharth Rao",
        position: "Kavita Club Head",
        thought: "अविरत साधना, और लेखन के श्रम से, सुंदर अभिव्यक्ति की कला आती है।",
        image: ""
    },
    {
        id: 8,
        name: "Shambhavi Keshri",
        position: "Kavita Club Head",
        thought: "To me, poetry is shaped not by perfect lines but by honest moments, those small breaths and quiet pauses where a feeling finally learns to speak. Through poetry, I hope these quiet truths bring comfort and connection to those who hear them.",
        image: ""
    },
    {
        id: 9,
        name: "Mudit Gupta",
        position: "Funtoosh Club Head",
        thought: "I used to believe that life, at its core, took strength, but really it takes will. Will to paint every canvas with colours of joy, to enunciate every thought, every feeling with words unheard and to weave a tapestry of memories, woven by lots of fun. And that's what we're here for.",
        image: ""
    },
    {
        id: 10,
        name: "Aadya Srivastava",
        position: "Funtoosh Club Head",
        thought: "I love seeing the world from other people's perspective, whether it is through books, music, art or thoughtful conversations. It helps me understand the world and the people in it a little better. Through Funtoosh, I get to create safe spaces where we converse, laugh, and see the world a little differently together.",
        image: ""
    },
    {
        id: 11,
        name: "Yugank Gupta",
        position: "Bookpool Club Head",
        thought: "We are such stuff as dreams are made on, and our little life is rounded with a sleep.",
        image: ""
    },
    {
        id: 12,
        name: "Alankrit Srivastava",
        position: "Content Head",
        thought: "Just a guy who found himself falling up.",
        image: ""
    },
    {
        id: 13,
        name: "Arushi Mishra",
        position: "Content Head",
        thought: "Baldwin once said, 'Not everything that is faced can be changed, but nothing can be changed until it is faced.' That's my philosophy with content – confront the real, say what needs to be said, and do it with clarity and conviction. I believe in messages that matter, narratives that challenge, and content that leaves people thinking long after they've engaged with it.",
        image: ""
    },
    {
        id: 14,
        name: "Suryansh Prakash",
        position: "Design and Media Head",
        thought: "I turn ideas into art and emotions into verses. Half designer, half poet, fully obsessed with creating something that feels.",
        image: ""
    },
    {
        id: 15,
        name: "Shubhi Maurya",
        position: "Design and Media Head",
        thought: "I believe design begins in observation – in colours that comfort, spaces that breathe, and details that guide us gently. Through this responsibility, I hope to shape experiences that feel both thoughtful and human.",
        image: ""
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
                    className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-4 py-8"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative group overflow-hidden border-t-4 border-skin-base"
                        >
                            <div className="p-8 flex flex-col items-center text-center h-full">
                                {/* Image/Avatar */}
                                <div className="mb-6 relative">
                                    <div className="w-24 h-24 relative rounded-full bg-skin-light border-4 border-white shadow-md flex items-center justify-center overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-300">
                                        {member.image ? (
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover rounded-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-skin-light to-skin-base flex items-center justify-center">
                                                <span className="text-2xl font-serif text-skin-deep font-bold">
                                                    {member.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-skin-deep text-white p-2 rounded-full shadow-sm">
                                        <FaQuoteLeft className="w-3 h-3" />
                                    </div>
                                </div>

                                {/* Name & Position */}
                                <div className="mb-6">
                                    <h3 className="font-serif font-bold text-xl text-skin-darkest mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-skin-deep text-sm font-medium tracking-wide uppercase">
                                        {member.position}
                                    </p>
                                </div>

                                {/* Thought */}
                                <div className="relative">
                                    <p className="text-gray-600 italic text-sm leading-relaxed">
                                        &quot;{member.thought}&quot;
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
