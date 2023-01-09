import { React, useState, useEffect } from "react";
import axios from "axios";

export function FriendPage({ userName, setIsLogged, jwt, setIsChatting }){

    const [newFriend, setNewFriend] = useState("");
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

    const handleFriendInput = (event) => {
        setNewFriend(event.target.value);
    };

    // to do
    const handleNewFriend = () => {

    };

    const handleNewChat = (friend) => {
        
    };

    const handleDeleteFriend = (friend) => {
    };

    return(
        <div className="Friends">
            <h2>Hello {userName}!  
                <button onClick={() => handleLogOut()} className="btn btn-danger"><a href="/auth">Log out   </a></button> 
                <br></br>
                <br></br>
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <input type="text" onChange={handleFriendInput} placeHolder="Search a friend" className="form-control" aria-describedby="passwordHelpInline"/>
                        <button onClick={() => handleNewFriend()} className="btn btn-primary">Search</button> 
                    </div>
                </div>
            </h2> 

            <hr></hr>
            <br></br>
            <h3>Friend list</h3>
            {friendList.length !== 0 ? 
                friendList.map(friend => 
                    <div className="friendLIst">
                        <li>{friend}
                        <button onClick={() => handleNewChat(friend)} className="btn btn-secondary btn-sm">Chat!</button>
                        <button onClick={() => handleDeleteFriend(friend)} className="btn btn-danger btn-sm">X</button>
                        </li>
                    </div>
                    ): <p>You have no friends </p>
            }

        </div>
    );
};