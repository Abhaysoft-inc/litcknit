import { GiFeather } from 'react-icons/gi'
import { FaPen, FaBookOpen, FaQuoteLeft } from 'react-icons/fa'

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#f5e6d3] border-b-2 border-[#e8d4bd]">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#8b7355] rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-[#8b7355] rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-[#8b7355] rotate-45"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="text-center">
                    {/* Icon Group */}
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <FaPen className="w-8 h-8 md:w-10 md:h-10 text-[#8b7355] animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
                        <GiFeather className="w-12 h-12 md:w-16 md:h-16 text-[#8b7355]" />
                        <FaBookOpen className="w-8 h-8 md:w-10 md:h-10 text-[#8b7355] animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
                    </div>

                    {/* Main Heading */}
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-900">
                        Literary Council
                    </h1>
                    <p className="text-lg md:text-xl text-[#8b7355] font-semibold mb-6">
                        KNIT Sultanpur
                    </p>

                    {/* Quote */}
                    <div className="max-w-3xl mx-auto mb-8 relative">
                        <FaQuoteLeft className="absolute -left-4 -top-2 w-6 h-6 text-[#8b7355] opacity-30" />
                        <p className="font-serif text-xl md:text-2xl text-gray-700 italic leading-relaxed">
                            Where words weave stories, imagination knows no bounds,
                            <br />
                            and every voice finds its home
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-[#8b7355] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#6d5a43] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            Explore Works
                        </button>
                        <button className="border-2 border-[#8b7355] text-[#8b7355] px-8 py-3 rounded-lg font-semibold hover:bg-[#8b7355] hover:text-white transition-all">
                            Join Community
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg p-4 border border-[#e8d4bd] shadow-sm">
                            <div className="text-2xl md:text-3xl font-bold text-[#8b7355]">500+</div>
                            <div className="text-xs md:text-sm text-gray-600">Members</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-[#e8d4bd] shadow-sm">
                            <div className="text-2xl md:text-3xl font-bold text-[#8b7355]">1000+</div>
                            <div className="text-xs md:text-sm text-gray-600">Published</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-[#e8d4bd] shadow-sm">
                            <div className="text-2xl md:text-3xl font-bold text-[#8b7355]">50+</div>
                            <div className="text-xs md:text-sm text-gray-600">Events</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
