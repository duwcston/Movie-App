import { useParams } from "react-router-dom";
import BackToTopButton from "../../components/BackToTopButton";
import MovieReview from "./MovieReview";
import { useGetMovieByIdQuery } from "../../redux/api/movies";
import Footer from "../../components/Footer";
import { PLAYER_OPTION, PLAYER_URL } from "../../redux/constants";

const MoviePlayer = () => {
    const { id: movieId } = useParams();
    const { data: movie } = useGetMovieByIdQuery(movieId);
    const tmdbId = movie?.tmdbId;

    return (
        <div className="min-h-screen bg-gray-900 text-white pb-16">
            <div className="container mx-auto px-4 relative z-10">
                <div className="pt-14">
                    <div className="container mx-auto px-4">
                        <iframe
                            src={`${PLAYER_URL}/${tmdbId}?${PLAYER_OPTION}`}
                            width="100%"
                            height="100%"
                            className="aspect-video rounded-lg shadow-lg"
                            title="Movie Player"
                            allowFullScreen
                            loading="lazy"
                            frameBorder="0"
                        ></iframe>
                    </div>
                </div>
                <BackToTopButton />
                <MovieReview />
            </div>
            <div className="mt-6">
                <Footer />
            </div>
        </div>
    );
};

export default MoviePlayer;
