import express from "express";
import { getMessages, newMessage } from "../controllers/chatController";
import { validateJwt } from "../middlewares/jwtValidation";

const router = express.Router();

// both get {userName, friend} in the body to take the chats with that friend and post a new message to friend
router.get("/:userName/:friendToReach", validateJwt, getMessages);
router.post("/message", validateJwt, newMessage);

export default router;