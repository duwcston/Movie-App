interface MovieProps {
    _id: string;
    name: string;
    year: number;
    detail: string;
    genre: string;
    image: string;
    cast: string[];
    rating: number;
}

import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
    const { data: movies } = useGetAllMoviesQuery({});

    return (
        <div className="containter mx-[9rem]">
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
                <div className="p-3">
                    <div className="ml-[2rem] text-xl font-bold h-12 text-white">
                        Movies List ({movies?.length})
                    </div>
                    <div className="flex flex-wrap justify-around items-center p-[2rem]">
                        {movies?.map((movie: MovieProps) => (
                            <div className="flex justify-center items-center" key={movie._id}>
                                <div
                                    key={movie._id}
                                    className="max-w-sm m-[2rem] rounded overflow-hidden shadow-lg"
                                >
                                    <img
                                        // src={`http://localhost:5173/${movie.image}`}
                                        src={movie.image}
                                        alt={movie.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="px-4 py-2 border border-none border-gray-400">
                                        <div className="font-bold text-xl mb-2 text-white">
                                            {movie.name}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-base px-4 py-2">
                                        {movie.detail.length > 100
                                            ? `${movie.detail.substring(0, 100)}...`
                                            : movie.detail}
                                    </p>
                                    <button className="mt-[2rem] mb-[1rem]">
                                        <Link
                                            to={`/admin/movies/update/${movie._id}`}
                                            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Update Movie
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMoviesList;
