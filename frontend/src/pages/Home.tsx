import Footer from "../components/Footer";
import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="">
                <Header />
            </div>
            <MoviesContainerPage />
            <Footer />
        </div>
    );
};

export default Home;
