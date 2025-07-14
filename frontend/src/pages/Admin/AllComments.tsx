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
            <div className="text-center text-2xl font-bold">All Comments</div>
            <div className="text-center text-2xl font-bold"></div>
            {movie?.map((movie: MovieProps) => (
                <section key={movie._id} className="flex flex-col justify-center items-center">
                    {movie?.reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]"
                        >
                            <div className="flex justify-between">
                                <strong className="text-[#B0B0B0]">User: {review.name}</strong>
                                <p className="text-[#B0B0B0]">Rating: {review.rating}</p>
                                <p className="text-[#B0B0B0]">Movie: {movie.name}</p>
                                <p className="text-[#B0B0B0]">
                                    {review.createdAt.substring(0, 10)}
                                </p>
                            </div>

                            <p className="my-4">{review.comment}</p>

                            <button
                                className="text-red-500"
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
