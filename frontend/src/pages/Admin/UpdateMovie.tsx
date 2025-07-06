import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    useGetMovieByIdQuery,
    useUpdateMovieMutation,
    useDeleteMovieMutation,
    useUploadMovieImageMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import { useGetGenresQuery } from "../../redux/api/genre";
import { GenreProps } from "../../types/genreTypes";

const UpdateMovie = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [movieData, setMovieData] = useState({
        name: "",
        year: 0,
        detail: "",
        genre: "",
        image: null,
        cast: [] as string[],
        rating: 0,
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { data: initialMovieData, isLoading: isLoadingMovie } = useGetMovieByIdQuery(id!);
    const [updateMovie, { isLoading: isUpdatingMovie, error: updateMovieError }] =
        useUpdateMovieMutation();
    const [deleteMovie, { isLoading: isDeletingMovie, error: deleteMovieError }] =
        useDeleteMovieMutation();
    const [uploadMovieImage, { isLoading: isUploadingImage, error: uploadImage }] =
        useUploadMovieImageMutation();
    const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery({});

    useEffect(() => {
        if (initialMovieData) {
            setMovieData({
                name: initialMovieData.name,
                year: initialMovieData.year,
                detail: initialMovieData.detail,
                genre: initialMovieData.genre,
                image: initialMovieData.image,
                cast: initialMovieData.cast,
                rating: initialMovieData.rating,
            });
        }
        if (updateMovieError) {
            toast.error("Failed to update movie: " + updateMovieError);
        }
        if (deleteMovieError) {
            toast.error("Failed to delete movie: " + deleteMovieError);
        }
        if (uploadImage) {
            toast.error("Failed to upload image: " + uploadImage);
        }
    }, [initialMovieData, updateMovieError, deleteMovieError, uploadImage]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "genre") {
            setMovieData((prevData) => ({
                ...prevData,
                genre: value,
            }));
        } else {
            setMovieData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleUpdateMovie = async () => {
        try {
            if (
                !movieData.name ||
                !movieData.year ||
                !movieData.detail ||
                !movieData.genre ||
                !movieData.cast
            ) {
                toast.error("Please fill in all required fields.");
                return;
            }

            let uploadImagePath = movieData.image;
            if (selectedImage) {
                const formData = new FormData();
                formData.append("image", selectedImage);
                const uploadResponse = await uploadMovieImage(formData);
                if (uploadResponse.data) {
                    uploadImagePath = uploadResponse.data.image;
                }
            }
            if (!uploadImagePath) {
                toast.error("Image upload failed.");
                return;
            }
            const updatedMovie = {
                ...movieData,
                image: uploadImagePath,
            };
            await updateMovie({ id: id, updatedMovie: updatedMovie });
            navigate("/admin/movies-list");
            toast.success("Movie updated successfully!");
        } catch (error) {
            toast.error("Failed to update movie: " + error);
            console.error("Update movie error:", error);
        }
    };

    const handleDeleteMovie = async () => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            try {
                await deleteMovie(id!);
                navigate("/admin/movies-list");
                toast.success("Movie deleted successfully!");
            } catch (error) {
                toast.error("Failed to delete movie: " + error);
                console.error("Delete movie error:", error);
            }
        }
    };

    return (
        <div className="container flex flex-col items-center justify-center mt-4 w-full">
            <form>
                <h1 className="mb-2">Update Movie</h1>
                <div className="mb-2">
                    <label className="block text-white">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={movieData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-white">Year</label>
                    <input
                        type="number"
                        name="year"
                        value={movieData.year}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-white">Detail</label>
                    <textarea
                        value={movieData.detail}
                        name="detail"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-2 text-sm font-medium text-white">
                        Genre:
                        <select
                            name="genre"
                            value={movieData.genre}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                            onChange={handleChange}
                        >
                            {isLoadingGenres ? (
                                <option>Loading genres...</option>
                            ) : (
                                genres?.map((genre: GenreProps) => (
                                    <option key={genre._id} value={genre._id}>
                                        {genre.name}
                                    </option>
                                ))
                            )}
                        </select>
                    </label>
                </div>
                <div className="mb-2">
                    <label className="block text-white">Cast (comma separated)</label>
                    <input
                        type="text"
                        name="cast"
                        value={movieData.cast.join(", ")}
                        onChange={(e) =>
                            setMovieData({
                                ...movieData,
                                cast: e.target.value.split(", "),
                            })
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-white">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex justify-between py-2">
                    <button
                        type="button"
                        onClick={handleUpdateMovie}
                        disabled={isUpdatingMovie || isUploadingImage}
                        className="bg-blue-900 text-white px-4 py-2 rounded"
                    >
                        {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteMovie}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        disabled={isDeletingMovie}
                    >
                        {isDeletingMovie ? "Deleting..." : "Delete Movie"}
                    </button>
                    {isLoadingMovie && <p>Loading movie data...</p>}
                </div>
            </form>
        </div>
    );
};

export default UpdateMovie;
