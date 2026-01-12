'use client';

import React from 'react';

export default function HeroSection() {
    return (
        <section className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-skin-lightest flex flex-col items-center justify-center">

            {/* Background Texture - Abstract Lines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-skin-darker/10 to-transparent"></div>
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-skin-darker/10 to-transparent"></div>
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-skin-darker/10 to-transparent"></div>
                <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-skin-darker/10 to-transparent"></div>
            </div>

            <div className="container max-w-6xl mx-auto px-6 relative z-10 text-center">

                {/* Top Label */}
                <p className="font-sans text-xs md:text-sm font-bold tracking-[0.5em] text-skin-medium uppercase mb-4 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                </p>

                {/* Massive Typography */}
                <h1 className="flex flex-col items-center justify-center font-serif font-black text-skin-darkest leading-none tracking-tighter cursor-default select-none">
                    <span className="text-[12vw] md:text-[10vw] hover:text-skin-deep transition-colors duration-500 animate-in zoom-in-95 duration-1000">
                        LITERARY
                    </span>
                    <span className="flex items-center gap-2 md:gap-6 text-[12vw] md:text-[10vw] -mt-2 md:-mt-6 animate-in zoom-in-95 duration-1000 delay-150">
                        <span className="h-1.5 md:h-3 w-12 md:w-32 bg-skin-base/40 rounded-full"></span>
                        <span className="italic text-skin-medium hover:text-skin-darkest transition-colors duration-500">COUNCIL</span>
                        <span className="h-1.5 md:h-3 w-12 md:w-32 bg-skin-base/40 rounded-full"></span>
                    </span>
                    <span className="text-[5vw] md:text-[3vw] font-sans font-light tracking-[0.2em] text-skin-darker mt-4 md:mt-6 border-t border-b border-skin-base/20 py-2 md:py-4 w-full max-w-4xl animate-in fade-in duration-1000 delay-300">
                        KNIT SULTANPUR
                    </span>
                </h1>

                {/* Description */}
                <p className="max-w-xl mx-auto mt-8 md:mt-12 text-base md:text-lg text-skin-darker/80 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                    Where ink meets soul. Join the premier community of writers, poets, and storytellers.
                </p>

                {/* Actions */}
                <div className="mt-10 md:mt-14 flex items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
                    <button
                        onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group flex items-center gap-2 text-skin-darkest font-bold tracking-wider hover:text-skin-deep transition-colors text-sm md:text-base"
                    >
                        <span className="border-b-2 border-skin-darkest group-hover:border-skin-deep pb-0.5 transition-colors">EXPLORE EVENTS</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>

                    <button
                        onClick={() => document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group flex items-center gap-2 text-skin-darker/70 font-bold tracking-wider hover:text-skin-darkest transition-colors text-sm md:text-base"
                    >
                        <span className="hover:border-b-2 hover:border-skin-darkest pb-0.5 transition-all">Latest Posts</span>
                    </button>
                </div>

            </div>

            {/* Decorative Corner Watermark */}
            <div className="absolute -bottom-12 -left-12 text-[15rem] font-serif text-skin-lighter/30 font-black pointer-events-none select-none italic leading-none opacity-50">
                Lc
            </div>

            {/* Decorative Top Right Watermark */}
            <div className="absolute -top-12 -right-12 text-[15rem] font-serif text-skin-lighter/30 font-black pointer-events-none select-none italic leading-none opacity-50 rotate-180">
                Lc
            </div>

        </section>
    );
}

