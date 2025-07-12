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
    const getVisiblePages = () => {
        const delta = 2;
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-4">
            {/* Items per page selector */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Show:</span>
                <select
                    value={moviesPerPage}
                    onChange={(e) => onMoviesPerPageChange(Number(e.target.value))}
                    className="px-3 py-1 rounded-lg bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-400">per page</span>
            </div>

            {/* Page info */}
            <div className="text-sm text-gray-400">
                Showing {(currentPage - 1) * moviesPerPage + 1} to{" "}
                {Math.min(currentPage * moviesPerPage, totalMovies)} of {totalMovies} movies
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-1">
                {/* Previous button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 text-white hover:bg-gray-600"
                >
                    Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {getVisiblePages().map((page, index) => {
                        if (page === "...") {
                            return (
                                <span key={index} className="px-3 py-2 text-gray-400">
                                    ...
                                </span>
                            );
                        }

                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page as number)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 text-white hover:bg-gray-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
