import express from "express";
import {
    getUser,
    //getUserFriends,
    //addRemoveFriend,
} from "../controllers/users.js"

import {
    verifyToken
} from "../middleware/auth.js"


const router = express.Router();

router.get("/:id", verifyToken, getUser);

//router.get("/friends/:id", verifyToken, getUserFriends);

//router.patch("/friends/:id", verifyToken, addRemoveFriend);

export default router;