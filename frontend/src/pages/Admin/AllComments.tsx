import { useDeleteCommentMutation, useGetAllMoviesQuery } from "../../redux/api/movies";
import { toast } from "react-toastify";
import { MovieProps } from "../../types/movieTypes";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const AllComments = () => {
    const { data: movie, refetch } = useGetAllMoviesQuery({});

    const [deleteComment] = useDeleteCommentMutation();

    const handleDeleteComment = async (movieId: string, commentId: string) => {
        try {
            await deleteComment({ movieId, commentId });
            toast.success("Comment Deleted");
            refetch();
        } catch (error) {
            console.error("Error deleting comment: ", error);
            toast.error("Failed to delete comment");
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="text-center text-xl sm:text-2xl font-bold mt-4 md:mt-0">
                All Comments
            </div>
            {movie?.map((movie: MovieProps) => (
                <section
                    key={movie._id}
                    className="flex flex-col justify-center items-center px-3 sm:px-4"
                >
                    {movie?.reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-[#1A1A1A] p-3 sm:p-4 rounded-lg w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mt-3 sm:mt-4 md:mt-[2rem]"
                        >
                            <div className="flex flex-wrap gap-2 justify-between">
                                <strong className="text-[#B0B0B0] text-xs sm:text-sm">
                                    User: {review.name}
                                </strong>
                                <p className="text-[#B0B0B0] text-xs sm:text-sm">
                                    Rating: {review.rating}
                                </p>
                                <p className="text-[#B0B0B0] text-xs sm:text-sm">
                                    Movie: {movie.name}
                                </p>
                                <p className="text-[#B0B0B0] text-xs sm:text-sm">
                                    {review.createdAt.substring(0, 10)}
                                </p>
                            </div>

                            <p className="my-2 sm:my-4 text-sm sm:text-base">{review.comment}</p>

                            <button
                                className="text-red-500 text-sm sm:text-base py-1 px-2 hover:bg-red-500 hover:text-white rounded"
                                onClick={() => handleDeleteComment(movie._id, review._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};
export default AllComments;
