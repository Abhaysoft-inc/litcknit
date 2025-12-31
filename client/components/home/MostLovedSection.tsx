import { FaHeart, FaBook, FaPen, FaTheaterMasks, FaMoon, FaCity, FaLeaf } from 'react-icons/fa'

interface LovedItem {
    id: number
    title: string
    author: string
    hearts: number
    icon: string
    color: string
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    book: FaBook,
    pen: FaPen,
    theater: FaTheaterMasks,
    moon: FaMoon,
    city: FaCity,
    leaf: FaLeaf,
}

interface MostLovedSectionProps {
    items: LovedItem[]
}

export default function MostLovedSection({ items }: MostLovedSectionProps) {
    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <FaHeart className="w-6 h-6 text-[#8b7355] mr-2" />
                    <h2 className="font-serif text-2xl font-bold text-gray-900">Community Favorites</h2>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group bg-[#f5e6d3] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-[#e8d4bd]"
                    >
                        {/* Content */}
                        <div className="p-4">
                            {/* Icon */}
                            <div className="mb-3 flex justify-center items-center">
                                {(() => {
                                    const IconComponent = iconMap[item.icon]
                                    return IconComponent ? <IconComponent className="w-10 h-10 text-[#8b7355]" /> : null
                                })()}
                            </div>

                            {/* Info */}
                            <div>
                                <h3 className="font-serif text-sm font-bold text-gray-900 mb-1 line-clamp-2 text-center">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-600 mb-2 text-center">by {item.author}</p>
                                <div className="flex items-center justify-center gap-1 text-[#8b7355]">
                                    <FaHeart className="w-3 h-3" />
                                    <span className="font-bold text-xs">{item.hearts.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )
}
