import Navbar from '@/components/Navbar'
import HeroSection from '@/components/home/HeroSection'
import CouncilIntro from '@/components/home/CouncilIntro'
import UpcomingEventsCarousel from '@/components/home/UpcomingEventsCarousel'
import ThisWeekTopSection from '@/components/home/ThisWeekTopSection'
import CouncilHeadsSection from '@/components/home/CouncilHeadsSection'
import TopPostsSection from '@/components/home/TopPostsSection'
import MostLovedSection from '@/components/home/MostLovedSection'
import FeaturedBooksSection from '@/components/home/FeaturedBooksSection'
import EventsCommunitySection from '@/components/home/EventsCommunitySection'
import Footer from '@/components/home/Footer'

export default function Home() {
  // Mock data - replace with actual data later
  const topPosts = [
    { id: 1, title: "The Art of Poetic Expression", author: "Sarah Johnson", likes: 234, category: "Poetry", excerpt: "Exploring the depths of emotional expression through verse and rhythm...", readTime: "5 min" },
    { id: 2, title: "Modern Literature: A Deep Dive", author: "Michael Chen", likes: 189, category: "Essay", excerpt: "An analytical journey through contemporary literary movements...", readTime: "8 min" },
    { id: 3, title: "Storytelling in the Digital Age", author: "Emma Williams", likes: 156, category: "Article", excerpt: "How technology reshapes narrative structures and reader engagement...", readTime: "6 min" },
    { id: 4, title: "Sonnets of Silence", author: "Raj Patel", likes: 298, category: "Poetry", excerpt: "A collection of intimate reflections on solitude and self-discovery...", readTime: "4 min" },
    { id: 5, title: "The Writer's Journey", author: "Lisa Anderson", likes: 245, category: "Essay", excerpt: "Personal insights into the creative process and overcoming writer's block...", readTime: "7 min" },
    { id: 6, title: "Metaphors in Motion", author: "Ananya Gupta", likes: 312, category: "Poetry", excerpt: "Dancing words that paint pictures in the reader's mind...", readTime: "3 min" },
  ]

  const mostLoved = [
    { id: 1, title: "Midnight Verses", author: "Alex Kumar", hearts: 567, icon: "book", color: "from-purple-200 to-pink-200" },
    { id: 2, title: "The Last Chapter", author: "Priya Sharma", hearts: 489, icon: "pen", color: "from-blue-200 to-cyan-200" },
    { id: 3, title: "Words Unspoken", author: "John Doe", hearts: 423, icon: "theater", color: "from-amber-200 to-orange-200" },
    { id: 4, title: "Echoes of Yesterday", author: "Maria Garcia", hearts: 398, icon: "moon", color: "from-indigo-200 to-purple-200" },
    { id: 5, title: "Urban Legends", author: "David Kim", hearts: 356, icon: "city", color: "from-slate-200 to-gray-200" },
    { id: 6, title: "Nature's Whisper", author: "Elena Popov", hearts: 445, icon: "leaf", color: "from-green-200 to-emerald-200" },
  ]

  const featuredBooks = [
    { id: 1, title: "Literary Horizons 2024", author: "Council Editorial", cover: "book", genre: "Anthology", pages: 342 },
    { id: 2, title: "Voices of Tomorrow", author: "Student Collective", cover: "book-open", genre: "Poetry", pages: 156 },
    { id: 3, title: "Chronicles of Creativity", author: "Faculty Members", cover: "book-reader", genre: "Essays", pages: 289 },
    { id: 4, title: "Timeless Tales", author: "Heritage Committee", cover: "bookmark", genre: "Stories", pages: 412 },
  ]

  const weeklyTopPosts = [
    { id: 1, title: "The Symphony of Silence", author: "Arjun Mehta", views: 8234, category: "Poetry", rank: 1 },
    { id: 2, title: "Reimagining Classical Literature", author: "Sophia Turner", views: 6890, category: "Essay", rank: 2 },
    { id: 3, title: "Fragments of Memory", author: "James Wilson", views: 5421, category: "Short Story", rank: 3 },
    { id: 4, title: "Digital Age Narratives", author: "Priya Singh", views: 4567, category: "Article", rank: 4 },
    { id: 5, title: "Words That Heal", author: "Maria Santos", views: 3892, category: "Poetry", rank: 5 },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Poetry Slam Night",
      date: "Jan 15 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Main Auditorium, KNIT",
      description: "Join us for an evening of powerful poetry performances. Share your original work or enjoy performances from talented poets across campus.",
      category: "Poetry"
    },
    {
      id: 2,
      title: "Creative Writing Workshop",
      date: "Jan 22 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Library Seminar Hall",
      description: "Learn the art of storytelling from published authors. Workshop covers character development, plot structure, and narrative techniques.",
      category: "Workshop"
    },
    {
      id: 3,
      title: "Book Launch: Voices of Tomorrow",
      date: "Feb 05 2025",
      time: "4:00 PM - 6:00 PM",
      location: "Council Hall",
      description: "Celebrate the launch of our annual anthology featuring works from student writers. Meet the authors and get your signed copy.",
      category: "Book Launch"
    },
  ]

  const councilHeads = [
    {
      id: 1,
      name: "Dr. Aisha Rahman",
      position: "President, Literary Council",
      thought: "Literature is not just words on paper; it's the heartbeat of our culture, the mirror of our society, and the window to our collective soul.",
      avatar: "user-graduate",
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: 2,
      name: "Prof. Vikram Patel",
      position: "Head of Publications",
      thought: "Every writer has a unique voice waiting to be heard. Our mission is to amplify those voices.",
      avatar: "user-tie",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 3,
      name: "Ms. Elena Rodriguez",
      position: "Creative Director",
      thought: "Creativity knows no bounds. Let your imagination soar and your pen dance freely.",
      avatar: "user",
      color: "from-pink-500 to-rose-600"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Navbar />
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* <CouncilIntro /> */}
        <UpcomingEventsCarousel events={upcomingEvents} />
        <ThisWeekTopSection posts={weeklyTopPosts} />
        <CouncilHeadsSection heads={councilHeads} />
        <MostLovedSection items={mostLoved} />
        <TopPostsSection posts={topPosts} />
        <FeaturedBooksSection books={featuredBooks} />
        <EventsCommunitySection />
      </main>

      <Footer />
    </div>
  );

}