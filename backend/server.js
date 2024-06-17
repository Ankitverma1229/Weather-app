import express from "express";
import http from  "http";
import dotenv from "dotenv";
import cors from 'cors'
import router from "./routes/weatherRoutes.js";
import { connectDb } from "./config/connectDB.js";

dotenv.config();
connectDb();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).json("Server running")
});

server.listen(PORT,  () => {
    console.log(`Server started at PORT: ${PORT}`)
});
