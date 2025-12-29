import { FaQuoteLeft, FaUserTie } from 'react-icons/fa'

interface CouncilHead {
    id: number
    name: string
    position: string
    thought: string
    avatar: string
    color: string
}

interface CouncilHeadsSectionProps {
    heads: CouncilHead[]
}

export default function CouncilHeadsSection({ heads }: CouncilHeadsSectionProps) {
    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <FaUserTie className="w-6 h-6 text-[#8b7355] mr-2" />
                    <h2 className="font-serif text-2xl font-bold text-gray-900">Council Heads & Their Thoughts</h2>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {heads.map((head) => (
                    <div
                        key={head.id}
                        className="group bg-[#f5e6d3] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-[#e8d4bd]"
                    >
                        {/* Content */}
                        <div className="relative">
                            {/* Quote Icon */}
                            <FaQuoteLeft className="w-4 h-4 text-[#8b7355]/40 mb-2" />

                            {/* Thought/Quote */}
                            <p className="font-serif text-sm text-gray-800 mb-4 leading-relaxed line-clamp-3">
                                &quot;{head.thought}&quot;
                            </p>

                            {/* Profile Section */}
                            <div className="flex items-center gap-3 pt-3 border-t border-[#e8d4bd]">
                                {/* Avatar */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-[#e8d4bd] flex items-center justify-center text-xl">
                                    {head.avatar}
                                </div>

                                {/* Info */}
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm mb-0.5">{head.name}</h3>
                                    <p className="text-gray-600 text-xs">{head.position}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
                }
            </div>
        </section>
    )

}
