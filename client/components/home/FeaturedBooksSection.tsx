import { FaBookOpen, FaFileAlt, FaBook, FaBookReader, FaBookmark } from 'react-icons/fa'

interface Book {
    id: number
    title: string
    author: string
    cover: string
    genre: string
    pages: number
}

const bookIconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'book': FaBook,
    'book-open': FaBookOpen,
    'book-reader': FaBookReader,
    'bookmark': FaBookmark,
}

interface FeaturedBooksSectionProps {
    books: Book[]
}

export default function FeaturedBooksSection({ books }: FeaturedBooksSectionProps) {
    return (
        <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <FaBookOpen className="w-8 h-8 text-amber-600 mr-3" />
                    <h2 className="font-serif text-4xl font-bold text-gray-900">Featured Collections</h2>
                </div>
                <button className="text-amber-600 font-semibold hover:text-amber-700 transition">
                    Browse Library →
                </button>
            </div>

            {/* Dynamic grid with varying sizes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {books.map((book, index) => (
                    <div
                        key={book.id}
                        className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer
                        ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                        ${index === 3 ? 'md:col-span-2' : ''}`}
                    >
                        {/* Book cover with gradient */}
                        <div className={`bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 
                            ${index === 0 ? 'h-96' : 'h-64'}
                            flex flex-col items-center justify-center relative overflow-hidden`}>

                            {/* Decorative pattern overlay */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
                                }}></div>
                            </div>

                            {/* Book emoji/icon */}
                            <div className={`relative mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                {(() => {
                                    const BookIcon = bookIconMap[book.cover]
                                    return BookIcon ? <BookIcon className={`${index === 0 ? 'w-24 h-24' : 'w-16 h-16'} text-amber-900`} /> : null
                                })()}
                            </div>

                            {/* Genre badge */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span className="text-xs font-bold text-amber-900">{book.genre}</span>
                            </div>

                            {/* Pages indicator */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                                <FaFileAlt className="w-3 h-3 text-amber-900" />
                                <span className="text-xs font-bold text-amber-900">{book.pages}</span>
                            </div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-6 left-6 right-6">
                                    <button className="w-full bg-white text-amber-900 py-3 rounded-xl font-bold text-sm hover:bg-amber-50 transition transform translate-y-4 group-hover:translate-y-0 duration-300">
                                        View Collection
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Book info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-serif text-base font-bold text-gray-900 mb-1 line-clamp-2">
                                {book.title}
                            </h3>
                            <p className="text-sm text-gray-600">by {book.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
