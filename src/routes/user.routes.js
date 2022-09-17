import express from "express";
import { deleteUser, getAllUsers, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Get all User
router.get("/", getAllUsers)

// Get a User
router.get("/find/:id", getUser)

// Update User
// router.put("/:id", updateUser);

// Delete User
router.delete("/:id", verifyToken, deleteUser)

export default router;