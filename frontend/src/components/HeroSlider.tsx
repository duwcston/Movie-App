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
            <div className="relative h-96 bg-transparent rounded-lg flex items-center justify-center">
                <h2 className="text-white text-2xl">Loading movies...</h2>
            </div>
        );
    }

    const currentMovie = data[currentSlide];

    const handleWatchNow = () => {
        window.location.href = `/movies/player/${currentMovie._id}`;
    };

    return (
        <div className="relative h-80 sm:h-96 md:h-[450px] lg:h-[550px] xl:h-[650px] rounded-lg overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={currentMovie.coverImage}
                    alt={currentMovie.name}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="relative h-full flex items-center justify-start px-[5rem]">
                <div className="max-w-2xl p-8 md:p-12 bg-transparent bg-opacity-10 backdrop-blur-xs rounded-xl border border-white border-opacity-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
                        {currentMovie.name} ({currentMovie.year})
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {currentMovie.genre &&
                            currentMovie.genre.map((g, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-700 bg-opacity-80 text-white px-3 py-1 rounded-full text-sm border border-gray-600"
                                >
                                    {g.name}
                                </span>
                            ))}
                    </div>

                    <p className="text-white text-lg mb-6 leading-relaxed line-clamp-3 drop-shadow-lg">
                        {currentMovie.detail}
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-yellow-400 text-lg font-semibold drop-shadow-lg">
                            ⭐ {currentMovie.rating || "N/A"}
                        </span>
                        {/* <span className="text-gray-100 font-medium drop-shadow-lg">
                            {currentMovie.year}
                        </span> */}
                    </div>

                    <Link to={`/movies/player/${currentMovie?._id}`}>
                        <button
                            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                            onClick={handleWatchNow}
                        >
                            Watch Now
                        </button>
                    </Link>
                </div>
            </div>

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-10 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-10 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {data.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === currentSlide
                                ? "bg-white"
                                : "bg-white bg-opacity-50 hover:bg-opacity-70"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
