import { MqttClient } from "mqtt";
import connectMqtt from "./connectionToServer";
import { createMessageSchema } from "../database/messagesModel";
import User from "../database/User";
import { UserClass } from "./UserClass";

const Dispatcher = require("mqtt-dispatcher");


export class Server{

    // server it's used to handle messages, but it's more a container, in fact, messages are sent directly user to user in a "end to end way", those are not handled directly by the server
    protected clientMqtt: MqttClient;
    protected dispatcher: any;
    protected userList: UserClass[];

    constructor(){
        this.clientMqtt = connectMqtt();
        this.dispatcher = new Dispatcher(this.clientMqtt);
        this.userList = []
    };

    async start(){
        // initializes the server with all users
        const users = await User.find();
        if(!users) return;
        users.map((user) => {
            if(user.userName){
                const db = createMessageSchema(user.userName);
                let newUser: UserClass = new UserClass(user.userName, db);
                this.addUser(newUser);
            };
        });
    };

    protected getUsers(){
        return this.userList
    };

    addUser(newUser: UserClass){
        this.userList.push(newUser);
    };

    findUser(userToFind: string){
        for(let i = 0; i<this.userList.length; i++){
            if (this.userList[i].getUserName() === userToFind) return this.userList[i];
        };
        return null;
    };


};