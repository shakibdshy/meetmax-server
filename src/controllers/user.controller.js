import { createError } from "../error.js"
import User from "../models/User.js";

// Get All Users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users.reverse());
    } catch (err) {
        next(err);
    }
};

// Get User by Id
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        next(err);
    }
};

// Get User by Id
export const updateUser = async (req, res, next) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                next(err);
            }
        }
        try { 
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json(user);
        } catch (err) { }
    } else {
        return next(createError(403, "You can update only your account!"));
    }
};

// Get User by Id
export const deleteUser = async (req, res, next) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
};

// Follow a user
export const followUser = async (req, res, next) => { 
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("User has been followed.");
            } else {
                res.status(403).json("You already follow this user.");
            }
        } catch (err) {
            next(err);
        }
    } else {
        res.status(403).json("You can't follow yourself.");
    }
}