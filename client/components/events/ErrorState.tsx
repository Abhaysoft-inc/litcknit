import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'

interface ErrorStateProps {
    error: string | null
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
    return (
        <div className="min-h-screen bg-skin-lightest">
            <Navbar />
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                    <h2 className="text-3xl font-serif text-skin-deep mb-4">Event Not Found</h2>
                    <p className="text-skin-darker mb-6">{error || 'The event you are looking for does not exist.'}</p>
                    <Link
                        href="/events"
                        className="inline-block bg-skin-deep text-white font-semibold py-3 px-8 rounded-xl hover:bg-skin-darker transition-colors duration-300"
                    >
                        Back to Events
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ErrorState
