import mongoose from "mongoose";

// when a user is created, it's created a new message database for that user
// then for every friend a new collection for chats with that user is created
export const createMessageSchema = (userName: string) => {
    const messageSchema = new mongoose.Schema({
        // who you are chatting with
        chatWith: {
            type: String,
            require: true
        },
        messages: {
            // Number can be {0: your message, 1: friend's message}, String is the data of the message
            type: [[Number, String]] 
        }
    });
    mongoose.model(userName, messageSchema);
};


