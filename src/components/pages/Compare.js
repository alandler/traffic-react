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
          <ChooseY
            onClick={this.changeAttribute}
          ></ChooseY>
          <Row>
            <Col style={{ width: "90%" }}>
              <TimeSeries
                data={fl}
                data2={atl}
                size={[800, 400]}
                yAxisAttribute={this.state.ySelection}
              ></TimeSeries>
            </Col>
            {/* <Col style={{ width: "50%" }}>
              <TimeSeries
                data={atl}
                size={[400, 400]}
                yAxisAttribute={this.state.ySelection}
              ></TimeSeries>
            </Col> */}
          </Row>
          <Row>
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
    this.createBarChart = this.drawChart.bind(this)
    this.chartRef = React.createRef();
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
      .attr("transform", "translate("+margin.left+"," + h + ")")
      .call(axisBottom(xScale));
    select(node)
      .append("g")
      .attr("transform", "translate("+margin.left+",0)")
      .call(axisLeft(yScale));

    //Define Lines

    //Set line
    select(node)
      .append('path')
      .datum(data)
      .attr("transform", "translate("+margin.left+",0)")
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
      .attr("transform", "translate("+margin.left+",0)")
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

export default Compare;
