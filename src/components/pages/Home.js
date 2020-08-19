import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Bootstrap grid
import { Container, Row, Col } from 'react-bootstrap';

//CSS
import './../App.css';
import { render } from "@testing-library/react";

//HTTP Axios
import axios from 'axios';


//Mongo
import { main } from "../../mongo.js"

//
// Main Class HOME
//
class Home extends Component {
  constructor(props) {
    //props: userId, loggedIn, loggedOut, scenarioToRun, scenarioOne, scenarioTwo, setScenarioToRun, setScenariosToCompare
    console.log("Home props:", props)
    super(props);

    this.setScenarioToRun=this.setScenarioToRun.bind(this)
    this.setScenariosToCompare=this.setScenariosToCompare.bind(this)
  }

  setScenarioToRun = (e) => {
    console.log("Scenario to run in Home!")
    this.props.setScenarioToRun(e)
  }

  setScenariosToCompare = (e) => {
    this.props.setScenariosToCompare(e)
  }

  render() {
    return (
      <div>
        <h1 style={{ "textAlign": "center" }}>Urban Decision Design Tool</h1>
        <Container>
          <Row>
            <Col>
            <Inputs
              setScenarioToRun={this.setScenarioToRun}
              setScenariosToCompare={this.setScenariosToCompare}
            ></Inputs>
            </Col>
            <Col>
            <ComparisonSelection></ComparisonSelection>
            </Col>
          </Row>
        </Container>
        <Scenario></Scenario>
        <Experiment></Experiment>
      </div>
    );
  }
}

//
// Class INPUT
//
class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sae: 0,
      electric: 0,
      priv: 0,
      pub: 0,
      intersections: 0,
      passengerCost: 0,
    };
    console.log("Inputs props: ", props)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const sae = this.state.sae

    axios.post('/run', { sae })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  submitForm(event){
    event.preventDefault();
    alert('A scenario was submitted: \n' 
    + "SAE Level: " + this.state.sae + "\n"
    + this.state.electric
    + this.state.priv
    + this.state.pub
    + this.state.intersections
    + this.state.passengerCost);
    this.props.setScenarioToRun({
      sae: this.state.sae,
      electric: this.state.electric,
      priv: this.state.priv,
      pub: this.state.pub,
      intersections: this.state.intersections, 
      passengerCost: this.state.passengerCost
    })
  }

  render() {
    return (
      <form onSubmit={this.submitForm} className="input-form">
        <h4 style={{ "textAlign": "center" }}>Create and run new scenario</h4>
        <label>
          SAE Level:
        </label>
        <span>{this.state.sae}</span>
        <input name="sae" type="range" min="0" max="5" value={this.state.sae} onChange={this.handleInputChange} />
        <br />
        <label>
          Percent Electric Vehicles:
        </label>
        <span>{this.state.electric}</span>
        <input name="electric" type="range" min="0" max="100" value={this.state.electric} onChange={this.handleInputChange} />
        <br />
        <label>
          Percent Private Vehicles AV:
        </label>
        <span>{this.state.priv}</span>
        <input name="priv" type="range" min="0" max="100" value={this.state.priv} onChange={this.handleInputChange} />
        <br />
        <label>
          Percent Public/Rideshare Vehicles AV:
        </label>
        <span>{this.state.pub}</span>
        <input name="pub" type="range" min="0" max="100" value={this.state.pub} onChange={this.handleInputChange} />
        <br />
        <label>
          Intersections:
          </label>
        <input name="intersections" type="number" min="0" value={this.state.intersections} onChange={this.handleInputChange} />
        <br />
        <label>
          Passenger Cost:
          </label>
        <input name="passengerCost" type="number" className="" min="0" step="0.01" value={this.state.passengerCost} onChange={this.handleInputChange} />
        <br />
        <div className="center">
          <button type="submit" id="createScenarioButton">Create</button>
        </div>
      </form>
    )
  }
}


//
// class SCENARIO
//

class Scenario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i: null,
      headers: ["TIME", "SAE", "ELEC", "PUB", "PRIV", "INT", "COST", "PMT", "TTI", "PTI", "GHG", "SPEED", "STAND"],
      filters: Array(13).fill(true),
    }
  }

  handleClick(i) {
    const filters = this.state.filters.slice();
    const prev_state = filters[i]
    filters[i] = !prev_state;
    this.setState({
      filters: filters,
    });
  }

  render() {
    return (
      <div className="table-container">
        <FilterForm
          onClick={(i) => this.handleClick(i)}
          headers={this.state.headers}
        />
        <Table
          headers={this.state.headers}
          filters={this.state.filters}
        />
      </div>
    )
  }
}

//
//Filters and Table
//

function FilterForm(props) {
  return (
    <div className="filter-form">
      <Filter
        header={props.headers[0]}
        onClick={() => props.onClick(0)}
      />
      <Filter
        header={props.headers[1]}
        onClick={() => props.onClick(1)}
      />
      <Filter
        header={props.headers[2]}
        onClick={() => props.onClick(2)}
      />
      <Filter
        header={props.headers[3]}
        onClick={() => props.onClick(3)}
      />
      <Filter
        header={props.headers[4]}
        onClick={() => props.onClick(4)}
      />
      <Filter
        header={props.headers[5]}
        onClick={() => props.onClick(5)}
      />
      <Filter
        header={props.headers[6]}
        onClick={() => props.onClick(6)}
      />
      <Filter
        header={props.headers[7]}
        onClick={() => props.onClick(7)}
      />
      <Filter
        header={props.headers[8]}
        onClick={() => props.onClick(8)}
      />
      <Filter
        header={props.headers[9]}
        onClick={() => props.onClick(9)}
      />
      <Filter
        header={props.headers[10]}
        onClick={() => props.onClick(10)}
      />
      <Filter
        header={props.headers[11]}
        onClick={() => props.onClick(11)}
      />
      <Filter
        header={props.headers[12]}
        onClick={() => props.onClick(12)}
      />
    </div>
  )
}

function Filter(props) {
  let lbl = "filter-" + props.header
  return (
    <div className="filter-div">
      <input type="checkbox" name={lbl} onClick={props.onClick}></input>
      <label htmlFor={lbl}>{props.header}</label> <br />
    </div>
  );
}

function Table(props) {
  //Extract header names that are indicated "true"
  var selected_headers = ["Select"]
  var j;
  for (j = 0; j < props.filters.length; j++) {
    if (props.filters[j] == true) {
      selected_headers.push(props.headers[j])
    }
  }

  //Extract scenarios from user
  var mongo_user = [
    { "TIME": "7/3/20", "SAE": 4, "PRIV": 90, "ELEC": 40, "PUB": 25, "INT": 25, "COST": "3", "PMT": 7, "PTI": 9, "TTI": 3, "PTI": 6, "GHG": 6, "SPEED": 7, "STAND": 100 },
    { "TIME": "7/4/20", "SAE": 3, "PRIV": 73, "ELEC": 65, "PUB": 62, "INT": 14, "COST": "3", "PMT": 8, "PTI": 7, "TTI": 3, "PTI": 5, "GHG": 6.5, "SPEED": 26, "STAND": 80 },
    { "TIME": "7/5/20", "SAE": 2, "PRIV": 13, "ELEC": 14, "PUB": 77, "INT": 2, "COST": "3", "PMT": 5, "PTI": 2, "TTI": 4, "PTI": 8, "GHG": 7, "SPEED": 35.7, "STAND": 60 }
  ]

  // let mongoUserCursor = main("alandler")

  // console.log("MongoCursor: ", mongoUserCursor)
  var mongo_user = []
  for (let entry in mongo_user){
    mongo_user.push(entry)
  }

  //Functions to create Table Header
  function HeaderCell(prop) {
    return <th>{prop}</th>
  }
  function Header(headers) {
    var result = selected_headers.map(HeaderCell)
    return <thead>{result}</thead>
  }


  //Functions to create Table Body
  function Cell(stuff) {
    return <td>{stuff}</td>
  }

  function Row(obj, i) {
    var arr = []
    let index = 0
    for (var head of selected_headers) {
      if (head == "Select") {
        arr.push(i)
      }
      else if (obj[head] != undefined) {
        arr.push(obj[head])
      } else {
        arr.push("")
      }
    }
    var row = arr.map(Cell, i)
    return <tr>{row}</tr>
  }

  function Body(props) {
    var rows = mongo_user.map(Row)
    return <tbody>{rows}</tbody>
  }

  //Table Full Render Return
  return (
    <table>
      <Header></Header>
      <Body></Body>
    </table>
  )
}

export default Home;


function ComparisonSelection() {

  //get user scenarios from database

  return (
    <form className="compare-selector" action="/compare">
      <h4 style={{ "textAlign": "center" }}>Compare existing scenarios</h4>
      <label>Choose 1st scenario: </label>
      <select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <br></br>
      <label>Choose 2nd scenario: </label>
      <select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <br></br>
      <button type="submit">Compare!</button>
    </form>
  )
}


//
// Experimental function
//
function Experiment() {
  console.log("Nvm")

  return (
    <p></p>
  )
}