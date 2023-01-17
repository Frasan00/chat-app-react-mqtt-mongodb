import { React, useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css"; // centers the app and .form-group allines input and button

export const ChatPage = ({ userName, jwt, chattingWith }) => {

    const [chatHystory, setChatHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [observer, setObserver] = useState(0); // is updated every 10ms 

    //socket. io part
    setInterval(() =>{
        // Every second checks for new messages, the new value is made to not let observer grow to much
        let newValue;
        if(observer !== 100) newValue = observer+1
        else newValue = 0;
        setObserver(newValue);
    }, 1000);
       
    
    // useEffect for initialization of chat hystory on mount and every second
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