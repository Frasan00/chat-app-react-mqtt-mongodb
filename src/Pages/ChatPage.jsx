import { React, useEffect, useState } from 'react';
import "../App.css"; // centers the app and form-group allines input and button

export const ChatPage = ({ userName, chattingWith }) => {

    const [chatHystory, setChatHistory] = useState([]);
    const [message, setMessage] = useState("");

    const handleMessageInput = (event) => {
        setMessage(event.target.value);
    };

    const handleNewMessage = async() => {
        
    };

    // to do
    return(
        <div className='App'>
            <h1>Your are now chatting with {chattingWith}!</h1>
                <div class="container mt-3">
                {chatHystory.length !== 0 ? 
                    <div class="row">
                    <div class="col-md-12">
                    <div class="card">
                        <ul class="list-group list-group-flush">
                        {chatHystory.map((message) => {
                            <li class="list-group-item">
                            <p>User 1: Hi there!</p>
                            <p class="text-muted"><small>11:00 AM</small></p>
                        </li>
                        })}
                        </ul>
                    </div>
                    </div>
                </div>
                : <p>Send a message to {chattingWith}</p>
                }
                <div className="form-group">
                    <input type="text" onChange={handleMessageInput} placeholder="Send a message... " className="form-control" aria-describedby="passwordHelpInline"/>
                    <button onClick={() => handleNewMessage()} className="btn btn-primary">Send</button> 
                </div>
            </div>
        </div>
    );
};