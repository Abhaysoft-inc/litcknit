'use client';

import Image from 'next/image';


export default function HeroBeigeWithBgImage() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-skin-lightest to-skin-light">

            {/* Animated Floating Words Background */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-20 left-10 text-6xl font-serif text-skin-deep animate-float">Poetry</div>
                <div className="absolute top-40 right-20 text-4xl font-serif text-skin-medium animate-float-delay-1">Stories</div>
                <div className="absolute bottom-40 left-1/4 text-5xl font-serif text-skin-base animate-float-delay-2">Words</div>
                <div className="absolute bottom-20 right-1/3 text-3xl font-serif text-skin-darker animate-float-delay-3">Dreams</div>
                <div className="absolute top-1/3 left-1/2 text-4xl font-serif text-skin-light animate-float-delay-4">Create</div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-6xl mx-auto px-8 py-20 text-center">

                {/* Tagline Badge */}
                <div className="inline-block mb-6">
                    <span className="bg-skin-deep/10 text-skin-darkest px-6 py-2 rounded-full text-sm font-semibold border-2 border-skin-base">
                        Literary Council KNIT Sultanpur
                    </span>
                </div>

                {/* Main Heading - Stacked Style */}
                <h1 className="space-y-2 mb-8">
                    <div className="text-4xl md:text-6xl lg:text-7xl font-serif text-skin-darkest font-bold">
                        Unleash Your
                    </div>
                    <div className="text-5xl md:text-7xl lg:text-8xl font-serif text-skin-deep font-bold italic">
                        Creative Voice
                    </div>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-skin-darker max-w-2xl mx-auto mb-10 leading-relaxed">
                    Join a vibrant community of writers, poets, and storytellers.
                    Where imagination meets expression, and every voice finds its stage.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <button
                        onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-skin-deep hover:bg-skin-darker text-white font-semibold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                        Explore Events
                    </button>
                    <button
                        onClick={() => document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-white hover:bg-skin-lighter text-skin-darkest font-semibold py-4 px-8 rounded-full shadow-lg transition-all duration-300 border-2 border-skin-base"
                    >
                        Read Latest Posts
                    </button>
                </div>



            </div>

            {/* Decorative Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-skin-light to-transparent"></div>

        </section>
    );
}

