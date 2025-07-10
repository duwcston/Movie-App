import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    useGetAllMoviesQuery,
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
        coverImage: null,
        director: "",
        cast: [] as string[],
        rating: 0,
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(null);
    const { refetch } = useGetAllMoviesQuery({});
    const { data: initialMovieData, isLoading: isLoadingMovie } = useGetMovieByIdQuery(id!);
    const [updateMovie, { isLoading: isUpdatingMovie, error: updateMovieError }] =
        useUpdateMovieMutation();
    const [deleteMovie, { isLoading: isDeletingMovie, error: deleteMovieError }] =
        useDeleteMovieMutation();
    const [uploadMovieImage, { isLoading: isUploadingImage, error: uploadImage }] =
        useUploadMovieImageMutation();
    const [uploadMovieCoverImage, { isLoading: isUploadingCoverImage, error: uploadCoverImage }] =
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
                coverImage: initialMovieData.coverImage,
                director: initialMovieData.director,
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
        if (uploadCoverImage) {
            toast.error("Failed to upload cover image: " + uploadCoverImage);
        }
    }, [initialMovieData, updateMovieError, deleteMovieError, uploadImage, uploadCoverImage]);

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

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedCoverImage(file);
        }
    };

    const handleUpdateMovie = async () => {
        try {
            if (
                !movieData.name ||
                !movieData.year ||
                !movieData.detail ||
                !movieData.genre ||
                !movieData.cast ||
                !movieData.director
            ) {
                toast.error("Please fill in all required fields.");
                return;
            }

            let uploadImagePath = movieData.image;
            let uploadCoverImagePath = movieData.coverImage;

            if (selectedImage) {
                const formData1 = new FormData();
                formData1.append("image", selectedImage);
                const uploadResponse = await uploadMovieImage(formData1);
                if (uploadResponse.data) {
                    uploadImagePath = uploadResponse.data.image;
                } else {
                    toast.error("Image upload failed.");
                    return;
                }
            }

            if (selectedCoverImage) {
                const formData2 = new FormData();
                formData2.append("image", selectedCoverImage);
                const uploadCoverResponse = await uploadMovieCoverImage(formData2);
                if (uploadCoverResponse.data) {
                    uploadCoverImagePath = uploadCoverResponse.data.image;
                } else {
                    toast.error("Cover image upload failed.");
                    return;
                }
            }

            if (!uploadImagePath) {
                toast.error("Movie must have an image.");
                return;
            }
            if (!uploadCoverImagePath) {
                toast.error("Movie must have a cover image.");
                return;
            }
            const updatedMovie = {
                ...movieData,
                image: uploadImagePath,
                coverImage: uploadCoverImagePath,
            };
            await updateMovie({ id: id, updatedMovie: updatedMovie });
            navigate("/admin/movies-list");
            refetch();
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
                refetch();
                toast.success("Movie deleted successfully!");
            } catch (error) {
                toast.error("Failed to delete movie: " + error);
                console.error("Delete movie error:", error);
            }
        }
    };

    return (
        <div className="container flex flex-col items-center justify-center mt-4 w-full pt-12 min-w-screen">
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
                        rows={4}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-white">Director</label>
                    <input
                        type="text"
                        name="director"
                        value={movieData.director}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
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
                    <label className="block text-white">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-white">Cover Image</label>
                    <input
                        type="file"
                        name="coverImage"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex justify-between py-2">
                    <button
                        type="button"
                        onClick={handleUpdateMovie}
                        disabled={isUpdatingMovie || isUploadingImage || isUploadingCoverImage}
                        className="bg-blue-900 text-white px-4 py-2 rounded"
                    >
                        {isUpdatingMovie || isUploadingImage || isUploadingCoverImage
                            ? "Updating..."
                            : "Update Movie"}
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteMovie}
                        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
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
