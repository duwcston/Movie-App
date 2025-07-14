import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useGetGenresQuery } from "../../redux/api/genre";
import MovieCard from "./MovieCard";
import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setMoviesFilter,
    setFilteredMovies,
    setMovieYears,
    setUniqueYears,
    setCurrentPage,
    setMoviesPerPage,
    setTotalMovies,
} from "../../redux/features/movies/moviesSlice";
import { RootState } from "../../redux/store";
import { MovieProps } from "../../types/movieTypes";
import { GenreProps } from "../../types/genreTypes";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import BackToTopButton from "../../components/BackToTopButton";

const AllMovies = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useGetAllMoviesQuery({});
    const { data: genres, isLoading: genresLoading } = useGetGenresQuery({});

    const { moviesFilter, filteredMovies, currentPage, moviesPerPage, totalMovies } = useSelector(
        (state: RootState) => state.movies
    );

    // Calculate pagination
    const totalPages = Math.ceil(totalMovies / moviesPerPage);
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const currentMovies = filteredMovies.slice(startIndex, endIndex);

    const movieYears = data?.map((movie: MovieProps) => movie.year);
    const uniqueYears = Array.from(new Set(movieYears));

    const applyAllFilters = useCallback(() => {
        if (!data) return;

        let result = [...data];
        const { searchTerm, selectedGenre, selectedYear } = moviesFilter;

        // Apply search filter
        if (searchTerm) {
            result = result.filter((movie: MovieProps) =>
                movie.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply genre filter
        if (selectedGenre) {
            result = result.filter(
                (movie: MovieProps) =>
                    movie.genre &&
                    movie.genre.some((genre: GenreProps) => genre._id === selectedGenre)
            );
        }

        // Apply year filter
        if (selectedYear) {
            result = result.filter((movie: { year: number }) => movie.year === +selectedYear);
        }

        // Apply sort to the already filtered result
        switch (moviesFilter.selectedSort) {
            case "new":
                // Sort by newest release date
                result = result.sort((movieA: MovieProps, movieB: MovieProps) => {
                    const dateA = new Date(movieA.createdAt || 0).getTime();
                    const dateB = new Date(movieB.createdAt || 0).getTime();
                    return dateB - dateA;
                });
                break;
            case "top":
                // Sort by highest rating
                result = result.sort((movieA: MovieProps, movieB: MovieProps) => {
                    const ratingA = movieA.rating || 0;
                    const ratingB = movieB.rating || 0;
                    return ratingB - ratingA;
                });
                break;
            case "random":
                // Shuffle the array randomly
                result = result.sort(() => Math.random() - 0.5);
                break;
        }

        dispatch(setFilteredMovies(result));
        dispatch(setTotalMovies(result.length));
        dispatch(setCurrentPage(1)); // Reset to first page after filtering
    }, [data, moviesFilter, dispatch]);

    useEffect(() => {
        if (data) {
            const movieYears = data.map((movie: MovieProps) => movie.year);
            const uniqueYears = Array.from(new Set(movieYears)).sort(
                (a, b) => Number(b) - Number(a)
            );

            dispatch(setFilteredMovies(data));
            dispatch(setMovieYears(movieYears));
            dispatch(setUniqueYears(uniqueYears));
            dispatch(setTotalMovies(data.length));
            dispatch(setCurrentPage(1));
        }
    }, [data, dispatch]);

    // Apply filters whenever filter values change
    useEffect(() => {
        if (data) {
            applyAllFilters();
        }
    }, [data, applyAllFilters]);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleItemsPerPageChange = (items: number) => {
        dispatch(setMoviesPerPage(items));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMoviesFilter({ ...moviesFilter, searchTerm: e.target.value }));
    };

    const handleGenreClick = (genreId: string) => {
        dispatch(setMoviesFilter({ ...moviesFilter, selectedGenre: genreId }));
    };

    const handleYearChange = (year: string) => {
        dispatch(setMoviesFilter({ ...moviesFilter, selectedYear: year }));
    };

    const handleSortChange = (sortOption: string) => {
        dispatch(setMoviesFilter({ ...moviesFilter, selectedSort: sortOption }));
    };

    // Clear a specific filter
    const clearFilter = (
        filterType: "searchTerm" | "selectedGenre" | "selectedYear" | "selectedSort"
    ) => {
        dispatch(setMoviesFilter({ ...moviesFilter, [filterType]: "" }));
    };

    // Reset all filters
    const resetAllFilters = () => {
        dispatch(
            setMoviesFilter({
                searchTerm: "",
                selectedGenre: "",
                selectedYear: "",
                selectedSort: "",
            })
        );
        if (data) {
            dispatch(setFilteredMovies(data));
            dispatch(setTotalMovies(data.length));
            dispatch(setCurrentPage(1));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Header with hero section */}
            <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 py-5 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white">
                        Discover Movies
                    </h1>

                    {/* Search Bar with Icon */}
                    <div className="relative max-w-3xl mx-auto mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-4 py-3 border-2 border-indigo-500/50 rounded-xl bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                            placeholder="Search for movies..."
                            value={moviesFilter.searchTerm}
                            onChange={handleSearchChange}
                        />
                        {moviesFilter.searchTerm && (
                            <button
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                                onClick={() => clearFilter("searchTerm")}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Filter section */}
            <div className="bg-gray-800/90 shadow-xl z-30 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
                        <div className="flex gap-3 flex-wrap md:flex-nowrap">
                            {/* Genre Filter */}
                            <div className="relative inline-block">
                                <select
                                    className="appearance-none pl-3 pr-10 py-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white cursor-pointer hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </div>
                            </div>

                            {/* Year Filter */}
                            <div className="relative inline-block">
                                <select
                                    className="appearance-none pl-3 pr-10 py-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white cursor-pointer hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={moviesFilter.selectedYear}
                                    onChange={(e) => handleYearChange(e.target.value)}
                                >
                                    <option value="">All Years</option>
                                    {uniqueYears
                                        .sort((a, b) => Number(b) - Number(a))
                                        .map((year) => (
                                            <option key={year as string} value={year as string}>
                                                {year as string}
                                            </option>
                                        ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Sort Options */}
                        <div className="relative inline-block">
                            <select
                                className="appearance-none pl-3 pr-10 py-2.5 rounded-lg bg-gray-700 border border-gray-600 text-white cursor-pointer hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={moviesFilter.selectedSort}
                                onChange={(e) => handleSortChange(e.target.value)}
                            >
                                <option value="">Sort Movies</option>
                                <option value="new">New Releases</option>
                                <option value="top">Top Rated</option>
                                <option value="random">Newly added</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(moviesFilter.selectedGenre ||
                        moviesFilter.selectedYear ||
                        moviesFilter.selectedSort) && (
                        <div className="py-3 flex flex-wrap gap-2 border-t border-gray-700">
                            {moviesFilter.selectedGenre && genres && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-900/70 text-indigo-200">
                                    Genre:{" "}
                                    {
                                        genres.find(
                                            (g: GenreProps) => g._id === moviesFilter.selectedGenre
                                        )?.name
                                    }
                                    <button
                                        onClick={() => clearFilter("selectedGenre")}
                                        className="ml-2 text-indigo-300 hover:text-white"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </button>
                                </span>
                            )}
                            {moviesFilter.selectedYear && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/70 text-purple-200">
                                    Year: {moviesFilter.selectedYear}
                                    <button
                                        onClick={() => clearFilter("selectedYear")}
                                        className="ml-2 text-purple-300 hover:text-white"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </button>
                                </span>
                            )}
                            {moviesFilter.selectedSort && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/70 text-blue-200">
                                    {moviesFilter.selectedSort === "new"
                                        ? "New Releases"
                                        : moviesFilter.selectedSort === "top"
                                        ? "Top Rated"
                                        : moviesFilter.selectedSort === "random"
                                        ? "Discover New"
                                        : ""}
                                    <button
                                        onClick={() => clearFilter("selectedSort")}
                                        className="ml-2 text-blue-300 hover:text-white"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Movie Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {isLoading || genresLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : currentMovies && currentMovies.length > 0 ? (
                    <>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-200">
                                {totalMovies} {totalMovies === 1 ? "Movie" : "Movies"} Found
                                {totalPages > 1 && (
                                    <span className="text-gray-400 ml-2">
                                        (Page {currentPage} of {totalPages})
                                    </span>
                                )}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 animate-fadeIn">
                            {currentMovies.map((movie: MovieProps) => (
                                <MovieCard key={movie._id} movie={movie} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            moviesPerPage={moviesPerPage}
                            onMoviesPerPageChange={handleItemsPerPageChange}
                            totalMovies={totalMovies}
                        />
                    </>
                ) : (
                    <div className="bg-gray-800/50 rounded-xl text-center py-16 px-4 shadow-lg border border-gray-700/50">
                        <svg
                            className="w-16 h-16 mx-auto text-gray-500 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                            ></path>
                        </svg>
                        <h3 className="text-2xl font-semibold text-gray-300">No movies found</h3>
                        <p className="mt-2 text-gray-400 max-w-md mx-auto">
                            We couldn't find any movies matching your criteria. Try adjusting your
                            filters or search terms.
                        </p>
                        <button
                            className="mt-6 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300"
                            onClick={resetAllFilters}
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                ></path>
                            </svg>
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            <BackToTopButton />
            <Footer />
        </div>
    );
};

export default AllMovies;
