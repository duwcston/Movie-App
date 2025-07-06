import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMovieMutation, useUploadMovieImageMutation } from "../../redux/api/movies";
import { useGetGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { GenreProps } from "../../types/genreTypes";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const CreateMovies = () => {
    const navigate = useNavigate();

    const [movieData, setMovieData] = useState({
        name: "",
        year: 2000,
        detail: "",
        genre: [] as string[],
        image: null,
        director: "",
        cast: [] as string[],
        rating: 0,
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [createMovie, { isLoading: isCreatingMovie, error: createMovieError }] =
        useCreateMovieMutation();
    const [uploadMovieImage, { isLoading: isUploadingImage, error: uploadImageError }] =
        useUploadMovieImageMutation();
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

    const handleCreateMovie = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (
                !movieData.name ||
                !movieData.year ||
                !movieData.detail ||
                !movieData.cast ||
                !selectedImage
            ) {
                console.error("All fields are required.");
                toast.error("Please fill in all fields.");
                return;
            }
            let uploadImagePath = null;
            if (selectedImage) {
                const formData = new FormData();
                formData.append("image", selectedImage);
                const uploadResponse = await uploadMovieImage(formData);
                if (uploadResponse.data) {
                    uploadImagePath = uploadResponse.data.image;
                } else {
                    console.error("Image upload failed:", uploadResponse.error);
                    toast.error("Image upload failed.");
                    return;
                }

                await createMovie({
                    ...movieData,
                    image: uploadImagePath,
                });
                navigate("/admin/movies-list");
                setMovieData({
                    name: "",
                    year: 0,
                    detail: "",
                    genre: [],
                    image: null,
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
            <div className="container flex flex-col justify-center items-center mt-4">
                <form onSubmit={handleCreateMovie} className="w-full max-w-md">
                    <h1 className="mb-4">Create Movie</h1>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-white">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={movieData.name}
                                onChange={handleChange}
                                placeholder="Enter movie name"
                                className="border p-2 w-full"
                            />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-white">
                            Year:
                            <input
                                type="number"
                                name="year"
                                value={movieData.year}
                                onChange={handleChange}
                                min="2000"
                                max="2030"
                                className="border p-1 w-full"
                            />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-white">
                            Detail:
                            <textarea
                                name="detail"
                                value={movieData.detail}
                                onChange={handleChange}
                                className="border p-2 w-full bg-white text-black rounded-md"
                                placeholder="Enter movie details"
                                rows={2}
                            ></textarea>
                        </label>
                        <label className="block mb-2 text-sm font-medium text-white">
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
                                className="border p-2 w-full"
                                placeholder="Enter director's name"
                            />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-white">
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
                                className="border p-2 w-full"
                            />
                        </label>
                        <label className="block mb-2 text-sm font-medium text-white">Genres:</label>
                        <select
                            name="genre"
                            className="border p-1 w-full bg-white text-black rounded-md"
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
                            {/* <option value="">Select a genre</option> */}
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
                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(movieData.genre) &&
                            movieData.genre.map((genreId: string) => {
                                const genre = genres?.find((g: GenreProps) => g._id === genreId);
                                return (
                                    <div
                                        key={genreId}
                                        className="bg-transparent border text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 mb-2"
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
                                            className="bg-transparent hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                        >
                                            X
                                        </button>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-white">
                            Image
                            <input
                                type="file"
                                accept="image/*"
                                name="image"
                                onChange={handleImageChange}
                                className={`w-full p-2 border border-gray-300 rounded ${
                                    !selectedImage ? "text-gray-500" : "text-black"
                                }`}
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-900 text-white px-4 py-2 rounded cursor-pointer"
                        disabled={isCreatingMovie || isUploadingImage}
                    >
                        {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateMovies;
