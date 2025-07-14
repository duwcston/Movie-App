import Request from "../models/Request.js";

const createRequest = async (req, res) => {
    const { movieTitle, detail } = req.body;

    try {
        if (!movieTitle) {
            return res.status(400).json({ message: "Movie title is required" });
        }

        const newRequest = new Request({
            user: req.user._id,
            name: req.user.username,
            movieTitle: movieTitle,
            detail: detail || "",
        });
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('user', 'name email').sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const deleteRequest = async (req, res) => {
    try {
        const {id: requestId} = req.params;
        const requestIndex = await Request.findByIdAndDelete(requestId);
        if (!requestIndex) {
            return res.status(404).json({ message: "Request not found" });
        }
        res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export {
    createRequest,
    getAllRequests,
    deleteRequest
};