import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import financialRecordRouter from "./routes/financial-records";
const connectDB = require('./config/db');
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
connectDB();


app.use("/financial-records", financialRecordRouter)


app.listen(port, () => {
  console.log("Server is listening on port:" , port)
});
