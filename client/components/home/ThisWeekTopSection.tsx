import { FaTrophy, FaFire, FaEye } from 'react-icons/fa'

interface WeeklyPost {
    id: number
    title: string
    author: string
    views: number
    category: string
    rank: number
}

interface ThisWeekTopSectionProps {
    posts: WeeklyPost[]
}

export default function ThisWeekTopSection({ posts }: ThisWeekTopSectionProps) {
    return (
        <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <FaTrophy className="w-8 h-8 text-yellow-500 mr-3" />
                    <h2 className="font-serif text-4xl font-bold text-gray-900">This Week&apos;s Top</h2>
                </div>
                <div className="flex items-center gap-2 text-amber-600">
                    <FaFire className="w-5 h-5" />
                    <span className="font-semibold">Hot Right Now</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Top Post - Featured Large Card */}
                {posts[0] && (
                    <div className="md:row-span-2 bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-500 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                        <div className="relative h-full min-h-[400px] p-8 flex flex-col justify-between">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16"></div>

                            {/* Rank Badge */}
                            <div className="relative">
                                <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                                    <FaTrophy className="w-5 h-5 text-yellow-600" />
                                    <span className="font-bold text-gray-900">#1 This Week</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative text-white">
                                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-4">
                                    {posts[0].category}
                                </span>
                                <h3 className="font-serif text-3xl font-bold mb-3 line-clamp-3 group-hover:text-amber-100 transition-colors">
                                    {posts[0].title}
                                </h3>
                                <p className="text-amber-100 mb-4">by {posts[0].author}</p>
                                <div className="flex items-center gap-2 text-white/90">
                                    <FaEye className="w-4 h-4" />
                                    <span className="font-semibold">{posts[0].views.toLocaleString()} views</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Remaining Top Posts */}
                {posts.slice(1).map((post) => (
                    <div
                        key={post.id}
                        className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border-2 border-transparent hover:border-amber-300"
                    >
                        <div className="flex items-start gap-4">
                            {/* Rank Number */}
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${post.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                                post.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-amber-600 text-white' :
                                    'bg-gradient-to-br from-amber-200 to-orange-200 text-amber-900'
                                }`}>
                                #{post.rank}
                            </div>

                            {/* Post Info */}
                            <div className="flex-1">
                                <span className="inline-block text-xs font-medium text-[#8b7355] bg-white px-2 py-0.5 rounded-full mb-2">
                                    {post.category}
                                </span>
                                <h3 className="font-serif text-base font-bold text-gray-900 mb-2 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-xs text-gray-600 mb-2">by {post.author}</p>
                                <div className="flex items-center gap-1 text-gray-500">
                                    <FaEye className="w-3 h-3" />
                                    <span className="text-xs">{post.views.toLocaleString()} views</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
