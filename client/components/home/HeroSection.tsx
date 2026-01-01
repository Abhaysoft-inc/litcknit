import Image from 'next/image';


export default function HeroBeigeWithBgImage() {
    return (
        <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-8 md:px-20 py-20 text-skin-deep">

            {/* Background image with transparency */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{
                    backgroundImage:
                        "url('')",
                }}
            ></div>
            <div className="absolute inset-0 bg-beige-light/80"></div>

            {/* Main content */}
            <div className="relative z-10 md:w-1/2 space-y-6 text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-serif">
                    Where Words Bloom
                </h1>
                <p className="text-xl text-tan-dark max-w-lg">
                    A canvas for expression — from verse to debate, from stories to shared voices.
                </p>

                <div className="flex justify-center md:justify-start gap-4 mt-4">
                    <button className="bg-skin-light hover:bg-skin-deep text-beige-light font-semibold py-3 px-6 rounded-xl shadow-lg transition cursor-pointer">
                        Explore Events
                    </button>
                    <button className="border-2 border-skin-deep hover:bg-skin-light text-skin-deep font-semibold py-3 px-6 rounded-xl transition cursor-pointer">
                        Read Stories
                    </button>
                </div>
            </div>

            {/* Floating Cards with Photos */}
            <div className="relative z-10 md:w-1/2 mt-10 md:mt-0 h-96 flex justify-center items-center">

                {/* Card 1 */}
                <div className="absolute top-0 left-12 w-44 h-44 bg-white shadow-md rounded-xl overflow-hidden transform rotate-[-10deg] hover:scale-105 transition-transform duration-300">
                    <Image
                        src="/img1.jpg"
                        alt="writing workshop"
                        className="w-full h-full object-cover"
                        fill
                    />
                </div>

                {/* Card 2 */}
                <div className="absolute top-20 right-10 w-48 h-48 bg-white shadow-xl rounded-xl overflow-hidden transform rotate-[8deg] hover:scale-105 transition-transform duration-300">
                    <Image
                        src="/img2.jpg"
                        alt="debate session"
                        className="w-full h-full object-top"
                        fill
                    />
                </div>

                {/* Card 3 */}
                <div className="absolute bottom-0 left-28 w-40 h-40 bg-white shadow-lg rounded-xl overflow-hidden transform rotate-[-5deg] hover:scale-105 transition-transform duration-300">
                    <Image
                        src="/img3.jpg"
                        alt="poetry reading"
                        className="w-full h-full object-cover"
                        fill
                    />
                </div>

                {/* Card 4 */}
                <div className="absolute top-32 left-4 w-36 h-36 bg-white shadow-md rounded-xl overflow-hidden transform rotate-[12deg] hover:scale-105 transition-transform duration-300">
                    <Image
                        src="/img1.jpg"
                        alt="book club"
                        className="w-full h-full object-cover"
                        fill
                    />
                </div>

                {/* Card 5 */}
                <div className="absolute bottom-16 right-16 w-42 h-42 bg-white shadow-lg rounded-xl overflow-hidden transform rotate-[-8deg] hover:scale-105 transition-transform duration-300">
                    <Image
                        src="/img2.jpg"
                        alt="storytelling"
                        className="w-full h-full object-cover"
                        fill
                    />
                </div>

                {/* Card 6 */}
                <div className="absolute top-10 right-32 w-38 h-38 bg-white shadow-md rounded-xl overflow-hidden transform rotate-[15deg] hover:scale-105 transition-transform duration-300">
                    <Image
                        src="/img3.jpg"
                        alt="literary event"
                        className="w-full h-full object-cover"
                        fill
                    />
                </div>


            </div>
        </section>
    );
}

