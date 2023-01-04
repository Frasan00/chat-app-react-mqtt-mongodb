import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    },
});

export default mongoose.model("Session", sessionSchema);