import express from "express";
import { getFriendList, addNewFriend, deleteFriend } from "../controllers/friendsController";
import { validateJwt } from "../middlewares/jwtValidation";

const router = express.Router();

router.get("/:userName", validateJwt, getFriendList);
router.post("/addfriend", validateJwt, addNewFriend);
router.delete("/delete", validateJwt, deleteFriend);

export default router;