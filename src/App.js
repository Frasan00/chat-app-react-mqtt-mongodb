import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { React, useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
// pages
import { AuthPage } from './Pages/AuthPage';
import { FriendPage } from './Pages/FriendPage';
import { ChatPage } from './Pages/ChatPage';


function App() {
  
  process.env.CI = false;

  // useStates that need to be passed between components
  const [userName, setUserName] = useState(() => {
    const storedUserName = localStorage.getItem('username');
    return storedUserName ? localStorage.getItem('username'): "";
  });

  const [jwt, setJwt] = useState(() => {
    const storedJwt = localStorage.getItem('jwt');
    return storedJwt ? localStorage.getItem('jwt'): "";
  });

  const [isLogged, setIsLogged] = useState(() => {
    // it's initialized to the key localStorage item, in order to display the correct page
    const storedKey = localStorage.getItem('key');
    return storedKey ? JSON.parse(storedKey) : false;
  });

  const [isChatting, setIsChatting] = useState(false);

  const [chattingWith, setChattingWith] = useState("");

  // use effect that stores the states in browser memory
  useEffect(() => {
    localStorage.setItem('username', userName);
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('key', JSON.stringify(isLogged));
  }, [userName, jwt, isLogged]);


  return (
    <Router>
      <div className='MainApp'>
        <NavBar />

        <div className='switchPaths'>
          <Switch>

            {/* initializes the page to auth */}
            <Route exact path="/">
              <Redirect to="/auth" />
            </Route>


              {/* if the user is logged is redirected to the friends page, else is redirected to the auth page */}
              {isLogged === true ? 
                <Route exact path="/auth">
                  <Redirect to="/friends" />
                </Route>: 
                  <Route exact path="/friends">
                    <Redirect to="/auth" />
                  </Route>
              }

              {/* if the user is chatting is redirected to the chat page, else is redirected to the friends page */}
              {isChatting === true ? 
              <Route exact path="/friends">
                <Redirect to="/chat" />
              </Route>: 
                <Route exact path="/chat">
                  <Redirect to="/friends" />
                </Route>
              }

            <Route path="/auth">
              <AuthPage 
              userName={userName} setUserName={setUserName}
              setIsLogged={setIsLogged} setJwt={setJwt}
              />
            </Route>

            <Route path="/friends">
              <FriendPage
              userName={userName} setIsLogged={setIsLogged}
              jwt={jwt} setIsChatting={setIsChatting} setChattingWith={setChattingWith}
              />
            </Route>

            <Route path="/chat">
              <ChatPage
              userName={userName} jwt={jwt} chattingWith={chattingWith}
              />
            </Route>

          </Switch>
        </div>


      </div>
    </Router>
  );
};


export default App;
