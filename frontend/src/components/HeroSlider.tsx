import { useState, useEffect } from "react";
import { MovieProps } from "../types/movieTypes";
import { Link } from "react-router-dom";

interface HeroSliderProps {
    data: MovieProps[];
}

const HeroSlider = ({ data }: HeroSliderProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (data && data.length > 0) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % data.length);
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [data]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % data.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    if (!data || data.length === 0) {
        return (
            <div className="relative h-64 sm:h-80 md:h-96 bg-transparent rounded-lg flex items-center justify-center">
                <h2 className="text-white text-xl sm:text-2xl px-4 text-center">
                    Loading movies...
                </h2>
            </div>
        );
    }

    const currentMovie = data[currentSlide];

    const handleWatchNow = () => {
        window.location.href = `/movies/player/${currentMovie._id}`;
    };

    return (
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[550px] 2xl:h-[650px] rounded-lg overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={currentMovie.coverImage}
                    alt={currentMovie.name}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent sm:from-black/60 sm:via-black/20"></div>

            <div className="relative h-full flex items-center justify-start px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl p-4 sm:p-6 md:p-8 lg:p-12 bg-transparent bg-opacity-10 backdrop-blur-sm rounded-xl border border-white border-opacity-10">
                    <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight drop-shadow-2xl">
                        {currentMovie.name} ({currentMovie.year})
                    </h1>

                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                        {currentMovie.genre &&
                            currentMovie.genre.slice(0, 3).map((g, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-700 bg-opacity-80 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm border border-gray-600"
                                >
                                    {g.name}
                                </span>
                            ))}
                    </div>

                    <p className="text-white text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3 drop-shadow-lg">
                        {currentMovie.detail}
                    </p>

                    <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
                        <span className="text-yellow-400 text-sm sm:text-base md:text-lg font-semibold drop-shadow-lg">
                            ⭐ {currentMovie.rating || "N/A"}
                        </span>
                    </div>

                    <Link to={`/movies/player/${currentMovie?._id}`}>
                        <button
                            className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base"
                            onClick={handleWatchNow}
                        >
                            Watch Now
                        </button>
                    </Link>
                </div>
            </div>

            {/* Navigation buttons - hidden on very small screens */}
            <button
                onClick={prevSlide}
                className="hidden sm:block absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-2 md:p-3 rounded-full transition-all"
            >
                <svg
                    className="w-4 h-4 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="hidden sm:block absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-2 md:p-3 rounded-full transition-all"
            >
                <svg
                    className="w-4 h-4 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                {data.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all ${
                            index === currentSlide
                                ? "bg-white"
                                : "bg-white bg-opacity-50 hover:bg-opacity-70"
                        }`}
                    />
                ))}
            </div>

            {/* Mobile swipe indicators */}
            <div className="sm:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
                <button
                    onClick={prevSlide}
                    className="bg-black bg-opacity-30 text-white p-2 rounded-full"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-black bg-opacity-30 text-white p-2 rounded-full"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default HeroSlider;
