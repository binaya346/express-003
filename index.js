import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import booksRoute from "./routes/book.js";
import publisherRoute from "./routes/publisher.js";
import authorRoute from "./routes/author.js"

const app = express()
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())


mongoose.connect('mongodb://127.0.0.1:27017/Pathsala')
    .then(() => {
        console.log('Connected with mongodb!')

        app.listen(8000, () => {
            console.log('Server is running on http://localhost:8000/')
        })
    })
    .catch(error => console.log(error));

app.use("/books", booksRoute);
app.use("/publishers", publisherRoute)
app.use("/authors", authorRoute)