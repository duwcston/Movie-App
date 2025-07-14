import { useState } from "react";
import { AiOutlineLogin, AiOutlineUserAdd, AiOutlineGithub } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import { logout } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";

const Navigation = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutAPICall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutAPICall({}).unwrap();
            setDropdownOpen(false);
            dispatch(logout());
            navigate("/login");
            toast.success("Logout successful!");
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <div className="sticky top-0 left-0 right-0 bg-gray-800 opacity-80 text-white px-4 py-3 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto">
                <section className="flex justify-between items-center">
                    <div className="flex justify-start items-center space-x-8">
                        <Link
                            to="/"
                            className="flex items-center transition-transform transform hover:-translate-y-1 group relative"
                            onClick={() => setDropdownOpen(false)}
                        >
                            <span className="nav-item-name">Home</span>
                        </Link>

                        <Link
                            to="/movies"
                            className="flex items-center transition-transform transform hover:-translate-y-1 group relative"
                            onClick={() => setDropdownOpen(false)}
                        >
                            <span className="nav-item-name">Movies</span>
                        </Link>
                        {userInfo ? (
                            <Link
                                to="/request"
                                className="flex items-center transition-transform transform hover:-translate-y-1 group relative"
                                onClick={() => setDropdownOpen(false)}
                            >
                                <span className="nav-item-name">Movie Request</span>
                            </Link>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="relative flex justify-start items-center">
                        <a
                            href="https://github.com/duwcston/Movie-App"
                            className="flex items-center transition-transform transform hover:-translate-y-1 group relative"
                        >
                            <AiOutlineGithub className="mr-[1rem]" size={26} />
                            <span className="hidden nav-item-name">Github</span>
                            <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 -ml-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                Github
                            </span>
                        </a>
                        <button
                            onClick={toggleDropdown}
                            className="text-gray-800 focus:outline-none flex items-center"
                        >
                            {userInfo ? (
                                <span className="text-white">{userInfo.username}</span>
                            ) : (
                                <></>
                            )}

                            {userInfo && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ml-1 ${dropdownOpen}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                                    />
                                </svg>
                            )}
                        </button>

                        {dropdownOpen && userInfo && (
                            <ul className="absolute right-0 top-full mt-3 w-[8rem] space-y-2 bg-white text-gray-600 rounded-lg shadow-lg">
                                {userInfo.isAdmin && (
                                    <>
                                        <li>
                                            <Link
                                                to="/admin/movies/dashboard"
                                                className="block px-4 py-2 hover:bg-gray-200 rounded-t-lg"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                    </>
                                )}

                                <li>
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 hover:bg-gray-200"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        onClick={logoutHandler}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded-b-lg"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}

                        {!userInfo && (
                            <ul className="flex justify-between items-center">
                                <li>
                                    <Link
                                        to="/login"
                                        className="flex items-center transition-transform transform hover:-translate-y-1 group relative"
                                    >
                                        <AiOutlineLogin size={26} />
                                        <span className="hidden nav-item-name">Login</span>
                                        <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                            Login
                                        </span>
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/register"
                                        className="flex items-center transition-transform transform hover:-translate-y-1 group relative"
                                    >
                                        <AiOutlineUserAdd className="ml-4" size={26} />
                                        <span className="hidden nav-item-name">Register</span>
                                        <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                            Register
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Navigation;
