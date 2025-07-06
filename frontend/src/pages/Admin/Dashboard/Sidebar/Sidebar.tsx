import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-r border-gray-700">
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
                    >
                        <span className="text-lg font-medium">All Comments</span>
                    </NavLink>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
