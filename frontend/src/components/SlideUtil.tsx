import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";
import { MovieProps } from "../types/movieTypes";
import "./SliderUtil.css";

const SliderUtil = ({ data }: { data: MovieProps[] }) => {
    const settings = {
        dots: true,
        lazyLoad: "ondemand" as const,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        pauseOnFocus: true,
        cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
        swipeToSlide: true,
        focusOnSelect: true,
        adaptiveHeight: false,
        centerMode: false,
        variableWidth: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: "20px",
                },
            },
        ],
    };

    return (
        <div className="slider-container relative">
            <div className="relative overflow-hidden rounded-xl">
                {data.length === 0 ? (
                    <div className="flex justify-center items-center h-64 bg-gray-800/50 rounded-xl">
                        <p className="text-gray-400">No movies available</p>
                    </div>
                ) : (
                    <Slider {...settings}>
                        {data.map((movie: MovieProps) => (
                            <div key={movie._id} className="px-3 py-2 focus:outline-none">
                                <div className="transform transition-all duration-1000 hover:scale-110 hover:z-10 relative ease-in-out">
                                    <MovieCard movie={movie} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    );
};

export default SliderUtil;
