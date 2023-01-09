import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import friendsRoute from "./routes/friendsRoute";
import cors from "cors";
import { corsOptions } from "./utilities/corsOptions";
import { Server } from "./mqtt/Server";
dotenv.config();

// mongodb connection
mongoose.connect("mongodb://localhost:27017/chat-app")
.then(() => console.log("Connected to the Database"))
.catch((err) => console.error(err));

// Server mqtt that needs to be traposrted to controllers
export const SERVER = new Server();

const app = express();
const PORT = process.env.PORT;

app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRoute);
app.use("/friends", friendsRoute);

app.get("/", (req, res) => {
    res.send("Chat-app Api");
});

app.listen(PORT, () => console.log("Listening on port "+PORT));