import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";

// mongodb connection
mongoose.connect("mongodb://localhost:27017/chat-app")
.then(() => console.log("Connected to the Database"))
.catch((err) => console.error(err));

const app = express();
const PORT = process.env.PORT
const config = dotenv.config();

app.use(express.json());
app.use("/auth", authRoute);

app.get("/", (req, res) => {
    res.send("Chat-app Api");
});

app.listen(PORT, () => console.log("Listening on port "+PORT));