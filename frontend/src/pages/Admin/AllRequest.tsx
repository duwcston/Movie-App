import Sidebar from "./Dashboard/Sidebar/Sidebar";
import { useGetAllRequestsQuery, useDeleteRequestMutation } from "../../redux/api/requests";
import { toast } from "react-toastify";
import { RequestProps } from "../../types/requestTypes";

const AllRequest = () => {
    const { data: requests, refetch } = useGetAllRequestsQuery({});
    const [deleteRequest] = useDeleteRequestMutation();

    const handleDeleteRequest = async (requestId: string) => {
        try {
            await deleteRequest(requestId);
            toast.success("Request Added");
            refetch();
        } catch (error) {
            console.error("Error deleting request: ", error);
            toast.error("Failed to delete request");
        }
    };
    return (
        <div>
            <Sidebar />
            <div className="text-center text-xl sm:text-2xl font-bold mt-4 md:mt-0">
                All Requests
            </div>
            <section className="flex flex-col justify-center items-center px-3 sm:px-4">
                {requests?.map((request: RequestProps) => (
                    <div
                        key={request._id}
                        className="bg-[#1A1A1A] p-3 sm:p-4 rounded-lg w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mt-3 sm:mt-4 md:mt-[2rem]"
                    >
                        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
                            <div className="flex flex-col">
                                <strong className="text-[#B0B0B0] text-sm sm:text-base">
                                    User: {request.name}
                                </strong>
                                <p className="my-1 sm:my-2 text-sm sm:text-base">
                                    {request.movieTitle}
                                </p>
                                {request.detail.length === 0 ? (
                                    <></>
                                ) : (
                                    <p className="text-[#B0B0B0] mb-1 sm:mb-2 text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">
                                        Reason: {request.detail}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between">
                                <p className="text-[#B0B0B0] text-xs sm:text-sm">
                                    {new Date(request.createdAt).toLocaleDateString()}
                                </p>
                                <button
                                    className="bg-green-500 text-white px-2 py-1 sm:py-2 rounded text-xs sm:text-sm"
                                    onClick={() => handleDeleteRequest(request._id)}
                                >
                                    Finish Request
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default AllRequest;
