import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import process from 'process';
import axios from 'axios';
import "../App.css"; // centers the app and .form-group allines input and button

global.Buffer = Buffer
global.process = process
const mqtt = require("mqtt");

export const ChatPage = ({ userName, jwt, chattingWith, setIsChatting }) => {

    const [chatHystory, setChatHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [observer, setObserver] = useState(0);

    // useEffect for initialization of chat hystory on mount and every every time a message is received
    useEffect(() => {
        const clientMqtt = mqtt.connect("ws://broker.hivemq.com", {port: 8000, path: "/mqtt"});
        clientMqtt.subscribe(userName);
        clientMqtt.on("message", (_, message)=>{
            // on message updates observer, in this way the chatHystory will be re-rended
            console.log(message.toString());
            let newValue = observer+1;
            setObserver(newValue);
        });

        return () => {
            clientMqtt.unsubscribe(userName);
            clientMqtt.end();
        };
    }, [observer]);


    // second useEffect that actually updates the chat when observer is changed
    useEffect(() => {
        const config = {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          };
        axios.get("http://localhost:5000/chat/"+userName+"/"+chattingWith, config)
        .then(res => {
            setChatHistory(res.data);
            console.log({chat: res.data});
        })
        .catch(err => {
            console.error(err);
        });
    }, [observer]);

    // handlers
    const handleMessageInput = (event) => { setMessage(event.target.value); };

    const handleNewMessage = async() => {
        if(message === "") return;
        const data = {
            userName: userName,
            friendToReach: chattingWith,
            message: message
        };
        const config = {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
        };
        axios.post("http://localhost:5000/chat/message", data, config)
        .then(res => {
            // resets the chat hystory in order to be updated by useEffect
            setChatHistory([...chatHystory, ["0", message]]);
            console.log("message sent");
        })
        .catch(err => {
            console.error(err);
        });
    };

    const backToFriends = () => {
        setIsChatting(null);
    };

    return(
        <div className='App'>
            <h1>Your are now chatting with {chattingWith}!   <button onClick={() => backToFriends()} className="btn btn-danger"><a href="/auth">Exit chat   </a></button> </h1>
            <div className='Messages'>
                {chatHystory.map((message, i) => 
                message[0] === "0" ? 
                <li>{userName}: {message[1]}</li>
                :
                <li>{chattingWith}: {message[1]}</li>
                )}
            </div>
                <div className="form-group">
                    <input type="text" onChange={handleMessageInput} placeholder="Send a message... " className="form-control" aria-describedby="passwordHelpInline"/>
                    <button onClick={() => handleNewMessage()} className="btn btn-primary">Send</button> 
                </div>
        </div>
    );
};