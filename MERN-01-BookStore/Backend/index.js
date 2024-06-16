import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'

import bookRoute from './route/book_route.js'
import userRoute from './route/user_route.js'


dotenv.config(); // Load environment variables from .env file

const app = express();

// works as middleware
app.use(cors());
app.use(express.json()); // it will parse the body of the request

const PORT = process.env.PORT || 5001; // Use process.env.PORT directly

const URI = process.env.MongoDBURI;


// connect to mongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB.");
} catch (error) {
    console.log("Error: ", error);
}

/*
// Connecting to MongoDB
mongoose.connect(URI, {
    useNewUrlParser: true, // only used in local / not used in atlas
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log("Error: ", error);
});
*/

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}...`);
});