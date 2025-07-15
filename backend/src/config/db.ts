import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI || "";
        await mongoose.connect(dbURI);
        console.log('MongoDB connected successfully');
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;