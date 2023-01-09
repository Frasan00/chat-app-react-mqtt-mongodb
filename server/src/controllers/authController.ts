import { Request, Response } from "express";
// db
import User from "../database/User";
import Session from "../database/Session";
// utilities
import { findUser } from "../utilities/findUser";
import { tokenGenerator } from "../utilities/generateToken";
import bcrypt from "bcrypt";
// mqtt
import { UserClass } from "../mqtt/UserClass";
import { SERVER } from "..";

export const register = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    if(await findUser(userName)) return res.status(400).send("User already exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        userName: userName,
        password: hashedPassword
    });
    const userSaving = await newUser.save();

    console.log(userName+" registed");
    res.status(200).send(userName+" registed");
};

export const login = async (req: Request, res: Response) => {
    // password check
    const { userName, password } = req.body;
    const user: any = await findUser(userName);
    if(!user) return res.status(404).send("User doesn't exist");
    if(await Session.findOne({userName: userName})) return res.status(400).send("User already logged in");
    if(await bcrypt.compare(password, user.password) === false) return res.status(400).send("Wrong password ");
    
    // session
    const token = tokenGenerator(userName);
    if(token === -1) return res.status(400).send("Secret key not present for token");
    const newSession = new Session({
        userName: userName,
        token: token
    });
    const saveSession = await newSession.save();

    // mqtt side
    const newUser = new UserClass(userName);
    newUser.start();
    SERVER.addUser(newUser);

    console.log(userName+" logged in");
    // sends the token to the client
    res.status(200).send(token);
};

export const logout = async (req: Request, res: Response) => {
    const userName = req.params.userName;
    const deleteUser = await Session.findOneAndDelete({userName: userName})
    .catch((err) => res.status(400).send("Couldn't delete the user: "+userName));
    console.log(userName+" logged out");
    res.status(200).send(userName+" logged out");
};
