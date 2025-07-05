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
        const filterByGenre = data.filter((movie: { genre: string }) => movie.genre === genreId);
        dispatch(setFilteredMovies(filterByGenre));
    };

    const handleYearChange = (year: string) => {
        const filterByYear = data.filter((movie: { year: number }) => movie.year === +year);
        dispatch(setFilteredMovies(filterByYear));
    };

    const handleSortChange = (sortOption: string) => {
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
                dispatch(setFilteredMovies([]));
                break;
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem] overflow-hidden">
            <>
                <section>
                    <div
                        className="relative h-screen w-screen flex items-center justify-center bg-cover"
                        style={{ backgroundImage: `url(${banner})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

                        <div className="relative z-10 text-center text-white mt-[5rem]">
                            <h1 className="text-8xl font-bold mb-4">The Movies Hub</h1>
                            <p className="text-2xl">
                                Cinematic Odyssey: Unveiling the Magic of Movies
                            </p>
                        </div>

                        <section className="absolute bottom-[2rem]">
                            <input
                                type="text"
                                className="w-[100%] border px-4 py-2 outline-none rounded text-black"
                                placeholder="Search Movie"
                                value={moviesFilter.searchTerm}
                                onChange={handleSearchChange}
                            />
                            <section className="sorts-container mt-[2rem] ml-[10rem] w-[30rem] text-white">
                                <select
                                    className="border-2 p-2 rounded w-fit"
                                    value={moviesFilter.selectedGenre}
                                    onChange={(e) => handleGenreClick(e.target.value)}
                                >
                                    <option value="" className="text-black">
                                        Genres
                                    </option>
                                    {genres?.map((genre: GenreProps) => (
                                        <option
                                            key={genre._id}
                                            value={genre._id}
                                            className="text-black"
                                        >
                                            {genre.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="border-2 p-2 rounded ml-4 w-fit"
                                    value={moviesFilter.selectedYear}
                                    onChange={(e) => handleYearChange(e.target.value)}
                                >
                                    <option value="" className="text-black">
                                        Year
                                    </option>
                                    {uniqueYears.map((year) => (
                                        <option
                                            key={year as string}
                                            value={year as string}
                                            className="text-black"
                                        >
                                            {year as string}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="border-2 p-2 rounded ml-4 w-fit"
                                    value={moviesFilter.selectedSort}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                >
                                    <option className="text-black" value="">
                                        Sort By
                                    </option>
                                    <option className="text-black" value="new">
                                        New Movies
                                    </option>
                                    <option className="text-black" value="top">
                                        Top Movies
                                    </option>
                                    <option className="text-black" value="random">
                                        Random Movies
                                    </option>
                                </select>
                            </section>
                        </section>
                    </div>

                    <section className="flex flex-wrap justify-center items-center mt-8 w-screen mx-auto">
                        {filteredMovies?.map((movie: MovieProps) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </section>
                </section>
            </>
        </div>
    );
};

export default AllMovies;
