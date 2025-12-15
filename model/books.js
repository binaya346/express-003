import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: [true, "title of the book is required"],
        trim: true,
    },
    pages: Number,
    price: Number,
    cover_image: String,
});

const model = mongoose.model("Book", schema);

export default model;