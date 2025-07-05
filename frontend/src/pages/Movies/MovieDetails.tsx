import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetMovieByIdQuery, useAddMovieReviewMutation } from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import { RootState } from "../../redux/store";

const MovieDetails = () => {
    const { id: movieId } = useParams();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const { data: movie, refetch } = useGetMovieByIdQuery(movieId);
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

            toast.success("Review created successfully");
        } catch (error) {
            console.error("Failed to create review:", error);
            toast.error("Failed to create review");
        }
    };

    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="py-4">
                <Link to="/" className="text-white font-semibold hover:underline">
                    Go Back
                </Link>
            </div>

            <div className="mt-4">
                <div className="flex justify-center items-center">
                    <img
                        src={movie?.image}
                        alt={movie?.name}
                        className="w-full max-w-3xl rounded object-cover"
                    />
                </div>

                {/* Movie details section */}
                <div className="mt-8 flex flex-col lg:flex-row justify-between gap-8">
                    <section className="lg:w-2/3">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl my-4 font-extrabold">
                            {movie?.name}
                        </h2>
                        <p className="my-4 text-[#B0B0B0]">{movie?.detail}</p>
                    </section>

                    <div className="lg:w-1/3">
                        <p className="text-xl md:text-2xl font-semibold">
                            Releasing Date: {movie?.year}
                        </p>

                        <div className="mt-4">
                            <h3 className="font-semibold text-lg">Cast:</h3>
                            {movie?.cast.map((c: never, index: number) => (
                                <div key={index} className="mt-2">
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
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
