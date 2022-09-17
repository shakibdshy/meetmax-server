import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

// Sign UP
export const signup = async (req, res, next) => { 
    try {
        const { name, username, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return next(createError(400, "User already exists!"));
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

// Sign In
export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password, ...others } = user._doc;

        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(others);
    } catch (err) {
        next(err);
    }
};