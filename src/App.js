import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { React, useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
// pages
import { AuthPage } from './Pages/AuthPage';
import { ChatPage } from './Pages/ChatPage';


function App() {

  const [userName, setUserName] = useState("");
  const [isLogged, setIsLogged] = useState(null);

  return (
    <Router>
      <div className='MainApp'>
        <NavBar />

        <div className='switchPaths'>
          <Switch>

            <Route exact path="/">
              <Redirect to="/auth" />
            </Route>

            <Route path="/auth">
              <AuthPage 
              userName={userName} setUserName={setUserName}
              setIsLogged={setIsLogged}
            />
            </Route>

            <Route path="/chat">
              <ChatPage
                userName={userName} setIsLogged={setIsLogged}
            />
            </Route>

              {/* if the user is logged is redirected to chat, else he's redirected to the authentication */}
              {isLogged ? 
                <Route exact path="/auth">
                  <Redirect to="/chat" />
                </Route>: 
                <Route exact path="/chat">
                   <Redirect to="/auth" />
                </Route>
              }

          </Switch>
        </div>


      </div>
    </Router>
  );
};


export default App;
