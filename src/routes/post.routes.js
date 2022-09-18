import express from 'express';
import { createPost, deletePost, getAllPost, getPostById, getTimelinePost, likePost, updatePostById } from '../controllers/post.controller.js';

const router = express.Router();

// Create a new Post
router.post('/', createPost);

// Get All Post
router.get('/', getAllPost);

// Get Post By Id
router.get('/:id', getPostById);

// Update Post
router.patch('/:id', updatePostById);

// Delete Post
router.delete('/:id', deletePost);

// Delete Post
router.put('/:id/like', likePost);

// Get All Timeline Post
router.get('/timeline/all', getTimelinePost);


export default router;