import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetMovieByIdQuery, useAddMovieReviewMutation } from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import { RootState } from "../../redux/store";
import Loader from "../../components/Loader";

const MovieDetails = () => {
    const { id: movieId } = useParams();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const { data: movie, refetch, isLoading, error } = useGetMovieByIdQuery(movieId);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [createReview, { isLoading: loadingMovieReview }] = useAddMovieReviewMutation();

    const submitHandler = async (e: React.FormEvent<Element>) => {
        e.preventDefault();

        try {
            await createReview({
                id: movieId,
                rating,
                comment,
            }).unwrap();

            refetch();
            setComment("");
            toast.success("Review submitted successfully");
        } catch (error) {
            console.error("Failed to create review:", error);
            toast.error("Failed to create review");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Error Loading Movie</h2>
                    <p className="mb-6">
                        We couldn't load the movie details. Please try again later.
                    </p>
                    <Link
                        to="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-300"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white pb-16">
            <div className="pt-14">
                <div className="container mx-auto px-4">
                    <Link
                        to="/"
                        className="inline-flex items-center text-white bg-black/50 hover:bg-black/70 px-4 py-2 rounded-lg mb-4 transition duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 lg:w-1/4">
                        <img
                            src={movie?.image}
                            alt={movie?.name}
                            className="w-full rounded-lg shadow-2xl object-cover"
                        />
                    </div>

                    <div className="md:w-2/3 lg:w-3/4">
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                                {movie?.name}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 mt-2 mb-6">
                                <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">
                                    {movie?.year}
                                </span>
                                {movie?.genre && (
                                    <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">
                                        {movie?.genre}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-semibold text-gray-300 mb-2">Overview</h3>
                            <p className="text-gray-300 mb-6 leading-relaxed">{movie?.detail}</p>

                            <div className="mt-4">
                                <h3 className="text-xl font-semibold mb-3 text-gray-300">
                                    Director
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                        {movie?.director || "Unknown Director"}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-xl font-semibold mb-3 text-gray-300">Cast</h3>
                                <div className="flex flex-wrap gap-2">
                                    {movie?.cast.map((actor: string, index: number) => (
                                        <span
                                            key={index}
                                            className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            {actor}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-12 bg-gray-800 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">
                        Reviews & Comments
                    </h2>

                    <MovieTabs
                        loadingMovieReview={loadingMovieReview}
                        userInfo={userInfo}
                        submitHandler={submitHandler}
                        rating={rating}
                        setRating={setRating}
                        comment={comment}
                        setComment={setComment}
                        movie={movie}
                    />
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
