import express from 'express'
import mongoose from 'mongoose';
import BookModel from './model/books.js';

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/Pathsala')
    .then(() => {
        console.log('Connected with mongodb!')
        
        app.listen(8000, () => {
            console.log('Server is running on http://localhost:8000/')
        })
    })
    .catch(error => console.log(error));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/static", (req, res) => {
    res.send({ "page": "static data" })
})

app.get("/about", (req, res) => {
    res.send({ "page": "about" })
})

app.get("/contact", (req, res) => {
    res.send({ "page": "contact" })
})

app.get("/books", async (req,res) => {
    try {
        const books = await BookModel.find();
        res.send(books);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch books' });
    }
});
