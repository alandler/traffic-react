//React
import React, { Component, useEffect, useState } from "react";

//Leaflet
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer, Marker, Popup, Polygon, Circle } from "react-leaflet"

//d3
import { max, min, quantile } from 'd3-array'


class MapDiv extends Component {
    constructor(props) {
        /* 
        height= integer
        width= integer
        center_lat= float
        center_lng= float
        intersections= list of objects {lat:_, lng:_, stat1:[], stat1Color:[], stat2[], stat2Color:[]}
        // Option 2: {lat:_, lng:_, data = {time1: {stat1:_, stat1Color:_, stat2:_, stat2Color:_}}
        stat_list= [stat1, stat2]
        stat_index= integer
        time_index= integer
        */
        super(props)
        // console.log("PROPS: ", this.props)
    }

    render() {
        const position = [this.props.centerLat, this.props.centerLng]
        let colors = ["red", "orange", "yellow", "green"]

        return (
            <div>
                <Map center={position} zoom={15} style={{ height: this.props.height, width: this.props.width, textAlign: "center" }}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Circles
                        props={this.props} 
                        colors = {colors}/>
                </Map>
            </div>
        )
    }
}

function Circles(params) {
    /*
     props
    */

    const extractedProps = params.props;
    // console.log("Extracted props: ", extractedProps)
    let arr = []
    // console.log("Extracted props: ", extractedProps['intersections'])
    for (let intersection of extractedProps["intersections"]) {
        let y = extractedProps.statList[extractedProps.statIndex]
        arr.push(<RenderCircle intersection={intersection} y={y} timeIndex={extractedProps.timeIndex} colors={params.colors}/>)
    }

    return arr
}

function RenderCircle(params) {
    /*
    y
    intersection
    timeIndex
    colors
    */
    console.log("Circle: ", params)
    // console.log("Color: ", params.colors[params.intersection[params.y + "Color"][params.timeIndex]])
    // console.log("Radius: ", params.intersection[params.y][params.timeIndex]*100)
    console.log("Center: ", [params.intersection.lat, params.intersection.lng])


    return <Circle color={params.colors[params.intersection[params.y + "Color"][params.timeIndex]]} center={[params.intersection.lat, params.intersection.lng]} radius={params.intersection[params.y][params.timeIndex]*100}></Circle>
}

export default MapDiv;