import express from "express";
import { deleteUser, followUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Get all User
router.get("/", getAllUsers)

// Get a User
router.get("/find/:id", getUser)

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", verifyToken, deleteUser)

// Follow User
router.put("/:id/follow", verifyToken, followUser)

export default router;