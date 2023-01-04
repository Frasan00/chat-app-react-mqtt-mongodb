import { Request, Response } from "express";
// db
import User from "../database/User";
import Session from "../database/Session";
import { createMessageSchema } from "../database/messagesModel";

// utilities
import { findUser } from "../utilities/findUser";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// do registration route and test in react 
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
    console.log("User registed succesfully");
    res.status(200).send("UserRegisted");
};

export const login = async (req: Request, res: Response) => {

};

export const logout = async (req: Request, res: Response) => {

};

export const eliminateAccount = async (req: Request, res: Response) => {

};