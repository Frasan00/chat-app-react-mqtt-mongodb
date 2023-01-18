import React, { useEffect, useState } from 'react';
import axios from 'axios';
import paho from "paho-mqtt";
import "../App.css"; // centers the app and .form-group allines input and button

export const ChatPage = ({ userName, jwt, chattingWith }) => {

    const [chatHystory, setChatHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [clientMqtt, setClientMqtt] = useState(null);
    const [observer, setObserver] = useState(0);

    // useEffect for initialization of chat hystory on mount and every every time a message is received
    useEffect(() => {
        // you have to have a running mqtt broker
        const client = new paho.Client("broker.hivemq.com", Number(8000), "OrNKP26Dp0");
        client.connect({
            onSuccess: () => { client.subscribe(userName); console.log("Succesfully sub to "+userName); },
        });
        
        // client will receive on "userName" topic the instruction to update the chat
        client.onMessageArrived = (_, message) => {
            console.log(message.toString());
            let newValue = observer+1;
            if (newValue > 100) return setObserver(0);
            return setObserver(newValue);
        };
        setClientMqtt(client);
    }, []);

    // second useEffect that actually updates the chat
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

    return(
        <div className='App'>
            <h1>Your are now chatting with {chattingWith}!</h1>
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