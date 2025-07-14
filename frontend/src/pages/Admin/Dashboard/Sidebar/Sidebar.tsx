import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-16 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                aria-label="Toggle sidebar"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-transparent backdrop-blur-xs z-30"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-r border-gray-700 pt-10 z-40 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                <aside className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-700">
                        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <NavLink
                            to="/admin/movies/dashboard"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-md ${
                                    isActive
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="text-lg font-medium">Dashboard</span>
                        </NavLink>
                        <NavLink
                            to="/admin/movies/genre"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-md ${
                                    isActive
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="text-lg font-medium">Create Genre</span>
                        </NavLink>
                        <NavLink
                            to="/admin/movies/create"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-md ${
                                    isActive
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="text-lg font-medium">Create Movie</span>
                        </NavLink>
                        <NavLink
                            to="/admin/movies-list"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-md ${
                                    isActive
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="text-lg font-medium">Update Movie</span>
                        </NavLink>
                        <NavLink
                            to="/admin/movies/comments"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-md ${
                                    isActive
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="text-lg font-medium">All Comments</span>
                        </NavLink>
                        <NavLink
                            to="/admin/movies/requests"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-md ${
                                    isActive
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="text-lg font-medium">All Requests</span>
                        </NavLink>
                    </nav>
                </aside>
            </div>
        </>
    );
};

export default Sidebar;
