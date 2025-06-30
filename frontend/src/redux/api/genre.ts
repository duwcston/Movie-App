import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createGenre: builder.mutation({
            query: (newGenre) => ({
                url: `${GENRE_URL}`,
                method: 'POST',
                body: newGenre,
            }),
        }),
        updateGenre: builder.mutation({
            query: ({ id, updatedGenre }) => ({
                url: `${GENRE_URL}/${id}`,
                method: 'PUT',
                body: updatedGenre,
            }),
        }),
        deleteGenre: builder.mutation({
            query: (id) => ({
                url: `${GENRE_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
        getGenres: builder.query({
            query: () => ({
                url: `${GENRE_URL}/genres`,
                method: 'GET',
            }),
        }),
        getGenreById: builder.query({
            query: (id) => ({
                url: `${GENRE_URL}/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useCreateGenreMutation,
    useUpdateGenreMutation,
    useDeleteGenreMutation,
    useGetGenreByIdQuery,
    useGetGenresQuery
} = genreApiSlice;