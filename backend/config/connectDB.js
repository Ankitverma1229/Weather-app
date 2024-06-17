import mongoose from "mongoose";

export const connectDb = async () =>{

    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connected :", connect.connection.host, connect.connection.name);
    }
    catch (error){
        console.log(error);
        console.log("Database connection failed!!");
        process.exit(1);
    }
}
