import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { React, useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
// pages
import { AuthPage } from './Pages/AuthPage';


function App() {

  const history = useHistory();

  useEffect(() => {
    history.push('/auth');
  }, []);

  return (
    <Router>
      <div className='MainApp'>
        <NavBar />

        <div className='AuthPath'>
          <Switch>
            <Route path="/auth">
              <AuthPage/>
            </Route>
          </Switch>
        </div>


      </div>
    </Router>
  );
};


export default App;
