import {
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import SliderUtil from "../../components/SlideUtil";
import { useEffect, useState } from "react";

const MoviesContainerPage = () => {
    const { data: newMovies, isLoading: loadingNew } = useGetNewMoviesQuery({});
    const { data: topMovies, isLoading: loadingTop } = useGetTopMoviesQuery({});
    const { data: randomMovies, isLoading: loadingRandom } = useGetRandomMoviesQuery({});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                <section
                    className={`space-y-6 sm:space-y-8 md:space-y-10 transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="movie-section transform transition-all duration-500">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 border-b border-gray-700 pb-3 sm:pb-4">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white relative pl-6 sm:pl-0">
                                <span className="absolute left-0 sm:-left-4 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></span>
                                New Releases
                            </h2>
                            <a
                                href="/movies"
                                className="group flex items-center mt-2 sm:mt-0 text-blue-400 hover:text-blue-300 text-sm md:text-base transition-colors duration-300"
                            >
                                View All
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-xl hover:shadow-blue-900/20 transition-all duration-500">
                            {loadingNew ? (
                                <div className="flex justify-center items-center h-32 sm:h-48 md:h-64">
                                    <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
                                <SliderUtil data={newMovies || []} />
                            )}
                        </div>
                    </div>

                    <div className="movie-section transform transition-all duration-500">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 border-b border-gray-700 pb-3 sm:pb-4">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white relative pl-6 sm:pl-0">
                                <span className="absolute left-0 sm:-left-4 top-0 bottom-0 w-1 bg-orange-500 rounded-full"></span>
                                Top Rated
                            </h2>
                            <a
                                href="/movies"
                                className="group flex items-center mt-2 sm:mt-0 text-blue-400 hover:text-blue-300 text-sm md:text-base transition-colors duration-300"
                            >
                                View All
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-xl hover:shadow-yellow-900/20 transition-all duration-500">
                            {loadingTop ? (
                                <div className="flex justify-center items-center h-32 sm:h-48 md:h-64">
                                    <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-yellow-500"></div>
                                </div>
                            ) : (
                                <SliderUtil data={topMovies || []} />
                            )}
                        </div>
                    </div>

                    <div className="movie-section transform transition-all duration-500">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 border-b border-gray-700 pb-3 sm:pb-4">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white relative pl-6 sm:pl-0">
                                <span className="absolute left-0 sm:-left-4 top-0 bottom-0 w-1 bg-purple-500 rounded-full"></span>
                                Recommended For You
                            </h2>
                            <a
                                href="/movies"
                                className="group flex items-center mt-2 sm:mt-0 text-blue-400 hover:text-blue-300 text-sm md:text-base transition-colors duration-300"
                            >
                                View All
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-xl hover:shadow-purple-900/20 transition-all duration-500">
                            {loadingRandom ? (
                                <div className="flex justify-center items-center h-32 sm:h-48 md:h-64">
                                    <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-purple-500"></div>
                                </div>
                            ) : (
                                <SliderUtil data={randomMovies || []} />
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MoviesContainerPage;
