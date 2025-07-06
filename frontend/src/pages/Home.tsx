import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="pt-6 pb-10">
                <Header />
            </div>
            <MoviesContainerPage />
        </div>
    );
};

export default Home;
