import React, { Component } from "react";

//D3
import { scaleLinear, scaleBand } from 'd3-scale'
import { max, min } from 'd3-array'
import { select } from 'd3-selection'
import { line, curveMonotoneX } from 'd3-shape';
import { axisLeft, axisBottom } from 'd3-axis';

//Data
import fl from "../data/fl-records.json"
import atl from "../data/atl-records.json"

//CSS
import './../App.css';

// Bootstrap grid
import { Container, Row, Col } from 'react-bootstrap';

//Leaflet
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup, Polygon } from "react-leaflet"

class Compare extends Component {
  constructor(props) {
    super(props);

    this.state = { ySelection: "Queue" };
    this.changeAttribute = this.changeAttribute.bind(this);
  }

  changeAttribute(e) {
    this.setState({
      ySelection: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>Compare</h1>
        <Container>
        <Row>
            <Col>
              <table style={{ width: "80%", textAlign: "center" }}>
                <tr style={{ textAlign: "center" }}>
                  <th>Metric</th><th>Scenario 1</th><th>Scenario 3</th>
                </tr>
                <tr><th>PMT</th><td>7</td><td>5</td></tr>
                <tr><th>PTI</th><td>3</td><td>4</td></tr>
                <tr><th>TTI</th><td>6</td><td>8</td></tr>
                <tr><th>GHG</th><td>6</td><td>7</td></tr>
                <tr><th>Speed</th><td>7</td><td>35.7</td></tr>
                <tr><th>Standstill</th><td>100</td><td>60</td></tr>
              </table>
            </Col>
          </Row>
          <br></br>
          <ChooseY style={{ textAlign: "center" }}
            onClick={this.changeAttribute}
          ></ChooseY>
          <br></br>
          <Row>
            <Col style={{ width: "100%" }}>
              <TimeSeries
                data={fl}
                data2={atl}
                size={[1000, 400]}
                yAxisAttribute={this.state.ySelection}
              ></TimeSeries>
            </Col>
          </Row>
          <Row>
            <Col>
              <MapDiv
                onClick={this.changeAttribute}
                x={1}
                headColor={"red"}
              ></MapDiv>
            </Col>
            <Col>
              <MapDiv
                onClick={this.changeAttribute}
                x={3}
                headColor={"blue"}
              ></MapDiv>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function ChooseY(props) {
  return (
    <Row>
      <Col style={{ width: "100%" }}>
        <label>Choose an attribute:</label>

        <select name="yat" id="yat" onChange={(e) => props.onClick(e)}>
          <option value="Queue">Queue Length</option>
          <option value="Velocity">Average velocity</option>
          <option value="AvgTime">Average time per vehicle</option>
          <option value="Throughput">Cummulative Throughput</option>
        </select>
      </Col>
    </Row>
  )
}

class TimeSeries extends Component {
  constructor(props) {
    super(props)
    this.drawChart = this.drawChart.bind(this)
  }
  componentDidMount() {
    this.drawChart()
  }
  componentDidUpdate() {
    this.drawChart()
  }
  drawChart() {
    //Set node
    const node = this.node

    const data = this.props.data
    const data2 = this.props.data2

    var margin = { top: 10, right: 30, bottom: 30, left: 60 }
    var w = this.props.size[0] - margin.left - margin.right
    var h = this.props.size[1] - margin.top - margin.bottom
    var y_at = this.props.yAxisAttribute

    //Extract max
    var dataMax = max(data, function (d) { return d[y_at]; })
    var dataMin = min(data, function (d) { return d[y_at]; })

    //Set ranges
    const xScale = scaleLinear()
      .domain([0, data.length])
      .range([0, w])
    const yScale = scaleLinear()
      .domain([dataMin, dataMax])
      .range([h, 0])

    //Clear after each selection
    select(node)
      .selectAll('path')
      .data(this.props.data)
      .enter()
      .append('path')

    select(node)
      .selectAll('path')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('g')
      .data(this.props.data)
      .enter()
      .append('g')

    select(node)
      .selectAll('g')
      .data(this.props.data)
      .exit()
      .remove()

    //Add Axis
    select(node)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + h + ")")
      .call(axisBottom(xScale));
    select(node)
      .append("g")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(axisLeft(yScale));

    //Define Lines

    //Set line
    select(node)
      .append('path')
      .datum(data)
      .attr("transform", "translate(" + margin.left + ",0)")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line()
        .x(function (d, i) { return xScale(i) })
        .y(function (d) { return yScale(d[y_at]) })
      )

    select(node)
      .append('path')
      .datum(data2)
      .attr("transform", "translate(" + margin.left + ",0)")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", line()
        .x(function (d2, i2) { return xScale(i2) })
        .y(function (d2) { return yScale(d2[y_at]) })
      )
  }

  render() {
    return <svg ref={node => this.node = node}
      width={1000} height={500}>
    </svg>
  }
}

class MapDiv extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 24.204003,
      lng: 120.610827,
      zoom: 17,
      update: false
    }
    console.log("PROPS", props)

  }

  render() {
    let x = this.props.x

    const position = [this.state.lat, this.state.lng]

    const upper = [
      [24.21, 120.612],
      [24.2041, 120.61065],
      [24.203995, 120.610814],
      [24.21, 120.613],
    ]

    const right = [
      [24.204054, 120.611146],
      [24.203027, 120.614773],
      [24.202733, 120.614665],
      [24.203780, 120.611039]
    ]

    const lower = [
      [24.203815, 120.610964],
      [24.202156, 120.610508],
      [24.202303, 120.610084],
      [24.203903, 120.610588]
    ]

    const left = [
      [24.204485, 120.609290],
      [24.204216, 120.610476],
      [24.204006, 120.610428],
      [24.204280, 120.609328]
    ]

    let colors = ["green", "red", "orange", "yellow"]
    let hc = this.props.headColor
    console.log("hc", hc)

    return (
      <div>
        <h3 style={{ textAlign: "center", color: { hc } }}>Scenario {x}</h3>
        <Map center={position} zoom={this.state.zoom} style={{ height: '450px', width: '100%', textAlign: "center" }}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polygon color={colors[Math.floor(Math.random() * 4)]} positions={upper} />
          <Polygon color={colors[Math.floor(Math.random() * 4)]} positions={right} />
          <Polygon color={colors[Math.floor(Math.random() * 4)]} positions={lower} />
          <Polygon color={colors[Math.floor(Math.random() * 4)]} positions={left} />
        </Map>
        <br></br>
        {/* <div style={{ textAlign: "center" }}>
                  <label>Choose an attribute:</label>

                  <select name="yat" id="yat" onChange={(e) => this.props.onClick(e)}>
                      <option value="Queue">Queue Length</option>
                      <option value="Velocity">Average velocity</option>
                      <option value="AvgTime">Average time per vehicle</option>
                      <option value="Throughput">Cummulative Throughput</option>
                  </select>
              </div> */}
      </div>
    )
  }
}

export default Compare;
