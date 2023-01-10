import User from "../database/User";
import Session from "../database/Session";
import { SERVER } from "..";
import { Request, Response } from "express";
import { createMessageSchema } from "../database/messagesModel";
import { UserClass } from "../mqtt/UserClass";

export const addNewFriend = async(req: Request, res: Response) => {
    // generic checks
    const { userName, friendToAdd } = req.body;
    if(!userName || !friendToAdd) return res.status(404).send("Missing informations ");
    const checkIfFriendExists = await User.findOne({userName: friendToAdd}); 
    if(!checkIfFriendExists) return res.status(404).send("The user you are trying to be friend with doesn't exist");
    const user = await User.findOne({userName: userName});
    if(!user) return res.status(404).send("User not found");

    // duplicates
    let foundDuplicate;
    user.friendList.forEach(friend => {
        if(friend === friendToAdd) foundDuplicate = true; 
    });
    if(foundDuplicate) return res.status(400).send("You are already friend with this user");
    
    const newList = [...user.friendList, friendToAdd];
    const addingFriend = await User.findOneAndUpdate({userName: userName}, {friendList: newList});

    // mqtt part: when a friend is added both user and newFriend add a dispatcher
    const mainUser = SERVER.findUser(userName);
    const friend = SERVER.findUser(friendToAdd);
    if (!mainUser || !friend) return res.status(402).send("Couldn't connect users ");
    mainUser.startListenTo(friend.getUserName());
    friend.startListenTo(mainUser.getUserName());

    console.log(userName+ " is now friend with "+friendToAdd);
    res.status(200).send(user.friendList);
};

export const getFriendList = async(req: Request, res: Response) => {
    const userName = req.params.userName; // userName of the user that wants the list
    const user = await User.findOne({userName: userName});
    if(!user) return res.status(404).send("User not found");
    if (user.friendList.length === 0) return res.status(200).send([]);
    res.status(200).send(user.friendList);
};

export const deleteFriend = async(req: Request, res: Response) => {
    const { userName, friendToRemove } = req.body;
    if(!userName || !friendToRemove) return res.status(404).send("Missing informations ");
    const user = await User.findOne({userName: userName});
    if(!user) return res.status(404).send("User not found");
    const filteredList = user.friendList.filter((friend) => friend !== friendToRemove);
    user.friendList = filteredList;
    const saveChanges = await user.save();
    console.log(userName+ " is no longer friend with "+friendToRemove);
    res.status(200).send(user.friendList);
};
