import CTASection from '@/components/home/CTASection'
import EventsSection from '@/components/home/EventsSection'
import Footer from '@/components/home/Footer'
import HeroSection from '@/components/home/HeroSection'
import Navbar from '@/components/home/Navbar'
import PostsSection from '@/components/home/PostsSection'
import TeamSection from '@/components/home/TeamSection'
import TopSection from '@/components/home/TopSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className="mainbar">
        {/* Navbar */}

        <Navbar />

        {/* Hero Section */}

        <HeroSection />

        {/* This Week's Top */}
        <TopSection />

        {/* Events */}
        <EventsSection />
        {/* Posts */}
        <PostsSection />

        <TeamSection />

        {/* CTA */}
        <CTASection />
        {/* Footer */}
        <Footer />

      </div>
    </div>
  )
}

export default page