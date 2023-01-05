import { MqttClient } from "mqtt";
import connectMqtt from "./connectionToServer";
import { topics } from "./topics";
const Dispatcher = require("mqtt-dispatcher");


export class User{

    protected clientMqtt: MqttClient;
    protected userName: string;
    protected dispatcher: any;

    constructor(userName: string){
        this.clientMqtt = connectMqtt();
        this.userName = userName;
        this.dispatcher = new Dispatcher(this.clientMqtt);
    };

    start(){
        this.clientMqtt.publish(topics.alive, this.userName);
    };
};