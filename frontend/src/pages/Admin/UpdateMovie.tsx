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
        tmdbId: 0,
        year: 0,
        detail: "",
        genre: [] as string[],
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
                tmdbId: initialMovieData.tmdbId,
                year: initialMovieData.year,
                detail: initialMovieData.detail,
                genre: Array.isArray(initialMovieData.genre)
                    ? initialMovieData.genre.map((g: GenreProps) => g._id || g)
                    : [],
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
                genre: [value],
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
                !movieData.tmdbId ||
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
        <div className="container flex justify-center items-center min-h-screen mt-2 sm:mt-4 pt-2 sm:pt-4 overflow-hidden px-3 sm:px-0">
            <form className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Update Movie</h1>
                <div className="mb-2 sm:mb-3">
                    <label className="block text-white text-sm sm:text-base">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={movieData.name}
                        onChange={handleChange}
                        className="w-full p-1.5 sm:p-2 border border-gray-300 rounded text-sm sm:text-base"
                        required
                    />
                </div>
                <div className="mb-2 sm:mb-3">
                    <label className="block text-white text-sm sm:text-base">TMDB ID</label>
                    <input
                        type="number"
                        name="tmdbId"
                        value={movieData.tmdbId}
                        onChange={handleChange}
                        className="w-full p-1.5 sm:p-2 border border-gray-300 rounded text-sm sm:text-base"
                        required
                    />
                </div>
                <div className="mb-2 sm:mb-3">
                    <label className="block text-white text-sm sm:text-base">Year</label>
                    <input
                        type="number"
                        name="year"
                        value={movieData.year}
                        onChange={handleChange}
                        className="w-full p-1.5 sm:p-2 border border-gray-300 rounded text-sm sm:text-base"
                        required
                    />
                </div>
                <div className="mb-2 sm:mb-3">
                    <label className="block text-white text-sm sm:text-base">Detail</label>
                    <textarea
                        value={movieData.detail}
                        name="detail"
                        onChange={handleChange}
                        className="w-full p-1.5 sm:p-2 border border-gray-300 rounded bg-white text-black text-sm sm:text-base"
                        rows={4}
                        required
                    />
                </div>
                <div className="mb-2 sm:mb-3">
                    <label className="block text-white text-sm sm:text-base">Director</label>
                    <input
                        type="text"
                        name="director"
                        value={movieData.director}
                        onChange={handleChange}
                        className="w-full p-1.5 sm:p-2 border border-gray-300 rounded text-sm sm:text-base"
                        required
                    />
                </div>
                <div className="mb-2 sm:mb-3">
                    <label className="block text-white text-sm sm:text-base">
                        Cast (comma separated)
                    </label>
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
                        className="w-full p-1.5 sm:p-2 border border-gray-300 rounded text-sm sm:text-base"
                        required
                    />
                </div>
                <div className="mb-2 sm:mb-3">
                    <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white">
                        Genre:
                    </label>
                    <select
                        name="genre"
                        className="border p-1 sm:p-1.5 w-full bg-white text-black rounded-md text-sm sm:text-base"
                        onChange={(e) => {
                            const selectedGenreId = e.target.value;
                            const selectedGenre = genres?.find(
                                (g: GenreProps) => g._id === selectedGenreId
                            );
                            if (selectedGenre && !movieData.genre.includes(selectedGenreId)) {
                                setMovieData({
                                    ...movieData,
                                    genre: [
                                        ...(Array.isArray(movieData.genre) ? movieData.genre : []),
                                        selectedGenreId,
                                    ],
                                });
                            }
                        }}
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
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                    {Array.isArray(movieData.genre) &&
                        movieData.genre.map((genreId: string, index: number) => {
                            const genre = genres?.find((g: GenreProps) => g._id === genreId);
                            return (
                                <div
                                    key={`${genreId}-${index}`}
                                    className="bg-transparent border text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
                                >
                                    <span>{genre?.name || "Can't define"}</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMovieData({
                                                ...movieData,
                                                genre: movieData.genre.filter(
                                                    (id: string) => id !== genreId
                                                ),
                                            });
                                        }}
                                        className="bg-transparent hover:bg-red-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs"
                                    >
                                        X
                                    </button>
                                </div>
                            );
                        })}
                </div>
                <div className="mb-2 sm:mb-3">
                    <label className="block text-white text-sm sm:text-base">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-1.5 sm:p-2 border border-gray-300 rounded text-xs sm:text-sm"
                    />
                </div>
                <div className="mb-2 sm:mb-3">
                    <label className="block text-white text-sm sm:text-base">Cover Image</label>
                    <input
                        type="file"
                        name="coverImage"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="w-full p-1.5 sm:p-2 border border-gray-300 rounded text-xs sm:text-sm"
                    />
                </div>
                <div className="flex flex-col sm:flex-row justify-between py-2 gap-2 sm:gap-0">
                    <button
                        type="button"
                        onClick={handleUpdateMovie}
                        disabled={isUpdatingMovie || isUploadingImage || isUploadingCoverImage}
                        className="bg-blue-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base"
                    >
                        {isUpdatingMovie || isUploadingImage || isUploadingCoverImage
                            ? "Updating..."
                            : "Update Movie"}
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteMovie}
                        className="bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded cursor-pointer text-sm sm:text-base"
                        disabled={isDeletingMovie}
                    >
                        {isDeletingMovie ? "Deleting..." : "Delete Movie"}
                    </button>
                    {isLoadingMovie && <p className="text-xs sm:text-sm">Loading movie data...</p>}
                </div>
            </form>
        </div>
    );
};

export default UpdateMovie;
