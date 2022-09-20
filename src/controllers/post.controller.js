import Post from "../models/Post.js";
import User from "../models/User.js";

// Get All Posts
export const getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

// Get Post By Id
export const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
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
export const updatePostById = async (req, res, next) => {
    try {
        const updatedPost = await Post.findById(req.params.id);
        if (updatedPost.userId === req.body.userId) {
            await updatedPost.updateOne({ $set: req.body });
            res.status(200).json("Post has been updated");
        } else {
            res.status(403).json("You can only update your post");
        }
    } catch (error) {
        next(error);
    }
}

// Delete Post
export const deletePost = async (req, res, next) => {
    try {
        const deletePost = await Post.findById(req.params.id);
        if (deletePost.userId === req.body.userId) {
            await deletePost.deleteOne();
            res.status(200).json("Post has been deleted");
        } else {
            res.status(403).json("You can only delete your post");
        }
    } catch (error) {
        next(error);
    }
}

// Like or Dislike Post
export const likePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (error) {
        next(error);
    }
}

// Get Timeline Posts
export const getTimelinePost = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts));
    } catch (error) {
        next(error);
    }
}