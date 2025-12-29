import { FaChartLine, FaHeart } from 'react-icons/fa'

interface Post {
    id: number
    title: string
    author: string
    likes: number
    category: string
}

interface TopPostsSectionProps {
    posts: Post[]
}

export default function TopPostsSection({ posts }: TopPostsSectionProps) {
    return (
        <section className="mb-20">
            <div className="flex items-center mb-8">
                <FaChartLine className="w-8 h-8 text-amber-600 mr-3" />
                <h2 className="font-serif text-4xl font-bold text-gray-900">Top Posts</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-l-4 border-amber-500 cursor-pointer hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                                {post.category}
                            </span>
                            <div className="flex items-center text-gray-500">
                                <FaHeart className="w-4 h-4 mr-1" />
                                <span className="text-sm">{post.likes}</span>
                            </div>
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-sm text-gray-600">by {post.author}</p>
                        <button className="mt-4 text-amber-600 font-medium text-sm hover:text-amber-700">
                            Read More →
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}
