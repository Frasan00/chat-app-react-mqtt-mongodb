import User from "../database/User";

export const findUser = (userName: string) => {
    return User.findOne({userName: userName})
};