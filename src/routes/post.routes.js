import express from 'express';
import { createPost, deletePost, getAllPost, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

// Get All Post
router.get('/', getAllPost);

// Create a new Post
router.post('/post', createPost);

// Update Post
router.patch('/post', updatePost);

// Delete Post
router.delete('/post', deletePost);


export default router;