import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const requestSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    movieTitle: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
    },
}, {
    timestamps: true,
})

export default mongoose.model("Request", requestSchema);