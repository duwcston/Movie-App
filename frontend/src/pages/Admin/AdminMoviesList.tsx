import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import Sidebar from "./Dashboard/Sidebar/Sidebar";
import { MovieProps } from "../../types/movieTypes";

const AdminMoviesList = () => {
    const { data: movies } = useGetAllMoviesQuery({});

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 lg:ml-64 pt-16 lg:pt-12">
                <div className="p-3">
                    <div className="text-xl font-bold text-white mb-6">
                        Movies List ({movies?.length})
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {movies?.map((movie: MovieProps) => (
                            <div
                                key={movie._id}
                                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-700"
                            >
                                <div className="relative">
                                    <img
                                        src={movie.image}
                                        alt={movie.name}
                                        className="w-full h-72 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg mb-2 text-white truncate">
                                        {movie.name}
                                    </h3>
                                    <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                                        {movie.detail}
                                    </p>
                                    <div className="mt-auto">
                                        <Link
                                            to={`/admin/movies/update/${movie._id}`}
                                            className="block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-center text-sm"
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
