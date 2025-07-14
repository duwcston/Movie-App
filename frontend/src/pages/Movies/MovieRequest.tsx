import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateRequestMutation, useGetAllRequestsQuery } from "../../redux/api/requests";
import Footer from "../../components/Footer";

const MovieRequest = () => {
    const [createRequest] = useCreateRequestMutation();
    const { refetch } = useGetAllRequestsQuery({});
    const [isSubmitting, setIsSubmitting] = useState(false);
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

        if (!requestData.movieTitle) {
            toast.error("Please fill in the movie title");
            return;
        }

        try {
            setIsSubmitting(true);
            await createRequest(requestData).unwrap();
            refetch();
            setRequestData({ movieTitle: "", detail: "" });
            toast.success("Movie request submitted successfully!");
        } catch (error) {
            console.error("Error submitting movie request: ", error);
            toast.error("Failed to submit movie request");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center mt-4 text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white">
                    Request a Movie
                </h1>

                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-700/50">
                    <p className="text-center text-base sm:text-lg text-gray-300 mb-6">
                        Is there a movie you'd like to see on our platform? Let us know by filling
                        out this form!
                    </p>

                    <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label
                                htmlFor="movieTitle"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Movie Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="movieTitle"
                                name="movieTitle"
                                placeholder="Enter the movie title you want to request"
                                className="w-full p-3 border border-gray-600 bg-gray-700/80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={requestData.movieTitle}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label
                                htmlFor="detail"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Additional Details (optional)
                            </label>
                            <textarea
                                id="detail"
                                name="detail"
                                placeholder="Release year, director, actors, or why you'd like to see this movie"
                                className="w-full p-3 border border-gray-600 rounded-lg h-32 sm:h-36 bg-gray-700/80 text-white resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={requestData.detail}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="mt-2 flex justify-center sm:justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-blue-500/20 flex items-center ${
                                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                                }`}
                            >
                                {isSubmitting ? (
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
                                    "Submit Request"
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center text-base sm:text-lg mt-8 text-gray-300 max-w-2xl mx-auto">
                    <p>
                        Thank you for your interest! We will review your request and try to add it
                        to our collection.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                        Our team typically processes requests within 2-3 business days.
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <Footer />
            </div>
        </div>
    );
};

export default MovieRequest;
