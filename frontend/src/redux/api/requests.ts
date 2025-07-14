import { apiSlice } from "./apiSlice";
import { REQUESTS_URL } from "../constants";

export const requestsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRequest: builder.mutation({
            query: (newRequest) => ({
                url: `${REQUESTS_URL}/create-request`,
                method: 'POST',
                body: newRequest,
            }),
        }),
        deleteRequest: builder.mutation({
            query: (id) => ({
                url: `${REQUESTS_URL}/delete-request/${id}`,
                method: 'DELETE',
            }),
        }),
        getAllRequests: builder.query({
            query: () => ({
                url: `${REQUESTS_URL}/all-requests`,
                method: 'GET',
            }),
        }),
        // getRequestById: builder.query({
        //     query: (id) => ({
        //         url: `${REQUESTS_URL}/request/${id}`,
        //         method: 'GET',
        //     }),
        // }),
    }),
});

export const {
    useCreateRequestMutation,
    useDeleteRequestMutation,
    useGetAllRequestsQuery,
} = requestsApiSlice;

