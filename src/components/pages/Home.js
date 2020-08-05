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
      </div>
    );
  }
}

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
        <input name="intersections" type="number" min="200" value={this.state.intersections} onChange={this.handleInputChange} />
        <br />
        <label>
          Passenger Cost:
          </label>
        <input name="passenger_cost" type="number" class="" step="0.01" value={this.state.passenger_cost} onChange={this.handleInputChange} />
        <br />
        <div class="center">
          <button type="submit" id="createScenarioButton">Create</button>
        </div>
      </form>
    )
  }
}

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
    console.log(filters)
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
          filters = {this.state.filters}
        />
      </div>
    )
  }
}

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
    </div>
  )
}

function Filter(props) {
  let lbl = "filter-" + props.header
  console.log("Label: ", lbl)
  return (
    <div class="filter-div">
      <input type="checkbox" name={lbl} onClick={props.onClick}></input>
      <label for={lbl}>{lbl}</label> <br />
    </div>
  );
}

function HeaderCell(header){
  return (
    <th>{header}</th>
  )
}
function Cell(props) {
  return (
    <td class = {props.class}>{props.content}</td>
  )
}
function Header(props){
  return props.headers.map(HeaderCell)
}

function Table(props) {
  var table = document.createElement("TABLE")
  var header = table.createTHead();
  var row = header.insertRow(0)
  //Add select thing
  var headerCell = document.createElement("TH");
  headerCell.innerHTML = ""
  row.appendChild(headerCell)

  //Loop through real headers
  for (var j = 0; j++; j <= props.filters.length) {
    if (props.filters[j] == true) {
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = props.headers[j]
      row.appendChild(headerCell)
    }
  }
  var mongo = [{"SAE":"1"}]
  //Append child rows to table
  for (var object in mongo) {
    var row = document.createElement("TR")
    for (var j = 0; j++; j <= props.filters.length) {
      if (props.filters[j] == true) {
        var cell = document.createElement("td")
        cell.innerHTML = mongo[props.headers[j]]
        row.appendChild(cell)
      }
    }
  }
  return (table)
}

export default Home;
