import express from "express";
import {
    register,
    login,
    refreshToken,
    logout
} from "../controllers/auth.js";
import upload from "../middleware/storage.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", upload.single('image'), register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", auth, logout);

export default router;