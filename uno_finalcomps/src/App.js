import './App.css';
import{
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Game from "./Components/Game/Game";

function App() {
  return(
    <Router>
      {
        <Switch>

          <Route exact path = "/">
            <Home/>
          </Route>

      
          <Route exact path = "/game">
            <Game/>
          </Route>
        </Switch>

        
      }
    </Router>

  );
}

export default App;
