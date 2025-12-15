import express from "express";
import upload from '../middleware/storage.js'
import {
    createAuthor,
    deleteAuthor,
    getAuthors,
    updateAuthor
} from "../controllers/author.js";

const router = express.Router();

router.get("/", getAuthors);
router.post("/", upload.single("image"), createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router; 