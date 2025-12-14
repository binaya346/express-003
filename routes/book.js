import express from "express";
import Model from '../model/books.js';
import upload from '../middleware/storage.js'
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await Model.find();
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch books' });
    }
});

router.post("/", upload.single('image'), async (req, res) => {
    try {
        const { title, pages, price } = req.body;
        const cover_image = req.file ? req.file.filename : "";

        const ModelResponse = new Model({
            title, pages, price, cover_image
        });
        const response = await ModelResponse.save()
        res.status(201).send({ "message": `Successfully created! ${response}` })
    } catch (err) {
        console.log(err + " err");
        res.status(500).send({ "Error": err });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, pages, price } = req.body;
        const response = await Model.findByIdAndUpdate(id, {
            title, pages, price
        }, { new: true });

        res.status(200).send({ "message": `Successfully Updated! ${response}` })
    } catch (err) {
        console.log(err + " err");
        res.status(500).send({ "Error": err });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Model.findByIdAndDelete(id);
        if (response) {
            res.send({ "message": `Book with id ${id} deleted successfully.` });
        } else {
            res.status(404).send({ "message": `Book with id ${id} not found.` });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete book' });
    }
});

export default router; 