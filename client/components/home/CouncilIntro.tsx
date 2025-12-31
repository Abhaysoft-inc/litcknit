import { FaQuoteLeft } from 'react-icons/fa'

export default function CouncilIntro() {
    return (
        <section className="mb-16">
            <div className="bg-[#f5e6d3] border border-[#e8d4bd] rounded-lg p-8 md:p-12 shadow-sm">
                <div className="max-w-4xl mx-auto text-center">
                    <FaQuoteLeft className="w-8 h-8 text-[#8b7355] mx-auto mb-6 opacity-40" />

                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        About the Literary Council
                    </h2>

                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        The Literary Council of KNIT Sultanpur is a vibrant community dedicated to nurturing creativity,
                        fostering literary excellence, and celebrating the written word. We bring together aspiring writers,
                        poets, and literature enthusiasts to share their craft and inspire one another.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white rounded-lg p-4 border border-[#e8d4bd]">
                            <div className="text-3xl font-bold text-[#8b7355] mb-2">500+</div>
                            <div className="text-sm text-gray-600">Active Members</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-[#e8d4bd]">
                            <div className="text-3xl font-bold text-[#8b7355] mb-2">50+</div>
                            <div className="text-sm text-gray-600">Events Annually</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-[#e8d4bd]">
                            <div className="text-3xl font-bold text-[#8b7355] mb-2">1000+</div>
                            <div className="text-sm text-gray-600">Published Works</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
