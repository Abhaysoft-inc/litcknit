import { FaBookOpen } from 'react-icons/fa'

interface Book {
    id: number
    title: string
    author: string
    cover: string
    genre: string
}

interface FeaturedBooksSectionProps {
    books: Book[]
}

export default function FeaturedBooksSection({ books }: FeaturedBooksSectionProps) {
    return (
        <section className="mb-20">
            <div className="flex items-center mb-8">
                <FaBookOpen className="w-8 h-8 text-amber-600 mr-3" />
                <h2 className="font-serif text-4xl font-bold text-gray-900">Featured Books</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                    >
                        <div className="relative">
                            <div className="bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 h-64 flex items-center justify-center text-8xl">
                                {book.cover}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-4 left-4 right-4">
                                    <button className="w-full bg-white text-amber-900 py-2 rounded-lg font-semibold">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                                {book.genre}
                            </span>
                            <h3 className="font-serif text-xl font-bold text-gray-900 mt-3 mb-2">
                                {book.title}
                            </h3>
                            <p className="text-gray-600">by {book.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
