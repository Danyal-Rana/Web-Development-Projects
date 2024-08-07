import mongoose from 'mongoose';

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then( () => {console.log("MongoDB connected Successfully")})
        .catch( (err) => {console.log(`MongoDB connection failed: ${err}`)})
};

export default connectDB;