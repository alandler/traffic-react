import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//CSS
import './App.css';

//Page imports
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Compare from "./pages/Compare.js";
import NotFound from "./pages/NotFound.js";

//App
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      loggedIn: false,
      loggedOut: false
    };
  }
  render() {
    return (
      <>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/compare">Compare</Link>
                </li>
              </ul>
              <ul style={{float: "right"}}>
                <li>
                  <a>Log out</a>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/compare">
                <Compare />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;

