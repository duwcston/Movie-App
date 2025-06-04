import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import asyncHandler from '../middlewares/asyncHandler.js';
import createToken from '../utils/createToken.js';

const createUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields: name, email, and password');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists with this email');
    }

    // Hash the user password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // Create new User
    const newUser = new User({ userName, email, password: hashPassword })

    // Store User into db
    try {
        await newUser.save();
        createToken(res, newUser._id)

        res.status(201).json({
            _id: newUser._id,
            userName: newUser.userName,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })

    } catch (error) {
        res.status(400)
        console.log(error)
        throw new Error("Invalid user data")
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email })

    if (userExists) {
        const isPasswordValid = await bcrypt.compare(password, userExists.password)

        if (isPasswordValid) {
            createToken(res, userExists._id)

            res.status(201).json({
                _id: userExists._id,
                userName: userExists.userName,
                email: userExists.email,
                isAdmin: userExists.isAdmin
            })
        } else {
            res.status(401).json({ message: "Invalid Password" })
        }
    } else {
        res.status(401).json({ message: "User not found" })
    }
})

const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: "Logged out successfully" })
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.userName = req.body.userName || user.userName;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashPassword
        }

        const updatedUser = await user.save()

        res.status(201).json({
            _id: updatedUser._id,
            userName: updatedUser.userName,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }

})

export { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile };
