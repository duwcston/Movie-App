import { useState, useEffect } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalMovies: number;
    moviesPerPage: number;
    onMoviesPerPageChange: (moviesPerPage: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalMovies,
    moviesPerPage,
    onMoviesPerPageChange,
}: PaginationProps) => {
    // State to track if we're on mobile
    const [isMobile, setIsMobile] = useState(false);

    // Effect to handle resize events
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        // Initial check
        checkIfMobile();

        // Add resize listener
        window.addEventListener("resize", checkIfMobile);

        // Cleanup
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    const getVisiblePages = () => {
        // Use smaller delta on mobile
        const delta = isMobile ? 1 : 2;
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...");
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 mt-6 sm:mt-8 px-2 sm:px-4">
            {/* Items per page selector */}
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <span className="text-gray-400">Show:</span>
                <select
                    value={moviesPerPage}
                    onChange={(e) => onMoviesPerPageChange(Number(e.target.value))}
                    className="px-2 sm:px-3 py-1 rounded-md sm:rounded-lg bg-gray-700 border border-gray-600 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
                <span className="text-gray-400">per page</span>
            </div>

            {/* Page info - Hidden on small screens */}
            <div className="hidden sm:block text-xs sm:text-sm text-gray-400">
                Showing {(currentPage - 1) * moviesPerPage + 1} to{" "}
                {Math.min(currentPage * moviesPerPage, totalMovies)} of {totalMovies} movies
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-1 sm:gap-2">
                {/* Previous button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 text-white hover:bg-gray-600"
                >
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                </button>

                {/* Page numbers - Simplified on mobile */}
                <div className="flex items-center gap-0.5 sm:gap-1">
                    {getVisiblePages().map((page, index) => {
                        // On mobile, show fewer page numbers
                        if (isMobile && page === "..." && index !== 1) {
                            return null;
                        }

                        if (page === "...") {
                            return (
                                <span
                                    key={index}
                                    className="px-2 sm:px-3 py-1 sm:py-2 text-gray-400"
                                >
                                    ...
                                </span>
                            );
                        }

                        // On mobile, only show current page, first, and last
                        if (
                            isMobile &&
                            typeof page === "number" &&
                            page !== 1 &&
                            page !== totalPages &&
                            page !== currentPage
                        ) {
                            return null;
                        }

                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page as number)}
                                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                                    currentPage === page
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-700 text-white hover:bg-gray-600"
                                }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                </div>

                {/* Next button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 text-white hover:bg-gray-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
