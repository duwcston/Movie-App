import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./pages/Auth/Navigation";

function App() {
    return (
        <>
            <ToastContainer />
            <Navigation />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default App;
