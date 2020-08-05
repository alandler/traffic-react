import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//CSS
import './../App.css';
import { render } from "@testing-library/react";


//
// Main Class HOME
//
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Inputs></Inputs>
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
      private: 0,
      public: 0,
      intersections: 0,
      passenger_cost: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
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
        <span>{this.state.private}</span>
        <input name="private" type="range" min="0" max="100" value={this.state.private} onChange={this.handleInputChange} />
        <br />
        <label>
          Percent Public/Rideshare Vehicles AV:
        </label>
        <span>{this.state.public}</span>
        <input name="public" type="range" min="0" max="100" value={this.state.public} onChange={this.handleInputChange} />
        <br />
        <label>
          Intersections:
          </label>
        <input name="intersections" type="number" min="0" value={this.state.intersections} onChange={this.handleInputChange} />
        <br />
        <label>
          Passenger Cost:
          </label>
        <input name="passenger_cost" type="number" class="" min="0" step="0.01" value={this.state.passenger_cost} onChange={this.handleInputChange} />
        <br />
        <div class="center">
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
      <div>
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
    <div>
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
    </div>
  )
}

function Filter(props) {
  let lbl = "filter-" + props.header
  return (
    <div class="filter-div">
      <input type="checkbox" name={lbl} onClick={props.onClick}></input>
      <label for={lbl}>{lbl}</label> <br />
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
  var mongo_user = [{ "SAE": 1, "PUB": 54, "COST": ".6", "GHG": "100" }, { "PUB": 2, "COST": "3" }, { "PRIV": 88, "PTI": 9 }]

  //Functions to create Table Header
  function HeaderCell(prop) {
    return <th>{prop}</th>
  }
  function Header(headers) {
    return selected_headers.map(HeaderCell)
  }


  //Functions to create Table Body
  function Cell(stuff) {
    return <td>{stuff}</td>
  }

  function Row(obj) {
    var arr = []
    for (var head of selected_headers) {
      if (obj[head] != undefined) {
        arr.push(obj[head])
      } else {
        arr.push("")
      }
    }
    var row = arr.map(Cell)
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





//
// Experimental function
//
function Experiment(){
  console.log("Nvm")

  return (
    <p>Experimentation ongoing</p>
  )
}