import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useCreateMovieMutation,
    useUploadMovieImageMutation,
    useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { useGetGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { GenreProps } from "../../types/genreTypes";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const CreateMovies = () => {
    const navigate = useNavigate();

    const [movieData, setMovieData] = useState({
        name: "",
        tmdbId: 0,
        year: 2000,
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
    const [createMovie, { isLoading: isCreatingMovie, error: createMovieError }] =
        useCreateMovieMutation();
    const [uploadMovieImage, { isLoading: isUploadingImage, error: uploadImageError }] =
        useUploadMovieImageMutation();
    const [uploadMovieCoverImage, { isLoading: isUploadingCoverImage }] =
        useUploadMovieImageMutation();
    const { refetch } = useGetAllMoviesQuery({});
    const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery({});

    useEffect(() => {
        if (createMovieError) {
            toast.error("Failed to create movie: " + createMovieError);
        }
        if (uploadImageError) {
            toast.error("Failed to upload image: " + uploadImageError);
        }
        if (genres) {
            setMovieData((prevData) => ({
                ...prevData,
                genre: genres[0]?.id ? [genres[0].id] : [],
            }));
        }
    }, [createMovieError, uploadImageError, genres]);

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

    const handleCreateMovie = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (
                !movieData.name ||
                !movieData.tmdbId ||
                !movieData.year ||
                !movieData.detail ||
                !movieData.cast ||
                !selectedImage ||
                !selectedCoverImage
            ) {
                console.error("All fields are required.");
                toast.error("Please fill in all fields.");
                return;
            }
            let uploadImagePath = null;
            let uploadCoverImagePath = null;
            if (selectedImage && selectedCoverImage) {
                const formData1 = new FormData();
                const formData2 = new FormData();
                formData1.append("image", selectedImage);
                formData2.append("image", selectedCoverImage);
                const uploadResponse = await uploadMovieImage(formData1);
                const uploadCoverResponse = await uploadMovieCoverImage(formData2);
                if (uploadResponse.data && uploadCoverResponse.data) {
                    uploadImagePath = uploadResponse.data.image;
                    uploadCoverImagePath = uploadCoverResponse.data.image;
                } else {
                    console.error("Image upload failed:", uploadResponse.error);
                    toast.error("Image upload failed.");
                    return;
                }

                await createMovie({
                    ...movieData,
                    image: uploadImagePath,
                    coverImage: uploadCoverImagePath,
                });
                navigate("/admin/movies-list");
                refetch();
                setMovieData({
                    name: "",
                    tmdbId: 0,
                    year: 0,
                    detail: "",
                    genre: [],
                    image: null,
                    coverImage: null,
                    director: "",
                    cast: [],
                    rating: 0,
                });
                setSelectedImage(null);
                toast.success("Movie created successfully!");
            }
        } catch (error) {
            console.error("Error creating movie:", error);
            toast.error("Failed to create movie.");
        }
    };

    return (
        <>
            <Sidebar />
            <div className="container flex justify-center min-h-screen overflow-hidden pt-2 sm:pt-4 px-3 sm:px-0">
                <form
                    onSubmit={handleCreateMovie}
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md"
                >
                    <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Create Movie</h1>
                    <div className="mb-3 sm:mb-4">
                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={movieData.name}
                                onChange={handleChange}
                                placeholder="Enter movie name"
                                className="border p-1.5 sm:p-2 w-full text-sm sm:text-base"
                            />
                        </label>
                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white">
                            TMDB ID:
                            <input
                                type="number"
                                name="tmdbId"
                                value={movieData.tmdbId}
                                onChange={handleChange}
                                placeholder="Enter TMDB ID"
                                className="border p-1.5 sm:p-2 w-full text-sm sm:text-base"
                            />
                        </label>
                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white">
                            Year:
                            <input
                                type="number"
                                name="year"
                                value={movieData.year}
                                onChange={handleChange}
                                min="2000"
                                max="2030"
                                className="border p-1 sm:p-1.5 w-full text-sm sm:text-base"
                            />
                        </label>
                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white">
                            Detail:
                            <textarea
                                name="detail"
                                value={movieData.detail}
                                onChange={handleChange}
                                className="border p-1.5 sm:p-2 w-full bg-white text-black rounded-md text-sm sm:text-base"
                                placeholder="Enter movie details"
                                rows={4}
                            ></textarea>
                        </label>
                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white">
                            Director:
                            <input
                                type="text"
                                name="director"
                                value={movieData.director || ""}
                                onChange={(e) =>
                                    setMovieData({
                                        ...movieData,
                                        director: e.target.value,
                                    })
                                }
                                className="border p-1.5 sm:p-2 w-full text-sm sm:text-base"
                                placeholder="Enter director's name"
                            />
                        </label>
                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white">
                            Cast:
                            <input
                                type="text"
                                name="cast"
                                placeholder="Enter cast separated by commas"
                                value={movieData.cast.join(", ")}
                                onChange={(e) =>
                                    setMovieData({
                                        ...movieData,
                                        cast: e.target.value.split(", "),
                                    })
                                }
                                className="border p-1.5 sm:p-2 w-full text-sm sm:text-base"
                            />
                        </label>
                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white">
                            Genres:
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
                                            ...(Array.isArray(movieData.genre)
                                                ? movieData.genre
                                                : []),
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
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                        {Array.isArray(movieData.genre) &&
                            movieData.genre.map((genreId: string, index: number) => {
                                const genre = genres?.find((g: GenreProps) => g._id === genreId);
                                return (
                                    <div
                                        key={`${genreId}-${index}`}
                                        className="bg-transparent border text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2"
                                    >
                                        <span>{genre?.name}</span>
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

                    <div className="mb-2 sm:mb-4">
                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white">
                            Image
                            <input
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={handleImageChange}
                                className={`w-full p-1.5 sm:p-2 border border-gray-300 rounded text-xs sm:text-sm ${
                                    !selectedImage ? "text-gray-500" : "text-black"
                                }`}
                            />
                        </label>
                    </div>
                    <div className="mb-2 sm:mb-4">
                        <label className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white">
                            Cover Image
                            <input
                                type="file"
                                accept="image/*"
                                name="coverImage"
                                onChange={handleCoverImageChange}
                                className={`w-full p-1.5 sm:p-2 border border-gray-300 rounded text-xs sm:text-sm ${
                                    !selectedCoverImage ? "text-gray-500" : "text-black"
                                }`}
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded cursor-pointer mt-2 mb-4 sm:mb-6 text-sm sm:text-base"
                        disabled={isCreatingMovie || isUploadingImage || isUploadingCoverImage}
                    >
                        {isCreatingMovie || isUploadingImage || isUploadingCoverImage
                            ? "Creating..."
                            : "Create Movie"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateMovies;
