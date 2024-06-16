import mongoose from "mongoose";

const bookScheme = mongoose.Schema({
    id:Number,
    name:String,
    price:Number,
    category:String,
    image:String,
    title:String
}) 

const Book = mongoose.model("Book", bookScheme);

export default Book;