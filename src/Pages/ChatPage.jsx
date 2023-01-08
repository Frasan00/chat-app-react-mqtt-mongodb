import { React, useState } from "react";
import axios from "axios";

export function ChatPage({ userName, setIsLogged }){

    
    const handleLogOut = () => {
        axios.delete("http://localhost:5000/auth/logout/"+userName)
        .then(res => {
            setIsLogged(null);
            console.log(res.data);
        })
        .catch(err => {
            console.error(err);
        });
    };

    return(
        <div className="Chat">
            <h2>Hello {userName}!  
                <button onClick={() => handleLogOut()} className="btn btn-danger"><a href="/auth">Log out</a></button> 
            </h2> 
        </div>
    );
};