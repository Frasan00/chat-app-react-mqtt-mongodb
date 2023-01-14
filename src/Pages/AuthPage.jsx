import { React, useEffect, useState } from "react";
import axios from "axios";


export const AuthPage = ({ userName, setUserName, setIsLogged, setJwt }) => {

    // states
    const [password, setPassword] = useState("");
    const [invalidCredential, setInvalidCredential] = useState(null);
    const [userAlreadyExists, setUserAlreadyExists] = useState(null);
    const [userAlreadyLogged, setUserAlreadyLogged] = useState(null);

    useEffect(() => {
        // when you are or return to the auth page, everything is resetted
        setUserName("");
        setIsLogged(false);
        setJwt("");
    })

    // handlers
    const handleUserName = (event) => {
        setUserName(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSignUp = () => {
        if (userName === "" || password === "") return console.log("Invalid credentials");
        const data = {
            userName: userName,
            password: password
        };
        axios.post("http://localhost:5000/auth/register", data)
        .then(res => {
            setInvalidCredential(null);
            setUserAlreadyExists(null);
            console.log(res.data);
        })
        .catch(err => {
            if(err.response.data === "User already exists") setUserAlreadyExists(true);
            else {
                // there can only be one error at a time
                setUserAlreadyExists(null);
                setUserAlreadyLogged(null);
                setInvalidCredential(true);
            };
            console.error(err);
        });
    };

    const handleLogIn = () => {
        if (userName === "" || password === "") return console.log("Invalid credentials");
        const data = {
            userName: userName,
            password: password
        };
        axios.post("http://localhost:5000/auth/login", data)
        .then(res => {
            setInvalidCredential(null);
            setIsLogged(true);
            setJwt(res.data); // the res is the web token
            console.log(userName+" logged in ");
        })
        .catch((err) => {
            if (err.response.data === "User already logged in") setUserAlreadyLogged(true);
            else{
                setUserAlreadyExists(null);
                setUserAlreadyLogged(null);
                setInvalidCredential(true);
            };
            console.error(err);
        });
    };

    return (
        <form>  
        <br></br>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">User</label>
                <input type="text" className="form-control" id="exampleUserInput" onChange={handleUserName} />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePassword}/>
                <div id="passwordHelpBlock" className="form-text">Your password must be 6-16 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</div>
                <div className="wrongCredential">{invalidCredential && <p className="text-danger">Invalid credential</p>}</div>
                <div className="userExists">{userAlreadyExists && <p className="text-danger">This user name already exists</p>}</div>
                <div className="userExists">{userAlreadyLogged && <p className="text-danger">User already logged in</p>}</div>
            </div>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-primary" onClick={() => handleSignUp()}>Sign Up</button>
                <button type="button" className="btn btn-primary" onClick={() => handleLogIn()}>Log In</button>
            </div>
        </form>
    );
};
 