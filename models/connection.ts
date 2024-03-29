// Import Dependencies
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;

//connect to DB // Database Connection
const connectionOptions = {
  useCreateIndex:true, 
  useUnifiedTopology: true,
  useNewUrlParser: true
}

// Export the Connection
export default function StartMongoose()
{
mongoose.set('strictQuery', false)
mongoose.connect(DATABASE_URL || '')

mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error))
}



