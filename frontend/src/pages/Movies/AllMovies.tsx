import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useGetGenresQuery } from "../../redux/api/genre";
import {
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner.jpg";
import {
    setMoviesFilter,
    setFilteredMovies,
    setMovieYears,
    setUniqueYears,
} from "../../redux/features/movies/moviesSlice";
import { RootState } from "../../redux/store";
import { MovieProps } from "../../types/movieTypes";
import { GenreProps } from "../../types/genreTypes";

const AllMovies = () => {
    const dispatch = useDispatch();
    const { data } = useGetAllMoviesQuery({});
    const { data: genres } = useGetGenresQuery({});
    const { data: newMovies } = useGetNewMoviesQuery({});
    const { data: topMovies } = useGetTopMoviesQuery({});
    const { data: randomMovies } = useGetRandomMoviesQuery({});

    const { moviesFilter, filteredMovies } = useSelector((state: RootState) => state.movies);

    const movieYears = data?.map((movie: MovieProps) => movie.year);
    const uniqueYears = Array.from(new Set(movieYears));

    useEffect(() => {
        if (data) {
            const movieYears = data.map((movie: MovieProps) => movie.year);
            const uniqueYears = Array.from(new Set(movieYears));

            dispatch(setFilteredMovies(data));
            dispatch(setMovieYears(movieYears));
            dispatch(setUniqueYears(uniqueYears));
        }
    }, [data, dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMoviesFilter({ searchTerm: e.target.value }));

        const filteredMovies = data.filter((movie: MovieProps) =>
            movie.name.toLowerCase().includes(e.target.value.toLowerCase())
        );

        dispatch(setFilteredMovies(filteredMovies));
    };

    const handleGenreClick = (genreId: string) => {
        dispatch(setMoviesFilter({ ...moviesFilter, selectedGenre: genreId }));
        const filterByGenre = data.filter((movie: { genre: string }) => movie.genre === genreId);
        dispatch(setFilteredMovies(filterByGenre));
    };

    const handleYearChange = (year: string) => {
        dispatch(setMoviesFilter({ ...moviesFilter, selectedYear: year }));
        const filterByYear = data.filter((movie: { year: number }) => movie.year === +year);
        dispatch(setFilteredMovies(filterByYear));
    };

    const handleSortChange = (sortOption: string) => {
        dispatch(setMoviesFilter({ ...moviesFilter, selectedSort: sortOption }));
        switch (sortOption) {
            case "new":
                dispatch(setFilteredMovies(newMovies));
                break;
            case "top":
                dispatch(setFilteredMovies(topMovies));
                break;
            case "random":
                dispatch(setFilteredMovies(randomMovies));
                break;
            default:
                dispatch(setFilteredMovies(data || []));
                break;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <div
                className="relative h-[70vh] w-full flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${banner})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-70"></div>

                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4">
                        The Movies Hub
                    </h1>
                    <p className="text-lg md:text-2xl">
                        Cinematic Odyssey: Unveiling the Magic of Movies
                    </p>
                </div>
            </div>

            <div className="bg-gray-800 py-6 px-4 shadow-lg sticky top-0 z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-4 flex justify-center">
                        <input
                            type="text"
                            className="w-[100vh] border px-4 py-3 outline-none rounded-lg text-black bg-white"
                            placeholder="Search Movie"
                            value={moviesFilter.searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <select
                            className="border-2 p-2 rounded-lg bg-white text-black cursor-pointer"
                            value={moviesFilter.selectedGenre}
                            onChange={(e) => handleGenreClick(e.target.value)}
                        >
                            <option value="">All Genres</option>
                            {genres?.map((genre: GenreProps) => (
                                <option key={genre._id} value={genre._id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>

                        <select
                            className="border-2 p-2 rounded-lg bg-white text-black cursor-pointer"
                            value={moviesFilter.selectedYear}
                            onChange={(e) => handleYearChange(e.target.value)}
                        >
                            <option value="">All Years</option>
                            {uniqueYears.map((year) => (
                                <option key={year as string} value={year as string}>
                                    {year as string}
                                </option>
                            ))}
                        </select>

                        <select
                            className="border-2 p-2 rounded-lg bg-white text-black cursor-pointer"
                            value={moviesFilter.selectedSort}
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            <option value="">Sort By</option>
                            <option value="new">New Movies</option>
                            <option value="top">Top Movies</option>
                            <option value="random">Random Movies</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {filteredMovies && filteredMovies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredMovies.map((movie: MovieProps) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-white py-16">
                        <h3 className="text-2xl font-semibold">No movies found</h3>
                        <p className="mt-2">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllMovies;
