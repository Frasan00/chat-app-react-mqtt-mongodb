import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import cors from "cors";
dotenv.config();

// mongodb connection
mongoose.connect("mongodb://localhost:27017/chat-app")
.then(() => console.log("Connected to the Database"))
.catch((err) => console.error(err));

const app = express();
const PORT = process.env.PORT;
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRoute);

app.get("/", (req, res) => {
    res.send("Chat-app Api");
});

app.listen(PORT, () => console.log("Listening on port "+PORT));