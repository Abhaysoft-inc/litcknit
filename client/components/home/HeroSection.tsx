import { GiFeather } from 'react-icons/gi'

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="text-center">
                    <GiFeather className="w-16 h-16 mx-auto mb-6 animate-pulse" />
                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Welcome to Literary Council
                    </h1>
                    <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto mb-8 font-light">
                        Where words weave stories, and imagination knows no bounds
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-white text-amber-900 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition shadow-lg cursor-pointer">
                            Explore Works
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-900 transition cursor-pointer">
                            Join Community
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-50 to-transparent"></div>
        </section>
    )
}
