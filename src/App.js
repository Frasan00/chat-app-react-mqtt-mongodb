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

            {isLogged ? <Redirect to="/chat" />: null}

            <Route path="/chat">
              <ChatPage
              userName={userName} setIsLogged={setIsLogged}
              />
            </Route>

          </Switch>
        </div>


      </div>
    </Router>
  );
};


export default App;
