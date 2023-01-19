import { MqttClient } from "mqtt";
import connectMqtt from "./connectionToServer";
import { topics } from "./topics";
const Dispatcher = require("mqtt-dispatcher");

export class UserClass{

    protected clientMqtt: MqttClient;
    protected userName: string;
    protected dispatcher: any;
    protected db: any;

    constructor(userName: string, db: any){
        this.clientMqtt = connectMqtt();
        this.userName = userName;
        this.dispatcher = new Dispatcher(this.clientMqtt);
        this.db = db;
    };

    start(){
        // can put something here if needed
    };

    getUserName(){ return this.userName; };

    async getMessages(friend: string){
        const history = await this.db.find({ chatWith: friend });
        if (history.length === 0) return [];
        return history[0].messages;
    };

    publishMessage(sendTo: string, message: string){
        this.clientMqtt.publish(topics.sendMessage(this.userName, sendTo), message);
        this.clientMqtt.publish(sendTo, "New message"); // tells the client is chatting with to update messages
        this.saveMessage(sendTo, message);
    };

    // saves message to the db
    protected async saveMessage(sendTo: string, message: string){
        // checks if there is already a chat with that user, in that case updates it, else creates a new chat
        const check = await this.db.findOne({chatWith: sendTo});
        if(!check){
            const newChat = new this.db({
                chatWith: sendTo,
                messages: [["0", message]]
            });
            await newChat.save();
            return console.log("Message sent from "+this.userName+" to "+sendTo);
        };
        // adds message to db
        const newMessageList = [...check.messages, ["0", message]];
        const savingMessage = await this.db.findOneAndUpdate({chatWith: sendTo}, {messages: newMessageList});
    };

    // when a friend is added, user and the friend add a rule
    startListenTo(friend: string){
        this.dispatcher.addRule(topics.receiveMessage(friend, this.userName), this.handleNewMessage.bind(this));
        console.log(this.userName+" listening on "+topics.receiveMessage(friend, this.userName)+" topic");
    };

    protected async handleNewMessage(topic: string, message: string){
        // stores incoming messages as "1": received
        const receivedBy = topic.split("/")[1] // contains the friend that sent the message
        const check = await this.db.findOne({chatWith: receivedBy});
        if(!check){
            const newChat = new this.db({
                chatWith: receivedBy,
                messages: [["1", message]]
            });
            const savingChat = await newChat.save();
            return console.log("Message sent from "+this.userName+" to "+receivedBy);
        };
        // adds message to db
        const newMessageList = [...check.messages, ["1", message]];
        const savingMessage = await this.db.findOneAndUpdate({chatWith: receivedBy}, {messages: newMessageList});
        return console.log("Message sent from "+this.userName+" to "+receivedBy);
    };
};