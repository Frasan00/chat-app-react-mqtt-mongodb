import { Request, Response } from "express";
import { SERVER } from "..";

export const getMessages = async (req: Request, res: Response) => {
    const { userName, friendToReach } = req.params

    // finds users in the SERVER
    const user = SERVER.findUser(userName);
    const friend = SERVER.findUser(friendToReach);
    if(!user || !friend) return res.status(400).send("User not found ");
    const messages = await user.getMessages(friend.getUserName());
    if(!messages) return res.status(400).send("Something went wrong while getting last messages ");
    res.status(200).send(messages);
};

export const newMessage = async (req: Request, res: Response) => {
    const { userName, friendToReach, message } = req.body;

    // finds users in the SERVER
    const user = SERVER.findUser(userName);
    const friend = SERVER.findUser(friendToReach);
    if (!user || !friend) return res.status(400).send("Couldn't connect users ");

    // publishMessage sends the message and saves it to the db
    user.publishMessage(friend.getUserName(), message);

    res.status(200).send("Message sent");
};