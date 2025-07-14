import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tmdbId: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    year: {
        type: Number,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    genre: [{
        type: ObjectId,
        ref: "Genre",
        required: true,
    }],
    cast: [{
        type: String
    }],
    director: {
        type: String,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});


export default mongoose.model("Movie", movieSchema);
