import React from 'react'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'

const LoadingState = () => {
    return (
        <div className="min-h-screen bg-skin-lightest">
            <Navbar />
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-skin-deep mx-auto mb-4"></div>
                    <p className="text-skin-darker text-lg">Loading event details...</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoadingState
