export const BASE_URL = import.meta.env.PROD 
  ? "https://movie-app-backend-ufe6.onrender.com" 
  : ""
export const USERS_URL = "/api/v1/users"
export const GENRE_URL = "/api/v1/genre"
export const MOVIES_URL = "/api/v1/movies"
export const UPLOADS_URL = "/api/v1/uploads"
export const REQUESTS_URL = "/api/v1/requests"

export const TMDB_URL = "https://api.themoviedb.org/3"
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const PLAYER_URL = "https://vidlink.pro/movie"
export const PLAYER_OPTION = "primaryColor=63b8bc&secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=jw&title=true&poster=true&autoplay=false&nextbutton=false"