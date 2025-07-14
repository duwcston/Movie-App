// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home.tsx";
// Auth
import AdminRoute from "./pages/Admin/AdminRoute.tsx";
import GenreList from "./pages/Admin/GenreList.tsx";
import CreateMovies from "./pages/Admin/CreateMovies.tsx";
import AdminMoviesList from "./pages/Admin/AdminMoviesList.tsx";
import UpdateMovie from "./pages/Admin/UpdateMovie.tsx";
import AllComments from "./pages/Admin/AllComments.tsx";
import AdminDashBoard from "./pages/Admin/Dashboard/AdminDashBoard.tsx";

// Restricted
import Login from "./pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";
import PrivateRoute from "./pages/Auth/PrivateRoute.tsx";
import Profile from "./pages/User/Profile.tsx";
import AllMovies from "./pages/Movies/AllMovies.tsx";
import MovieDetails from "./pages/Movies/MovieDetails.tsx";
import MovieRequest from "./pages/Movies/MovieRequest.tsx";
import AllRequest from "./pages/Admin/AllRequest.tsx";
import MoviePlayer from "./pages/Movies/MoviePlayer.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<AllMovies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/movies/player/:id" element={<MoviePlayer />} />
            <Route path="" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/request" element={<MovieRequest />} />
            </Route>

            <Route path="" element={<AdminRoute />}>
                <Route path="/admin/movies/genre" element={<GenreList />} />
                <Route path="/admin/movies/create" element={<CreateMovies />} />
                <Route path="/admin/movies-list" element={<AdminMoviesList />} />
                <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
                <Route path="/admin/movies/comments" element={<AllComments />} />
                <Route path="/admin/movies/dashboard" element={<AdminDashBoard />} />
                <Route path="/admin/movies/requests" element={<AllRequest />} />
            </Route>
        </Route>
    )
);

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
);
