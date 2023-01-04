import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    friendList: {
        type: [String],
        default: []
    }
});

export default mongoose.model("User", userSchema);