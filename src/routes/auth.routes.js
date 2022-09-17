import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

// Create a user
router.post('/signup', signup);

// Sign In
router.post("/signin", signin)

// Google Authentication
router.post("/google",)

// Facebook Authentication
router.post("/fb",)


export default router;