'use client';

import Image from 'next/image';


export default function HeroBeigeWithBgImage() {
    return (
        <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-8 md:px-20 py-20 text-skin-deep">

            {/* Background image with transparency */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{
                    backgroundImage:
                        "url('')",
                }}
            ></div>
            <div className="absolute inset-0 bg-skin-lightest/80"></div>

            {/* Main content */}
            <div className="relative z-10 md:w-1/2 space-y-6 text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-serif">
                    Where Words Bloom
                </h1>
                <p className="text-xl text-skin-deep max-w-lg">
                    A canvas for expression — from verse to debate, from stories to shared voices.
                </p>

                <div className="flex justify-center md:justify-start gap-4 mt-4">
                    <button
                        onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-skin hover:bg-skin-deep text-black font-semibold py-3 px-6 rounded-xl shadow-lg transition cursor-pointer hover:text-white"
                    >
                        Explore Events
                    </button>
                    <button
                        onClick={() => document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="border-2 border-skin-deep hover:bg-skin-light text-skin-deep font-semibold py-3 px-6 rounded-xl transition cursor-pointer"
                    >
                        Read Stories
                    </button>
                </div>
            </div>

            {/* Animated Literary Elements */}
            <div className="relative z-10 md:w-1/2 mt-10 md:mt-0 h-96 flex justify-center items-center">

                {/* Quote Bubble 1 */}
                <div className="absolute top-8 left-16 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 max-w-xs transform rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all duration-300 border-l-4 border-skin-base">
                    <p className="text-skin-deep italic font-serif text-sm">
                        "Words are the paintbrush of the soul"
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                        <div className="w-8 h-1 bg-skin-base rounded"></div>
                        <span className="text-xs text-skin-medium">Literary Wisdom</span>
                    </div>
                </div>

                {/* Stats Card */}
                <div className="absolute top-32 right-12 bg-gradient-to-br from-skin-base to-skin-medium text-white shadow-xl rounded-2xl p-6 transform rotate-[4deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
                    <div className="text-center">
                        <div className="text-4xl font-bold font-serif mb-1">500+</div>
                        <div className="text-sm font-semibold">Writers</div>
                        <div className="text-xs opacity-90 mt-1">Active Members</div>
                    </div>
                </div>

                {/* Quote Bubble 2 */}
                <div className="absolute bottom-20 left-8 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 max-w-xs transform rotate-[5deg] hover:rotate-0 hover:scale-105 transition-all duration-300 border-l-4 border-skin-deep">
                    <p className="text-skin-deep italic font-serif text-sm">
                        "Every story deserves to be heard"
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                        <div className="w-8 h-1 bg-skin-deep rounded"></div>
                        <span className="text-xs text-skin-medium">Our Mission</span>
                    </div>
                </div>

                {/* Feature Highlight */}
                <div className="absolute bottom-8 right-20 bg-white shadow-xl rounded-2xl p-5 transform rotate-[-4deg] hover:rotate-0 hover:scale-105 transition-all duration-300 border-2 border-skin-lighter">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-skin-light rounded-full flex items-center justify-center">
                            <span className="text-2xl">✍️</span>
                        </div>
                        <div>
                            <div className="font-bold text-skin-darkest font-serif">Weekly Events</div>
                            <div className="text-xs text-skin-medium">Join & Share</div>
                        </div>
                    </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-16 right-32 w-20 h-20 bg-gradient-to-br from-skin-lighter to-skin-light rounded-full opacity-50 blur-xl animate-pulse"></div>
                <div className="absolute bottom-32 left-32 w-24 h-24 bg-gradient-to-br from-skin-base/30 to-skin-medium/30 rounded-full opacity-40 blur-2xl animate-pulse"></div>

            </div>
        </section>
    );
}

