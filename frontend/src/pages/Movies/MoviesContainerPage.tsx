// import { useState } from "react";
import {
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
} from "../../redux/api/movies";
// import { useGetGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../components/SlideUtil";
// import { GenreProps } from "../../types/genreTypes";

const MoviesContainerPage = () => {
    const { data: newMovies } = useGetNewMoviesQuery({});
    const { data: topMovies } = useGetTopMoviesQuery({});
    const { data: randomMovies } = useGetRandomMoviesQuery({});
    // const { data: genres } = useGetGenresQuery({});

    // const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    // const handleGenreClick = (genreId) => {
    //     setSelectedGenre(genreId);
    // };

    // const filteredMovies = newMovies?.filter(
    //     (movie) => selectedGenre === null || movie.genre === selectedGenre
    // );

    return (
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
            {/* <nav className=" ml-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
                {genres?.map((genre: GenreProps) => (
                    <button
                        key={genre._id}
                        className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg ${
                            selectedGenre === genre._id ? "bg-gray-200" : ""
                        }`}
                        onClick={() => handleGenreClick(genre._id)}
                    >
                        {genre.name}
                    </button>
                ))}
            </nav> */}

            <section className="flex flex-col justify-center items-center w-full lg:w-[80%] mx-auto mt-8 lg:mt-0">
                <div className="w-full mb-8">
                    <h2 className="text-2xl font-bold mb-4">New Movies</h2>
                    <SliderUtil data={newMovies || []} />
                </div>

                <div className="w-full mb-8">
                    <h2 className="text-2xl font-bold mb-4">Top Movies</h2>
                    <SliderUtil data={topMovies || []} />
                </div>

                <div className="w-full mb-8">
                    <h2 className="text-2xl font-bold mb-4">Choose for you</h2>
                    <SliderUtil data={randomMovies || []} />
                </div>
            </section>
        </div>
    );
};

export default MoviesContainerPage;
