import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import Genre from "../models/Genre.js";

const createGenre = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "name is required" });
        }

        const genreExists = await Genre.findOne({ name: name });
        if (genreExists) {
            return res.status(400).json({ message: "Genre already exists" });
        }

        const newGenre = await new Genre({
            name: name
        }).save();

        res.status(201).json({
            _id: newGenre._id,
            name: newGenre.name
        });

    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
})

const updateGenre = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const genre = await Genre.findById({ _id: id });

        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }

        genre.name = name;

        const updatedGenre = await genre.save();
        res.status(200).json({
            _id: updatedGenre._id,
            name: updatedGenre.name
        });


    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
})

const deleteGenre = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const genre = await Genre.findByIdAndDelete({ _id: id });
        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }

        res.status(200).json({ message: "Genre deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
})

const listGenres = asyncHandler(async (req: Request, res: Response) => {
    try {
        const allGenres = await Genre.find({}).sort({ name: 1 });
        res.status(200).json(allGenres);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
})

const readGenre = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const genre = await Genre.findOne({ _id: id });
        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }

        res.status(200).json(genre);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
})

export { createGenre, updateGenre, deleteGenre, listGenres, readGenre };