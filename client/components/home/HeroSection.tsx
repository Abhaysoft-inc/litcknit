'use client';

import React from 'react';

export default function HeroSection() {
    return (
        <section className="relative w-full h-[calc(100vh-64px)] min-h-[500px] flex items-center justify-center bg-skin-lightest p-4 md:p-8 overflow-hidden">

            {/* Background Texture - Dot Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#4a3f2e 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}>
            </div>

            {/* Main Content Frame - "The Book Cover" Look */}
            <div className="relative z-10 w-full max-w-4xl bg-skin-lighter/30 backdrop-blur-sm border border-skin-base/20 p-2 rounded-sm shadow-xl">

                {/* Inner Border Frame */}
                <div className="border-[3px] border-double border-skin-darker/30 p-8 md:p-12 lg:p-16 text-center relative overflow-hidden rounded-sm">

                    {/* Corner Flourishes */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-skin-darker/40"></div>
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-skin-darker/40"></div>
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-skin-darker/40"></div>
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-skin-darker/40"></div>

                    {/* Content */}
                    <div className="space-y-6 relative z-10">
                        <div className="flex flex-col items-center gap-2">
                            <span className="h-px w-12 bg-skin-darker"></span>
                            <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-skin-darker font-medium">Literary Council</span>
                            <span className="h-px w-12 bg-skin-darker"></span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-skin-darkest font-medium leading-tight tracking-tight">
                            The Art of <br />
                            <span className="italic text-skin-deep relative">
                                Storytelling
                                {/* Underline accent */}
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-skin-base/30 rounded-full transform -rotate-1"></span>
                            </span>
                        </h1>

                        <p className="max-w-lg mx-auto text-base md:text-lg text-skin-darkest/80 font-serif leading-relaxed italic">
                            &ldquo;Words are the voice of the heart.&rdquo;
                        </p>

                        <p className="max-w-md mx-auto text-skin-darker font-sans leading-relaxed text-sm">
                            We are a community dedicated to the craft of writing. Join us to explore, create, and share your unique narrative with the world.
                        </p>

                        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="min-w-[140px] px-6 py-2.5 bg-skin-darkest text-skin-lightest text-sm font-medium tracking-wide hover:bg-skin-deep transition-colors duration-300 shadow-md"
                            >
                                Explore
                            </button>
                            <button
                                onClick={() => document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="min-w-[140px] px-6 py-2.5 bg-transparent border border-skin-darkest text-skin-darkest text-sm font-medium tracking-wide hover:bg-skin-darkest hover:text-skin-lightest transition-all duration-300"
                            >
                                Read
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle background blurred orbs for depth */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-skin-base/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-skin-deep/10 rounded-full blur-[100px] pointer-events-none"></div>

        </section>
    );
}

