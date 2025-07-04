import SliderUtil from "../../components/SlideUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
    const { data } = useGetNewMoviesQuery({});

    return (
        <div className="flex flex-col mt-[2rem] md:flex-row md:justify-between items-center md:items-start w-full md:w-[95%] mx-auto">
            <nav className="w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0">
                <Link
                    to="/"
                    className="transition duration-300 ease-in-out hover:bg-blue-900 block p-2 rounded mb-1 md:mb-2 text-lg text-white"
                >
                    Home
                </Link>
                <Link
                    to="/movies"
                    className="transition duration-300 ease-in-out hover:bg-blue-900 block p-2 rounded mb-1 md:mb-2 text-lg text-white"
                >
                    Browse Movies
                </Link>
            </nav>
            <div className="w-full md:w-[80%] mr-0 md:mr-2">
                <SliderUtil data={data}></SliderUtil>
            </div>
        </div>
    );
};

export default Header;
