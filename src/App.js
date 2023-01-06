import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { React, useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
// pages
import { AuthPage } from './Pages/AuthPage';


function App() {

  // must have userName in the client
  const [userName, setUserName] = useState("");
  const [isLogged, setIsLogged] = useState(false);


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
              isLogged={isLogged} setIsLogged={setIsLogged}
              userName={userName} setUserName={setUserName}
              />
            </Route>


          </Switch>
        </div>


      </div>
    </Router>
  );
};


export default App;
