import React, { Component } from "react";

//D3
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'

//Data
import fl from "../data/fl-col.json"
import atl from "../data/atl-col.json"

class Compare extends Component {
  constructor(props) {
    super(props);
    console.log(Object.values(fl["Queue"]))
  }

  render() {
    return (
      <div>
        <h1>Compare</h1>
        <BarChart
          data={Object.values(fl["Queue"])}
          size={[1000, 500]}
        ></BarChart>
      </div>
    );
  }
}

class BarChart extends Component {
  constructor(props) {
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }
  componentDidMount() {
    this.createBarChart()
  }
  componentDidUpdate() {
    this.createBarChart()
  }
  createBarChart() {
    const node = this.node
    const dataMax = max(this.props.data)
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]])
    
      select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * 1)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 1)
  }
  render() {
    return <svg ref={node => this.node = node}
      width={1000} height={500}>
    </svg>
  }
}

export default Compare;
