import express from "express";
import { getFriendList, addNewFriend, deleteFriend } from "../controllers/friendsController";
import { Jwt } from "jsonwebtoken";

const router = express.Router();

router.get("/")