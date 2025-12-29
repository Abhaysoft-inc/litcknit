import { FaHeart } from 'react-icons/fa'

interface LovedItem {
    id: number
    title: string
    author: string
    hearts: number
    image: string
}

interface MostLovedSectionProps {
    items: LovedItem[]
}

export default function MostLovedSection({ items }: MostLovedSectionProps) {
    return (
        <section className="mb-20 bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 md:p-12">
            <div className="flex items-center mb-8">
                <FaHeart className="w-8 h-8 text-rose-500 mr-3 fill-rose-500" />
                <h2 className="font-serif text-4xl font-bold text-gray-900">Most Loved</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-2"
                    >
                        <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-48 flex items-center justify-center text-7xl">
                            {item.image}
                        </div>
                        <div className="p-6">
                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 mb-4">by {item.author}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-rose-500">
                                    <FaHeart className="w-5 h-5 mr-2 fill-rose-500" />
                                    <span className="font-semibold">{item.hearts}</span>
                                </div>
                                <button className="text-amber-600 font-medium hover:text-amber-700">
                                    Read →
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
