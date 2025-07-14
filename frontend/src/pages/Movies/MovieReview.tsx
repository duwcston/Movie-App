import MovieTabs from "./MovieTabs";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAddMovieReviewMutation, useGetMovieByIdQuery } from "../../redux/api/movies";
import { toast } from "react-toastify";

const MovieReview = () => {
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
            setComment("");
            toast.success("Review submitted successfully");
        } catch (error) {
            console.error("Failed to create review:", error);
            toast.error("Failed to create review");
        }
    };

    return (
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
    );
};

export default MovieReview;
