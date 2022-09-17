import Post from "../models/Post.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

// Get All Posts
export const getAllPost = async (req, res, next) => { 
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

// Create a new Post
export const createPost = async (req, res, next) => { 
    try {
        const newPost = await Post.create(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
}

// Update Post
export const updatePost = async (req, res, next) => { 
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
}

// Delete Post
export const deletePost = async (req, res, next) => { 
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted...");
    } catch (error) {
        next(error);
    }
}