"use client"

import React from 'react'
import Image from 'next/image'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const TeamSection = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0)

    const teamMembers = [
        {
            id: 1,
            name: "Aditya Kumar",
            position: "Secretary",
            image: "/team/secretary.jpg",
            thought: "Literature is not just words on paper, it's the heartbeat of our culture and the voice of our generation."
        },
        {
            id: 2,
            name: "Priya Sharma",
            position: "Event Head",
            image: "/team/event-head.jpg",
            thought: "Every event we organize is an opportunity to create memories and inspire minds through the power of words."
        },
        {
            id: 3,
            name: "Rahul Verma",
            position: "Debate Club Head",
            image: "/team/debate-head.jpg",
            thought: "In debate, we don't just argue; we learn to think critically, speak confidently, and respect diverse perspectives."
        },
        {
            id: 4,
            name: "Ananya Singh",
            position: "Kavita Club Head",
            image: "/team/kavita-head.jpg",
            thought: "कविता वो ज़ुबान है जो दिल की बात कहती है, हर शब्द में छुपी है एक अनकही कहानी।"
        },
        {
            id: 5,
            name: "Vikram Malhotra",
            position: "Funtoosh Club Head",
            image: "/team/funtoosh-head.jpg",
            thought: "Laughter and literature go hand in hand. We believe in making learning fun and creativity joyful!"
        },
        {
            id: 6,
            name: "Neha Kapoor",
            position: "Bookpool Club Head",
            image: "/team/bookpool-head.jpg",
            thought: "Books are treasures waiting to be discovered. Our mission is to connect readers with stories that change lives."
        },
        {
            id: 7,
            name: "Arjun Reddy",
            position: "Content Head",
            image: "/team/content-head.jpg",
            thought: "Content is king, but creativity is the kingdom. We craft stories that resonate and inspire action."
        },
        {
            id: 8,
            name: "Meera Nair",
            position: "Design & Media Head",
            image: "/team/media-head.jpg",
            thought: "Design is where art meets purpose. Every visual we create tells a story and amplifies our literary voice."
        }
    ]

    // Typically 3-4 cards visible at once depending on screen size
    // Limit scrolling so we don't see blank space
    const visibleCards = 3
    const maxIndex = Math.max(0, teamMembers.length - visibleCards)

    const nextSlide = () => {
        setCurrentIndex((prev) => {
            if (prev >= maxIndex) {
                return prev // Don't scroll past the point where last cards are visible
            }
            return prev + 1
        })
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => {
            if (prev <= 0) {
                return prev // Don't go before the first card
            }
            return prev - 1
        })
    }

    return (
        <section className="w-full py-16 px-8 md:px-20 bg-gradient-to-b from-beige-light to-tan-light">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-serif text-skin-deep mb-3">
                        Meet Our Council
                    </h2>
                    <p className="text-lg text-tan-dark max-w-2xl mx-auto">
                        The passionate minds leading our literary journey
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Cards Container */}
                    <div className="overflow-hidden p-4">
                        <div
                            className="flex transition-transform duration-500 ease-out gap-5"
                            style={{
                                transform: `translateX(-${currentIndex * (260 + 20)}px)`
                            }}
                        >
                            {/* Original cards */}
                            {teamMembers.map((member) => (
                                <div
                                    key={member.id}
                                    className="flex-shrink-0 w-64"
                                >
                                    {/* Card Design */}
                                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full border border-tan-dark/10">

                                        {/* Top section with image */}
                                        <div className="relative h-36 bg-tan-light/50 p-4 flex items-center justify-center">

                                            {/* Image */}
                                            <div className="relative">
                                                <div className="w-24 h-24 relative">
                                                    {/* Subtle shadow behind image */}
                                                    <div className="absolute inset-0 bg-tan-dark/10 rounded-full blur-lg"></div>
                                                    <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-white shadow-xl transform hover:scale-105 transition-transform duration-300">
                                                        <Image
                                                            src={member.image}
                                                            alt={member.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content section */}
                                        <div className="p-4 flex flex-col">
                                            {/* Name and Position */}
                                            <div className="text-center mb-3">
                                                <h3 className="text-lg font-serif text-skin-deep font-bold mb-1">
                                                    {member.name}
                                                </h3>
                                                <div className="inline-block px-3 py-1 bg-tan-light border border-tan-dark/20 text-tan-dark text-xs font-semibold rounded-lg uppercase tracking-wider">
                                                    {member.position}
                                                </div>
                                            </div>

                                            {/* Quote section */}
                                            <div className="flex flex-col justify-center relative mb-3">
                                                <FaQuoteLeft className="text-lg text-tan-dark/20 mb-2" />
                                                <p className="text-xs text-tan-dark text-center leading-relaxed italic line-clamp-3">
                                                    {member.thought}
                                                </p>
                                            </div>

                                            {/* Decorative bottom element */}
                                            <div className="flex justify-center gap-2">
                                                {[...Array(3)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-2 h-2 rounded-full bg-skin-deep"
                                                        style={{ opacity: 1 - i * 0.3 }}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 md:p-4 rounded-full shadow-lg transition-all duration-300 z-20 ${currentIndex === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                            : 'bg-white hover:bg-skin-light text-skin-deep hover:text-white'
                            }`}
                        aria-label="Previous member"
                    >
                        <FaChevronLeft className="text-sm md:text-xl" />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={currentIndex === maxIndex}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 md:p-4 rounded-full shadow-lg transition-all duration-300 z-20 ${currentIndex === maxIndex
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                            : 'bg-white hover:bg-skin-light text-skin-deep hover:text-white'
                            }`}
                        aria-label="Next member"
                    >
                        <FaChevronRight className="text-sm md:text-xl" />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-12">
                    {teamMembers.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`transition-all duration-300 rounded-full ${index === currentIndex
                                ? 'w-8 h-3 bg-skin-deep'
                                : 'w-3 h-3 bg-tan-dark/30 hover:bg-tan-dark/50'
                                }`}
                            aria-label={`Go to member ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-5">
                <p className="text-tan-dark mb-6 text-lg">
                    Want to meet all our talented members?
                </p>
                <button className="bg-skin-light hover:bg-skin-deep text-beige-light font-semibold py-3 px-8 rounded-xl transition-colors duration-300 shadow-lg">
                    View All Members
                </button>
            </div>

        </section >
    )
}

export default TeamSection
