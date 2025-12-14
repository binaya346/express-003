import express from "express";
import Model from '../model/publishers.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await Model.find();
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch response' });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, address, isActive } = req.body;
        const Response = new Model({ name, address, isActive });
        const response = await Response.save()
        res.status(201).send({ "message": `Successfully created! ${response}` })
    } catch (err) {
        console.log(err + " err");
        res.status(500).send({ "Error": err });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, address, isActive } = req.body;
        const response = await Model.findByIdAndUpdate(id, { name, address, isActive }, { new: true });
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
            res.send({ "message": `Book with id ${bookId} deleted successfully.` });
        } else {
            res.status(404).send({ "message": `Book with id ${bookId} not found.` });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete book' });
    }
});

export default router; 