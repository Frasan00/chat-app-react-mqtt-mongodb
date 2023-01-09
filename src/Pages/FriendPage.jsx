import { React, useState, useEffect } from "react";
import axios from "axios";

export function FriendPage({ userName, setIsLogged, jwt, setIsChatting }){

    const [newFriend, setNewFriend] = useState("");
    const [friendList, setFriendList] = useState([]);
    const [userDoesntExist, setUserDoesntExist] = useState(false);

    // initializes friendList with useEffect and updates it everytime newFriend is changed
    useEffect(() => {
        const config = {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          };
        axios.get("http://localhost:5000/friends/"+userName, config)
        .then(res => {
            setFriendList(res.data);
            console.log({friends: res.data});
        })
        .catch(err => {
            console.error(err);
        });
    }, []);
    
    const handleLogOut = () => {
        axios.delete("http://localhost:5000/auth/logout/"+userName)
        .then(res => {
            setIsLogged(false);
            console.log(res.data);
        })
        .catch(err => {
            console.error(err);
        });
    };

    const handleFriendInput = (event) => {
        setUserDoesntExist(false); // with another try when the user starts to write again the error is toggled off
        setNewFriend(event.target.value);
    };

    const handleNewFriend = () => {
        const config = {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          };
          const data = {
            userName: userName,
            friendToAdd: newFriend
          };
        axios.post("http://localhost:5000/friends/addFriend", data, config)
        .then(res => {
            setFriendList([...friendList, newFriend]);
            console.log({friends: res.data});
        })
        .catch(err => {
            setUserDoesntExist(true); 
            console.error(err);
        });
    };

    const handleNewChat = (friend) => {
        
    };

    const handleDeleteFriend = (friend) => {
        const data = {
            userName: userName,
            friendToRemove: friend
        };
        const config = {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            data:data
        };
        axios.delete("http://localhost:5000/friends/delete", config)
        .then(res => {
            setFriendList(res.data);
            console.log({friends: res.data});
        })
        .catch(err => {
            console.error(err);
        });
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
            {userDoesntExist === true ? <p className="text-danger">User doesn't exist</p>: null}

            <hr></hr>
            <br></br>
            <h3>Friend list</h3>
            {friendList.length !== 0 ? 
                friendList.map((friend) => 
                    <div className="friendList">
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