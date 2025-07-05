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
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const AdminMoviesList = () => {
    const { data: movies } = useGetAllMoviesQuery({});

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 ml-64">
                <div className="p-3">
                    <div className="text-xl font-bold text-white mb-6">
                        Movies List ({movies?.length})
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {movies?.map((movie: MovieProps) => (
                            <div
                                key={movie._id}
                                className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-700"
                            >
                                <img
                                    src={movie.image}
                                    alt={movie.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <div className="font-bold text-xl mb-3 text-white">
                                        {movie.name}
                                    </div>
                                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                        {movie.detail.length > 100
                                            ? `${movie.detail.substring(0, 100)}...`
                                            : movie.detail}
                                    </p>
                                    <div className="pt-2">
                                        <Link
                                            to={`/admin/movies/update/${movie._id}`}
                                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 w-full text-center"
                                        >
                                            Update Movie
                                        </Link>
                                    </div>
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
