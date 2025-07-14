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
            <div className="text-center text-2xl font-bold">All Requests</div>
            <section className="flex flex-col justify-center items-center">
                {requests?.map((request: RequestProps) => (
                    <div
                        key={request._id}
                        className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]"
                    >
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <strong className="text-[#B0B0B0]">User: {request.name}</strong>
                                <p className="my-2">{request.movieTitle}</p>
                                {request.detail.length === 0 ? (
                                    <></>
                                ) : (
                                    <p className="text-[#B0B0B0] mb-2">Reason: {request.detail}</p>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <p className="text-[#B0B0B0]">
                                    Requested At: {new Date(request.createdAt).toLocaleDateString()}
                                </p>
                                <button
                                    className="bg-green-500 text-white px-2 py-2 rounded mt-2"
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
