export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-serif text-2xl font-bold mb-4">Literary Council </h4>
                        <p className="text-gray-400">Weaving words into timeless stories</p>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4">Quick Links</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Submit Work</a></li>
                            <li><a href="#" className="hover:text-white">Guidelines</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4">Community</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Events</a></li>
                            <li><a href="#" className="hover:text-white">Members</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4">Follow Us</h5>
                        <div className="flex space-x-4 text-gray-400">
                            <a href="#" className="hover:text-white">Twitter</a>
                            <a href="#" className="hover:text-white">Instagram</a>
                            <a href="#" className="hover:text-white">Facebook</a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>&copy; 2026 Literary Council KNIT Sultanpur. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
