import { GenreProps } from "./genreTypes";

interface ReviewProps {
    _id: string;
    movieId: string;
    userId: string;
    rating: number;
    comment: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface MovieProps {
    _id: string;
    name: string;
    tmdbId: number;
    detail: string;
    year: string;
    genre: GenreProps[];
    rating: number;
    image: string;
    coverImage: string;
    reviews: ReviewProps[];
    numReviews: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface MovieState {
    moviesFilter: {
        searchTerm: string;
        selectedGenre: string;
        selectedYear: string;
        selectedSort: string;
    };
    filteredMovies: MovieProps[];
    movieYears: string[];
    uniqueYears: string[];
    currentPage: number;
    moviesPerPage: number;
    totalMovies: number;
}