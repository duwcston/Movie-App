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
        slidesToScroll: 2,
    };
    return (
        <Slider {...settings}>
            {data?.map((movie: MovieProps) => (
                <MovieCard key={movie._id} movie={movie} />
            ))}
        </Slider>
    );
};

export default SliderUtil;
