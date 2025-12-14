import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    address: String,
    isActive: Boolean,
});

const Model = mongoose.model("Publisher", schema);

export default Model;