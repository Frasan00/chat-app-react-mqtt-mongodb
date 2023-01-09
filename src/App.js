import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { React, useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
// pages
import { AuthPage } from './Pages/AuthPage';
import { FriendPage } from './Pages/FriendPage';


function App() {

  const [userName, setUserName] = useState("");
  const [jwt, setJwt] = useState("");
  const [isLogged, setIsLogged] = useState(null);
  const [isChatting, setIsChatting] = useState(null);

  // keep data when a page is refreshed in the browser
  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    const storedJwt = localStorage.getItem('jwt');
    if (storedUserName) { setUserName(storedUserName); };
    if (storedJwt) { setJwt(storedJwt); };
  }, []);

  useEffect(() => {
    localStorage.setItem('username', userName);
    localStorage.setItem('jwt', jwt);
  }, [userName, jwt]);


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


              {/* if the user is logged is redirected to the chat page, else is redirected to the auth page */}
              {isLogged ? 
                <Route exact path="/auth">
                  <Redirect to="/friends" />
                </Route>: 
                  <Route exact path="/friends">
                    <Redirect to="/auth" />
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
              jwt={jwt} setIsChatting={setIsChatting}
              />
            </Route>

          </Switch>
        </div>


      </div>
    </Router>
  );
};


export default App;
