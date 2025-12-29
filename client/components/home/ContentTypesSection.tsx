import Image from 'next/image'

interface ContentType {
    name: string
    icon: string
    count: number
}

interface ContentTypesSectionProps {
    contentTypes: ContentType[]
}

export default function ContentTypesSection({ contentTypes }: ContentTypesSectionProps) {
    return (
        <section className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {contentTypes.map((type) => (
                    <div
                        key={type.name}
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-amber-300"
                    >
                        <div className="text-5xl mb-3 text-center flex justify-center items-center h-[60px]">
                            {type.icon.startsWith('/') ? (
                                <Image
                                    src={type.icon}
                                    alt={type.name}
                                    width={60}
                                    height={60}
                                    className="object-contain"
                                />
                            ) : (
                                type.icon
                            )}
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-gray-800 text-center">{type.name}</h3>
                        <p className="text-amber-600 text-center text-sm mt-2">{type.count} works</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
