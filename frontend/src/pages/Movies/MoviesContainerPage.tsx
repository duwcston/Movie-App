import {
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import SliderUtil from "../../components/SlideUtil";

const MoviesContainerPage = () => {
    const { data: newMovies } = useGetNewMoviesQuery({});
    const { data: topMovies } = useGetTopMoviesQuery({});
    const { data: randomMovies } = useGetRandomMoviesQuery({});

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-8 bg-gray-900">
            <section className="space-y-12">
                <div className="movie-section">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">New Releases</h2>
                        <a
                            href="/movies"
                            className="text-blue-400 hover:text-blue-300 text-sm md:text-base"
                        >
                            View All →
                        </a>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <SliderUtil data={newMovies || []} />
                    </div>
                </div>

                <div className="movie-section">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Top Rated</h2>
                        <a
                            href="/movies"
                            className="text-blue-400 hover:text-blue-300 text-sm md:text-base"
                        >
                            View All →
                        </a>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <SliderUtil data={topMovies || []} />
                    </div>
                </div>

                <div className="movie-section">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Recommended For You
                        </h2>
                        <a
                            href="/movies"
                            className="text-blue-400 hover:text-blue-300 text-sm md:text-base"
                        >
                            View All →
                        </a>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <SliderUtil data={randomMovies || []} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MoviesContainerPage;
