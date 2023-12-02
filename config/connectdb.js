import mongoose from 'mongoose';

const connectDB = async (DataBaseurl) => {
    console.log("run-mon")
    try {
        const DB_OPTIONS = {
        dbName: "geekshop",
    useNewUrlParser: true,
    useUnifiedTopology: true,
        };
        await mongoose.connect(DataBaseurl, DB_OPTIONS);
        console.log("Connected successfully");
    } catch (error) {
        console.error(error,"tyuio");
    }
};

export default connectDB;
