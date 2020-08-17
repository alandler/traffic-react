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
import Outcome from "./pages/Outcome.js";
import NotFound from "./pages/NotFound.js";

// Bootstrap grid
import { Container, Row, Col } from 'react-bootstrap';

//PDF
import ReactPDF from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Document, Text, View, StyleSheet } from '@react-pdf/renderer';

// //HTTP Axios
import axios from 'axios';

//App
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      loggedIn: false,
      loggedOut: false,
      scenarioToRun: {},
      scenarioOne: {},
      scenarioTwo: {},
    };

    this.setScenarioToRun = this.setScenarioToRun.bind()
    this.setScenariosToCompare = this.setScenariosToCompare.bind()
  }

  setScenarioToRun(params) {
    console.log("setScenarioToRun params: ", params)
    // this.setState({scenarioToRun[params.name]: params.value})
  }

  setScenariosToCompare(params) {
    this.state.scenarioOne = {}
    this.state.scenarioTwo = {}
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
                <li>
                  <Link to="/outcome">Outcome</Link>
                </li>
              </ul>
              <ul style={{ float: "right" }}>
                <li>
                  <a>Log out</a>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about"
                userId={this.state.userId}
                loggedIn={this.state.loggedIn}
                loggedOut={this.state.loggedOut}
                scenarioToRun={this.state.scenarioToRun}
                scenarioOne={this.state.scenarioOne}
                scenarioTwo={this.state.scenarioTwo}
                setScenarioToRun = {this.setScenarioToRun}
                setScenariosToCompare = {this.setScenariosToCompare}
              >
                <About />
              </Route>
              <Route path="/compare"
                userId={this.state.userId}
                loggedIn={this.state.loggedIn}
                loggedOut={this.state.loggedOut}
                scenarioToRun={this.state.scenarioToRun}
                scenarioOne={this.state.scenarioOne}
                scenarioTwo={this.state.scenarioTwo}
                setScenarioToRun = {this.setScenarioToRun}
                setScenariosToCompare = {this.setScenariosToCompare}
              >
                <Compare />
              </Route>
              <Route path="/outcome"
                userId={this.state.userId}
                loggedIn={this.state.loggedIn}
                loggedOut={this.state.loggedOut}
                scenarioToRun={this.state.scenarioToRun}
                scenarioOne={this.state.scenarioOne}
                scenarioTwo={this.state.scenarioTwo}
                setScenarioToRun = {this.setScenarioToRun}
                setScenariosToCompare = {this.setScenariosToCompare}
              >
                <Outcome />
              </Route>
              {/* <Route exact path="/">
                <Home />
              </Route> */}
              <Route
                path='/'
                render={(props) => (
                  <Home {...props}
                    userId={this.state.userId}
                    loggedIn={this.state.loggedIn}
                    loggedOut={this.state.loggedOut}
                    scenarioToRun={this.state.scenarioToRun}
                    scenarioOne={this.state.scenarioOne}
                    scenarioTwo={this.state.scenarioTwo}
                    setScenarioToRun = {this.setScenarioToRun}
                    setScenariosToCompare = {this.setScenariosToCompare}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;

