import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateRequestMutation, useGetAllRequestsQuery } from "../../redux/api/requests";
import Footer from "../../components/Footer";

const MovieRequest = () => {
    const [createRequest] = useCreateRequestMutation();
    const { refetch } = useGetAllRequestsQuery({});
    const [requestData, setRequestData] = useState({
        movieTitle: "",
        detail: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setRequestData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!requestData.movieTitle) {
                toast.error("Please fill in all fields");
                return;
            }
            await createRequest(requestData).unwrap();
            refetch();
            setRequestData({ movieTitle: "", detail: "" });
            toast.success("Movie request submitted successfully!");
        } catch (error) {
            console.error("Error submitting movie request: ", error);
            toast.error("Failed to submit movie request");
        }
    };

    return (
        <div className="container flex flex-col justify-center pt-4">
            <div className="text-center text-2xl font-bold mt-4">
                If you want to request a movie, please fill out the form below:
            </div>
            <form className="flex flex-col items-center mt-8" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="movieTitle"
                    placeholder="Movie Title"
                    className="mb-4 p-2 border border-gray-300 rounded w-1/2"
                    value={requestData.movieTitle}
                    onChange={handleChange}
                />
                <textarea
                    name="detail"
                    placeholder="Additional Information / Reason for Request"
                    className="mb-4 p-2 border border-gray-300 rounded w-1/2 h-32 text-white"
                    value={requestData.detail}
                    onChange={handleChange}
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Submit Request
                </button>
            </form>
            <div className="text-center text-lg mt-8">
                Thank you for your interest! We will review your request and get back to you soon.
            </div>
            <div className="mt-12">
                <Footer />
            </div>
        </div>
    );
};

export default MovieRequest;
