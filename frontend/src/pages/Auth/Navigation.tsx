import { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import { logout } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";

const Navigation = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            let threshold = 100;
            if (userInfo.isAdmin) {
                threshold = 250;
            }
            const isNearBottom = window.innerHeight - event.clientY <= threshold;
            setIsVisible(isNearBottom);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [userInfo.isAdmin]);

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
        <div
            className={`fixed bottom-10 rounded-lg bg-gray-800 text-white w-1/3 max-w-[800px] mx-auto p-4 z-50 transform -translate-x-1/2 left-1/2 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <section className="flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <Link
                        to="/"
                        className="flex items-center transition-transform transform hover:-translate-y-2"
                    >
                        <AiOutlineHome className="mr-2 mt-[4px]" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Home</span>
                    </Link>

                    <Link
                        to="/movies"
                        className="flex items-center transition-transform transform hover:-translate-y-2 ml-[1rem]"
                    >
                        <MdOutlineLocalMovies className="" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Shop</span>
                    </Link>
                </div>
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="text-gray-800 focus:outline-none flex items-center"
                    >
                        {userInfo ? <span className="text-white">{userInfo.username}</span> : <></>}

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
                        <ul
                            className={`absolute right-0 mt-2 mr-2 w-[8rem] space-y-2 bg-white text-gray-600 ${
                                !userInfo.isAdmin ? "-top-24" : "-top-38"
                            }`}
                        >
                            {userInfo.isAdmin && (
                                <>
                                    <li>
                                        <Link
                                            to="/admin/movies/dashboard"
                                            className="block px-4 py-2 hover:bg-gray-200"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                </>
                            )}

                            <li>
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                                    Profile
                                </Link>
                            </li>

                            <li>
                                <button
                                    onClick={logoutHandler}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
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
                                    className="flex items-center transition-transform transform hover:-translate-y-2"
                                >
                                    <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                                    <span className="hidden nav-item-name">Login</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/register"
                                    className="flex items-center transition-transform transform hover:-translate-y-2"
                                >
                                    <AiOutlineUserAdd size={26} />
                                    <span className="hidden nav-item-name">Register</span>
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Navigation;
