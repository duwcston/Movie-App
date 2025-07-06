import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";
import { MovieProps } from "../types/movieTypes";

const SliderUtil = ({ data }: { data: MovieProps[] }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        cssEase: "ease-in-out",
        responsive: [
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
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {data?.map((movie: MovieProps) => (
                    <div key={movie._id} className="px-2">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderUtil;
