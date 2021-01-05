import logo from './logo.svg';
import './App.css';
import Storage from './storage/Storage';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Signup from "./user/Signup";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
     
        <Switch>
          <Route exact path="/storage">
            <Storage />
          </Route>
          <Route exact path="/" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
