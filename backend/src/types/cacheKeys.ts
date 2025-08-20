export const CacheKeys = {
    ALL_MOVIES: 'allMovies',
    TOP_MOVIES: 'topMovies',
    RANDOM_MOVIES: 'randomMovies',
    NEW_MOVIES: 'newMovies',
    MOVIE_BY_ID: (id: string) => `movie:${id}`,
} as const;