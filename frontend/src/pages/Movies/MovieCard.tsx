import { Link } from "react-router-dom";
import { MovieProps } from "../../types/movieTypes";

const MovieCard = ({ movie }: { movie: MovieProps }) => {
    return (
        <div key={movie._id} className="relative group m-[2rem]">
            <Link to={`/movies/${movie._id}`}>
                <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 transform group-hover:opacity-50"
                />
            </Link>
            <h3 className="absolute top-[85%] left-[2rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                {movie.name}
            </h3>
        </div>
    );
};

export default MovieCard;
