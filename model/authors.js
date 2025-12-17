import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    age: Number,
    country: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    contact: Number,
    email: String,
    avatar: String,
    created_by: String,
});

const model = mongoose.model("Author", schema);

export default model;