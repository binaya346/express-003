import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    pages: Number,
    price: Number,
});

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;