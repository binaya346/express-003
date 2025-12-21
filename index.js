import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import booksRoute from "./routes/book.js";
import publisherRoute from "./routes/publisher.js";
import authorRoute from "./routes/author.js"
import userRoute from "./routes/user.js";
import authRoute from './routes/auth.js';

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, APPLICATION_PORT } = process.env;

mongoose.connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`)
    .then(() => {
        console.log('Connected with mongodb!')

        app.listen(APPLICATION_PORT, () => {
            console.log(`Server is running on http://localhost:${APPLICATION_PORT}/`)
        })
    })
    .catch(error => console.log(error));

app.use("/books", booksRoute);
app.use("/publishers", publisherRoute)
app.use("/authors", authorRoute)
app.use("/users", userRoute)
app.use("/auth", authRoute)