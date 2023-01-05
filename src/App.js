import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { React, useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
// pages
import { AuthPage } from './Pages/AuthPage';

  const [isLogged, setIsLogged] = useState(false);

function App() {

  return (
    <Router>
      <div className='MainApp'>
        <NavBar />

        <div className='AuthPath'>
          <Switch>
            <Route path="/auth">
              <AuthPage isLogged={isLogged} setIsLogged={setIsLogged}/>
            </Route>
          </Switch>
        </div>


      </div>
    </Router>
  );
};


export default App;
