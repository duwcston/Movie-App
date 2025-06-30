import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 32,
  }
})

export default mongoose.model("Genre", genreSchema);
