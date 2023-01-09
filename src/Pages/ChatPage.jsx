import { React, useState, useEffect } from "react";
import axios from "axios";

export function ChatPage({ userName, setIsLogged }){

    const [friend, setFriend] = useState("");
    const [friendFound, setFriendFound] = useState(null);
    const [friendList, setFriendList] = useState([]);

    // to do: initialize friendList with useEffect
    
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

    // to do
    const handleNewFriend = () => {

    };

    return(
        <div className="Chat">
            <h2>Hello {userName}!  
                <button onClick={() => handleLogOut()} className="btn btn-danger"><a href="/auth">Log out   </a></button> 
                <br></br>
                <br></br>
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <input type="text" placeHolder="Search a friend" className="form-control" aria-describedby="passwordHelpInline"/>
                        <button onClick={() => handleNewFriend()} className="btn btn-primary">Search</button> 
                    </div>
                </div>
            </h2> 

            <hr></hr>
            <br></br>
            <h3>Friend list</h3>
            

        </div>
    );
};