import { useGetRandomMoviesQuery } from "../../redux/api/movies";
import HeroSlider from "../../components/HeroSlider";

const Header = () => {
    const { data: randomMovies } = useGetRandomMoviesQuery({});

    return (
        <div className="mx-auto">
            <div className="w-full">
                <HeroSlider data={randomMovies} />
            </div>
        </div>
    );
};

export default Header;
