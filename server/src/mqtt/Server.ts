import { MqttClient } from "mqtt";
import connectMqtt from "./connectionToServer";
import { topics } from "./topics";
import User from "../database/User";

const Dispatcher = require("mqtt-dispatcher");


export class Server{

    // server it's used to handle messages
    protected clientMqtt: MqttClient;
    protected dispatcher: any;
    userList: any[];

    constructor(){
        this.clientMqtt = connectMqtt();
        this.dispatcher = new Dispatcher(this.clientMqtt);
        this.userList = []
    };

    start(){
        // user are already handled in authController
    };

    addUser(newUser: any){
        this.userList.push(newUser);
    };


};