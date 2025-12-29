import Navbar from '@/components/Navbar'
import HeroSection from '@/components/home/HeroSection'
import ContentTypesSection from '@/components/home/ContentTypesSection'
import TopPostsSection from '@/components/home/TopPostsSection'
import MostLovedSection from '@/components/home/MostLovedSection'
import FeaturedBooksSection from '@/components/home/FeaturedBooksSection'
import EventsCommunitySection from '@/components/home/EventsCommunitySection'
import Footer from '@/components/home/Footer'

export default function Home() {
  // Mock data - replace with actual data later
  const topPosts = [
    { id: 1, title: "The Art of Poetic Expression", author: "Sarah Johnson", likes: 234, category: "Poetry" },
    { id: 2, title: "Modern Literature: A Deep Dive", author: "Michael Chen", likes: 189, category: "Essay" },
    { id: 3, title: "Storytelling in the Digital Age", author: "Emma Williams", likes: 156, category: "Article" },
  ]

  const mostLoved = [
    { id: 1, title: "Midnight Verses", author: "Alex Kumar", hearts: 567, image: "📖" },
    { id: 2, title: "The Last Chapter", author: "Priya Sharma", hearts: 489, image: "✍️" },
    { id: 3, title: "Words Unspoken", author: "John Doe", hearts: 423, image: "🎭" },
  ]

  const featuredBooks = [
    { id: 1, title: "Literary Horizons 2024", author: "Council Editorial", cover: "📚", genre: "Anthology" },
    { id: 2, title: "Voices of Tomorrow", author: "Student Collective", cover: "📕", genre: "Poetry" },
    { id: 3, title: "Chronicles of Creativity", author: "Faculty Members", cover: "📘", genre: "Essays" },
  ]

  const contentTypes = [
    { name: "Poetry", icon: "/quill.png", count: 145 },
    { name: "Short Stories", icon: "📖", count: 89 },
    { name: "Essays", icon: "✍️", count: 67 },
    { name: "Reviews", icon: "⭐", count: 54 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Navbar />
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ContentTypesSection contentTypes={contentTypes} />
        <TopPostsSection posts={topPosts} />
        <MostLovedSection items={mostLoved} />
        <FeaturedBooksSection books={featuredBooks} />
        <EventsCommunitySection />
      </main>

      <Footer />
    </div>
  );

}