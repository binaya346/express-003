import express from 'express'
import mongoose from 'mongoose';
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import BookModel from './model/books.js';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect('mongodb://127.0.0.1:27017/Pathsala')
    .then(() => {
        console.log('Connected with mongodb!')

        app.listen(8000, () => {
            console.log('Server is running on http://localhost:8000/')
        })
    })
    .catch(error => console.log(error));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

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

app.get("/books", async (req, res) => {
    try {
        const books = await BookModel.find();
        res.send(books);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch books' });
    }
});

app.post("/books", upload.single('image'), async (req, res) => {
    try {
        const { title, pages, price } = req.body;

        const cover_image = req.file ? req.file.filename : "";

        const newBook = {
            title, pages, price, cover_image
        }
        const Books = new BookModel(newBook);
        const response = await Books.save()
        res.status(201).send({ "message": `Successfully created! ${response}` })
    } catch (err) {
        console.log(err + " err");
        res.status(500).send({ "Error": err });
    }
});

app.put("/books/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        const { title, pages, price } = req.body;
        const newBook = {
            title, pages, price
        }

        const response = await BookModel.findByIdAndUpdate(bookId, newBook, { new: true });

        res.status(200).send({ "message": `Successfully Updated! ${response}` })
    } catch (err) {
        console.log(err + " err");
        res.status(500).send({ "Error": err });
    }
});


app.delete("/books/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        const response = await BookModel.findByIdAndDelete(bookId);
        if (response) {
            res.send({ "message": `Book with id ${bookId} deleted successfully.` });
        } else {
            res.status(404).send({ "message": `Book with id ${bookId} not found.` });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete book' });
    }
});