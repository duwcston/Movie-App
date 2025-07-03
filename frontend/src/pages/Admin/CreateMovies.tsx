import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMovieMutation, useUploadMovieImageMutation } from "../../redux/api/movies";
import { useGetGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { GenreProps } from "./GenreList";

const CreateMovies = () => {
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
                genre: genres[0]?.id || "",
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
                genre: "",
                image: null,
                cast: [],
                rating: 0,
            });
            setSelectedImage(null);
            toast.success("Movie created successfully!");
        } catch (error) {
            console.error("Error creating movie:", error);
            toast.error("Failed to create movie.");
        }
    };

    return (
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
                            className="border p-2 w-full"
                        />
                    </label>
                    <label className="block mb-2 text-sm font-medium text-white">
                        Detail:
                        <textarea
                            name="detail"
                            value={movieData.detail}
                            onChange={handleChange}
                            className="border p-2 w-full bg-white text-black"
                            placeholder="Enter movie details"
                            rows={4}
                        ></textarea>
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
                    <label className="block mb-2 text-sm font-medium text-white">
                        Genre:
                        <select
                            name="genre"
                            value={movieData.genre}
                            className={`border p-2 w-full bg-white ${
                                movieData.genre === "" ? "text-gray-500" : "text-black"
                            }`}
                            onChange={handleChange}
                        >
                            <option value="" className="text-gray-500">
                                Select a genre
                            </option>
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
    );
};

export default CreateMovies;
