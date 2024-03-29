import React, { Component } from "react";
import ReactDOM from 'react-dom';

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
import { Map, TileLayer, Marker, Popup, Polygon } from "react-leaflet"

//import Inputs from "./pages/Home.js";

//PDF
import ReactPDF from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Document, Text, View, StyleSheet } from '@react-pdf/renderer';

//HTTP Axios
import axios from 'axios';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'col',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 35,
        padding: 10,
        flexGrow: 2
    },
    viewer: {
        width: "100%",
        height: '100%'
    },
});

class Outcome extends Component {
    constructor(props) {
        super(props)
        console.log("Outcome props: ", props)
        this.state = {
            ySelection: "Queue"
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.setState({
            ySelection: e.target.value
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col><h1 style={{ textAlign: "center" }}>Outcome</h1></Col>
                </Row>
                <Row>
                    <Col>
                        <MapDiv
                            onClick={this.onClick}
                        ></MapDiv>
                    </Col>
                    <Col>
                        <img src={require("../data/ATL.gif")} style={{ width: "450px", height: "450px" }}></img>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <TimeSeries
                            data={fl}
                            size={[500, 300]}
                            yAxisAttribute={this.state.ySelection}
                        ></TimeSeries>
                    </Col>
                    <Col>
                        <table style={{ width: "70%", float: "left", verticalAlign: "top" }}>
                            <tr style={{ textAlign: "center" }}>
                                <th colSpan="2">Metrics</th>
                            </tr>
                            <tr><th>PMT</th><td>6</td></tr>
                            <tr><th>PTI</th><td>7</td></tr>
                            <tr><th>TTI</th><td>3</td></tr>
                            <tr><th>GHG</th><td>23</td></tr>
                            <tr><th>Speed</th><td>35</td></tr>
                            <tr><th>Standstill</th><td>14</td></tr>
                        </table>
                    </Col>
                </Row>
                <Row style = {{height:"600px", width: "100%"}}>
                    <PDFViewer>
                        <PDF />
                    </PDFViewer>
                </Row>
            </Container>
        )
    }
}


class MapDiv extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: 24.203995,
            lng: 120.610814,
            zoom: 17,
            update: false
        }
        console.log("Props: ", props)

    }

    onClick() {
        let NEW = !this.state.update
        this.setState({ update: NEW })
    }

    render() {
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

        return (
            <div>
                <Map center={position} zoom={this.state.zoom} style={{ height: '450px', width: '500px', textAlign: "center" }}>
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
                <div style={{ textAlign: "center" }}>
                    <label>Choose an attribute:</label>

                    <select name="yat" id="yat" onChange={(e) => this.props.onClick(e)}>
                        <option value="Queue">Queue Length</option>
                        <option value="Velocity">Average velocity</option>
                        <option value="AvgTime">Average time per vehicle</option>
                        <option value="Throughput">Cummulative Throughput</option>
                    </select>
                </div>
            </div>
        )
    }
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

    }

    render() {
        return <svg ref={node => this.node = node}
            width={450} height={500}>
        </svg>
    }
}

const PDF = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Inputs</Text>
                <Text>SAE Level: 1</Text>
                <Text>Percent Electric Vehicles: 86%</Text>
                <Text>Percent Private Vehicles AV: 76%</Text>
                <Text>Percent Public/Rideshare Vehicles AV: 15%</Text>
                <Text>Intersections: 1</Text>
                <Text>Passenger Cost: $.60</Text>
            </View>
            <View style={styles.section}>
                <Text>Outcomes</Text>
                <Text>Avg speed: 13.4 mph</Text>
            </View>
        </Page>
    </Document>
);

export default Outcome;