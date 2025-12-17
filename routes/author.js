import express from "express";
import upload from '../middleware/storage.js'
import auth from '../middleware/auth.js';
import {
    createAuthor,
    deleteAuthor,
    getAuthors,
    updateAuthor
} from "../controllers/author.js";

const router = express.Router();

router.get("/", getAuthors);
router.post("/", auth, upload.single("image"), createAuthor);
router.put("/:id", auth, updateAuthor);
router.delete("/:id", auth, deleteAuthor);

export default router; 