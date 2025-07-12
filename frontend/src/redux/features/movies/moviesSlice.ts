import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        moviesFilter: {
            searchTerm: "",
            selectedGenre: "",
            selectedYear: "",
            selectedSort: "",
        },
        filteredMovies: [],
        movieYears: [],
        uniqueYears: [],
        currentPage: 1,
        moviesPerPage: 20,
        totalMovies: 0,
    },
    reducers: {
        setMoviesFilter(state, action) {
            state.moviesFilter = { ...state.moviesFilter, ...action.payload };
        },
        setFilteredMovies(state, action) {
            state.filteredMovies = action.payload;
        },
        setMovieYears(state, action) {
            state.movieYears = action.payload;
        },
        setUniqueYears(state, action) {
            state.uniqueYears = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setMoviesPerPage(state, action) {
            state.moviesPerPage = action.payload;
            state.currentPage = 1; // Reset to first page when changing items per page
        },
        setTotalMovies(state, action) {
            state.totalMovies = action.payload;
        }
    },
})

export const {
    setMoviesFilter,
    setFilteredMovies,
    setMovieYears,
    setUniqueYears,
    setCurrentPage,
    setMoviesPerPage,
    setTotalMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;