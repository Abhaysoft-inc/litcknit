import { FaChartLine, FaHeart, FaClock } from 'react-icons/fa'

interface Post {
    id: number
    title: string
    author: string
    likes: number
    category: string
    excerpt: string
    readTime: string
}

interface TopPostsSectionProps {
    posts: Post[]
}

export default function TopPostsSection({ posts }: TopPostsSectionProps) {
    return (
        <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <FaChartLine className="w-8 h-8 text-amber-600 mr-3" />
                    <h2 className="font-serif text-4xl font-bold text-gray-900">Trending Posts</h2>
                </div>
                <button className="text-amber-600 font-semibold hover:text-amber-700 transition">
                    View All →
                </button>
            </div>

            {/* Masonry-style grid layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <div
                        key={post.id}
                        className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 
                        ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                        ${index === 3 ? 'lg:col-span-2' : ''}`}
                    >
                        {/* Gradient header based on category */}
                        <div className={`h-32 bg-gradient-to-br ${post.category === 'Poetry' ? 'from-purple-400 to-pink-500' :
                                post.category === 'Essay' ? 'from-blue-400 to-cyan-500' :
                                    'from-amber-400 to-orange-500'
                            } relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span className="text-xs font-bold text-gray-800">{post.category}</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-700 font-medium">by {post.author}</p>
                                <div className="flex items-center gap-3 text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <FaClock className="w-3 h-3" />
                                        <span className="text-xs">{post.readTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaHeart className="w-4 h-4 text-rose-500" />
                                        <span className="text-sm font-semibold">{post.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
