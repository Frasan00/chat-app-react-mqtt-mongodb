import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
// routes
import authPage from './routes/authPage';

function App() {

  const history = useHistory();

  return (
    <div className="App">
      <Router>
        <Route path="/routes" component={authPage}/>
      </Router>
      {history.push("/routes")}
    </div>
  );
}

export default App;
