import asyncHandler from "../middlewares/asyncHandler.js";
import Movie from "../models/Movie.js";

const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const reviewMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const movie = await Movie.findById(id);

        if (movie) {
            const alreadyReviewed = movie.reviews.find(review => review.user.toString() === req.user._id.toString());
            if (alreadyReviewed) {
                return res.status(400).json({ message: "Movie already reviewed" });
            }

            const review = {
                user: req.user._id,
                name: req.user.username,
                rating: Number(rating),
                comment: comment || "",
            };

            movie.reviews.push(review);
            movie.numReviews = movie.reviews.length;
            movie.rating = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;
            await movie.save();
            res.status(201).json({ message: "Review added successfully", review });
        }

        else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { movieId, commentId } = req.body;

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const reviewIndex = movie.reviews.findIndex(review => review._id.toString() === commentId);

        if (reviewIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        movie.reviews.splice(reviewIndex, 1);
        movie.numReviews = movie.reviews.length;
        movie.rating = movie.reviews.length > 0 ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length : 0;
        await movie.save();
        res.status(200).json({ message: "Comment deleted successfully", reviews: movie.reviews });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getNewMovies = async (req, res) => {
    try {
        const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(newMovies);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getTopMovies = async (req, res) => {
    try {
        const topMovies = await Movie.find().sort({ rating: -1 }).limit(10);
        res.status(200).json(topMovies);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getRandomMovies = async (req, res) => {
    try {
        const count = await Movie.countDocuments();
        const random = Math.floor(Math.random() * count);
        const randomMovies = await Movie.find().skip(random).limit(10);
        res.status(200).json(randomMovies);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export { createMovie, getAllMovies, getMovie, updateMovie, deleteMovie, reviewMovie, deleteComment, getNewMovies, getTopMovies, getRandomMovies };