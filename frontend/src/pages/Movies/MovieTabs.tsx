import { Link } from "react-router-dom";
import { MovieTabsProps } from "../../types/movieTabTypes";

const MovieTabs = ({
    userInfo,
    submitHandler,
    comment,
    setComment,
    movie,
    loadingMovieReview,
    rating,
    setRating,
}: MovieTabsProps) => {
    return (
        <div className="space-y-10">
            {/* Write Review Section */}
            <section className="mb-8">
                {userInfo ? (
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="rating"
                                className="block text-lg font-medium text-gray-300"
                            >
                                Rating
                            </label>
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating && setRating(star)}
                                        className="text-2xl focus:outline-none"
                                    >
                                        <span
                                            className={
                                                star <= (rating || 0)
                                                    ? "text-yellow-400"
                                                    : "text-gray-600"
                                            }
                                        >
                                            ★
                                        </span>
                                    </button>
                                ))}
                                <span className="ml-2 text-gray-400">({rating} of 5)</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="comment"
                                className="block text-lg font-medium text-gray-300"
                            >
                                Your Review
                            </label>
                            <textarea
                                id="comment"
                                rows={4}
                                placeholder="Share your thoughts about this movie..."
                                required
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loadingMovieReview}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            {loadingMovieReview ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                "Submit Review"
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="bg-gray-700/50 p-6 rounded-lg text-center">
                        <p className="text-gray-300 mb-4">
                            Please sign in to leave a review for this movie.
                        </p>
                        <Link
                            to="/login"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition duration-300"
                        >
                            Sign In
                        </Link>
                    </div>
                )}
            </section>

            {/* Reviews List Section */}
            <section className="mt-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-300">
                    User Reviews {movie?.reviews.length ? `(${movie.reviews.length})` : ""}
                </h3>

                {movie?.reviews && movie.reviews.length === 0 ? (
                    <div className="text-center py-8 bg-gray-700/30 rounded-lg">
                        <p className="text-gray-400">No reviews yet. Be the first to review!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {movie?.reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-blue-500"
                            >
                                <div className="flex flex-wrap justify-between items-center mb-3">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                                            {review.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-gray-200">
                                            {review.name} ({review.rating}{" "}
                                            <span className="text-yellow-400">{"★"}</span>)
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                                <p className="text-gray-300">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default MovieTabs;
