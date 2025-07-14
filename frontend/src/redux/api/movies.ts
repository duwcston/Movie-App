import { apiSlice } from "./apiSlice";
import { MOVIES_URL, UPLOADS_URL } from "../constants";

export const moviesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMovie: builder.mutation({
            query: (newMovie) => ({
                url: `${MOVIES_URL}/create-movie`,
                method: 'POST',
                body: newMovie,
            }),
        }),
        updateMovie: builder.mutation({
            query: ({ id, updatedMovie }) => ({
                url: `${MOVIES_URL}/update-movie/${id}`,
                method: 'PUT',
                body: updatedMovie,
            }),
        }),
        deleteMovie: builder.mutation({
            query: (id) => ({
                url: `${MOVIES_URL}/delete-movie/${id}`,
                method: 'DELETE',
            }),
        }),
        getAllMovies: builder.query({
            query: () => ({
                url: `${MOVIES_URL}/all-movies`,
                method: 'GET',
            }),
        }),
        getMovieById: builder.query({
            query: (id) => ({
                url: `${MOVIES_URL}/movie/${id}`,
                method: 'GET',
            }),
        }),
        getNewMovies: builder.query({
            query: () => ({
                url: `${MOVIES_URL}/new-movies`,
                method: 'GET',
            }),
        }),
        getTopMovies: builder.query({
            query: () => ({
                url: `${MOVIES_URL}/top-movies`,
                method: 'GET',
            }),
        }),
        getRandomMovies: builder.query({
            query: () => ({
                url: `${MOVIES_URL}/random-movies`,
                method: 'GET',
            }),
        }),
        uploadMovieImage: builder.mutation({
            query: (formData) => ({
                url: `${UPLOADS_URL}`,
                method: 'POST',
                body: formData,
            }),
        }),
        addMovieReview: builder.mutation({
            query: ({ id, rating, comment }) => ({
                url: `${MOVIES_URL}/${id}/review`,
                method: 'POST',
                body: { rating, id, comment },
            }),
        }),
        deleteComment: builder.mutation({
            query: ({ movieId, commentId }) => ({
                url: `${MOVIES_URL}/delete-comment`,
                method: 'DELETE',
                body: { movieId, commentId },
            }),
        }),
    })
})

export const {
    useCreateMovieMutation,
    useUpdateMovieMutation,
    useDeleteMovieMutation,
    useGetAllMoviesQuery,
    useGetMovieByIdQuery,
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
    useUploadMovieImageMutation,
    useAddMovieReviewMutation,
    useDeleteCommentMutation
} = moviesApiSlice;