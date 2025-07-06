const Header = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:flex-1">
                    <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 mb-4 rounded-lg">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Featured Movies
                        </h2>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <div className="aspect-video bg-blue-900/30 rounded flex items-center justify-center">
                            <p className="text-gray-400">Featured movie slider will appear here</p>
                            {/* <SliderUtil data /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
