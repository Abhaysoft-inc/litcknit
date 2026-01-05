import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'

export default function MembersPage() {
    return (
        <div>
            <Navbar />

            <section className="py-20 px-8 md:px-20 bg-skin-lightest min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif text-skin-darkest mb-6">
                        Our Members
                    </h1>
                    <p className="text-lg text-skin-deep max-w-3xl mb-12">
                        Meet the talented writers, poets, and literary enthusiasts who make up our vibrant community.
                    </p>

                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <p className="text-skin-medium text-center">
                            Members directory coming soon...
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
