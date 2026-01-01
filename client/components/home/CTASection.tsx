import React from 'react'

const CTASection = () => {
    return (
        <section className="w-full py-12 px-8 md:px-20 bg-skin-deep">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-serif text-beige-light mb-4">
                    Join Our Literary Community
                </h2>
                <p className="text-tan-light mb-8">
                    Be part of a vibrant community of writers, poets, and book lovers
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-beige-light text-skin-deep rounded-full font-semibold hover:bg-tan-light transition-all duration-300">
                        Join the Council
                    </button>
                    <button className="px-8 py-3 bg-transparent border-2 border-beige-light text-beige-light rounded-full font-semibold hover:bg-beige-light hover:text-skin-deep transition-all duration-300">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CTASection
