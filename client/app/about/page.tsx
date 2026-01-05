import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import { FaBook, FaPen, FaUsers, FaLightbulb, FaHeart, FaQuoteLeft } from 'react-icons/fa'

export default function AboutPage() {
    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-32 px-8 md:px-20 bg-gradient-to-br from-skin-lightest via-skin-lighter to-skin-light overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-skin-base rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-skin-medium rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <FaBook className="w-16 h-16 text-skin-base mx-auto mb-6" />
                    <h1 className="text-5xl md:text-6xl font-serif text-skin-darkest mb-6">
                        About Literary Council
                    </h1>
                    <p className="text-xl text-skin-deep leading-relaxed">
                        Where words come alive, ideas flourish, and creativity knows no bounds.
                        We are a community of passionate readers, writers, and storytellers.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 px-8 md:px-20 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block bg-skin-lighter px-4 py-2 rounded-full text-skin-deep font-semibold text-sm mb-4">
                                Our Journey
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif text-skin-darkest mb-6">
                                A Story Written Together
                            </h2>
                            <p className="text-skin-medium leading-relaxed mb-4 text-lg">
                                The Literary Council at KNIT Sultanpur was founded with a vision to create a space where words come alive,
                                ideas flourish, and creativity knows no bounds.
                            </p>
                            <p className="text-skin-medium leading-relaxed text-lg">
                                Through our events, workshops, and publications, we aim to nurture literary talent, encourage creative
                                expression, and foster a deep appreciation for the written word.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-skin-base to-skin-deep rounded-3xl p-12 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
                                <FaQuoteLeft className="text-6xl text-white/30 mb-6" />
                                <p className="text-2xl font-serif leading-relaxed relative z-10">
                                    Literature is not just words on paper; it's the heartbeat of our culture and the voice of our generation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-8 md:px-20 bg-skin-lightest">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-skin-darkest mb-4">
                            Mission & Vision
                        </h2>
                        <p className="text-lg text-skin-deep max-w-2xl mx-auto">
                            Guiding principles that drive everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-skin-base">
                            <div className="w-16 h-16 bg-gradient-to-br from-skin-base to-skin-medium rounded-2xl flex items-center justify-center mb-6">
                                <FaLightbulb className="text-3xl text-white" />
                            </div>
                            <h3 className="text-2xl font-serif text-skin-darkest mb-4">Our Vision</h3>
                            <p className="text-skin-medium leading-relaxed text-lg">
                                To be the leading literary platform that inspires, educates, and empowers individuals through the transformative power of words and creative expression.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-skin-deep">
                            <div className="w-16 h-16 bg-gradient-to-br from-skin-medium to-skin-deep rounded-2xl flex items-center justify-center mb-6">
                                <FaHeart className="text-3xl text-white" />
                            </div>
                            <h3 className="text-2xl font-serif text-skin-darkest mb-4">Our Mission</h3>
                            <p className="text-skin-medium leading-relaxed text-lg">
                                To build a vibrant literary community that celebrates diversity, encourages dialogue, and promotes the art of storytelling in all its forms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-20 px-8 md:px-20 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-skin-darkest mb-4">
                            What We Do
                        </h2>
                        <p className="text-lg text-skin-deep max-w-2xl mx-auto">
                            Bringing the literary community together through various initiatives
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group bg-gradient-to-br from-skin-lightest to-skin-lighter rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-skin-base rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FaPen className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-serif text-skin-darkest mb-3">Creative Workshops</h3>
                            <p className="text-skin-medium leading-relaxed">
                                Conduct creative writing workshops, masterclasses, and skill-building sessions with renowned authors.
                            </p>
                        </div>

                        <div className="group bg-gradient-to-br from-skin-lightest to-skin-lighter rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-skin-medium rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FaUsers className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-serif text-skin-darkest mb-3">Literary Events</h3>
                            <p className="text-skin-medium leading-relaxed">
                                Organize poetry nights, storytelling sessions, debates, and cultural programs celebrating literature.
                            </p>
                        </div>

                        <div className="group bg-gradient-to-br from-skin-lightest to-skin-lighter rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-14 h-14 bg-skin-deep rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FaBook className="text-2xl text-white" />
                            </div>
                            <h3 className="text-xl font-serif text-skin-darkest mb-3">Publications</h3>
                            <p className="text-skin-medium leading-relaxed">
                                Publish student works, maintain a literary magazine, and host book clubs and reading circles.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 bg-skin-lighter rounded-2xl p-8 border-l-4 border-skin-base">
                        <h3 className="text-xl font-serif text-skin-darkest mb-4">And much more...</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-skin-medium">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-skin-base rounded-full"></div>
                                <span>Inter-college competitions</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-skin-base rounded-full"></div>
                                <span>Guest speaker sessions</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-skin-base rounded-full"></div>
                                <span>Literary magazine publications</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-skin-base rounded-full"></div>
                                <span>Collaborations with literary societies</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-8 md:px-20 bg-gradient-to-br from-skin-base to-skin-deep text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">
                        Join Our Literary Family
                    </h2>
                    <p className="text-xl mb-8 text-white/90">
                        Be part of a community that celebrates creativity, diversity, and the power of words
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-white text-skin-deep font-semibold px-8 py-4 rounded-xl hover:bg-skin-lightest transition-all shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            Get in Touch
                        </a>
                        <a
                            href="/"
                            className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
                        >
                            Explore Events
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
