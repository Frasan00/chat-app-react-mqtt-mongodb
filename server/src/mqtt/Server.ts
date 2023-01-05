import { MqttClient } from "mqtt";
import connectMqtt from "./connectionToServer";
import { topics } from "./topics";
import User from "../database/User";

const Dispatcher = require("mqtt-dispatcher");


export class Server{

    protected clientMqtt: MqttClient;
    protected dispatcher: any;
    protected userList: string[];

    constructor(){
        this.clientMqtt = connectMqtt();
        this.dispatcher = new Dispatcher(this.clientMqtt);
        this.userList = []
    };

    start(){
        this.dispatcher.addRule(topics.alive, this.handleNewUser.bind(this));
    };

    protected handleNewUser(_: any, message: string){
        this.userList.push(message);
        console.log(message+" logged in");
    };
};