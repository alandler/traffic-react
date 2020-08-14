import React, { Component, useEffect, useState } from "react";
// import { Document, Page } from 'react-pdf';

import ReactPDF from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Document, Text, View, StyleSheet } from '@react-pdf/renderer';

//HTTP Axios
import axios from 'axios';

//Modules
import MapDiv from "../modules/MapDiv.js";

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Documentation</h1>
        <h3>Urban Decision Dashboard for Autonomy</h3>
        <br></br>
        <p><b>Contributors: </b>Anna Landler, Vindula Jayawardana, Cathy Wu</p>
        <PDFViewer style={styles.viewer}>
          <PDF />
        </PDFViewer>
        <GetTime />
        <PostInputs />
      </div>
    );
  }
}


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
    width: '425px',
    height: '550px'
  },
});

const PDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

const GetTime = () => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return <div>
    "Current time": {currentTime}
  </div>
}


const inputs = {
  sae: Math.floor(Math.random() * 6),
  elec: Math.floor(Math.random() * 101),
  pub: Math.floor(Math.random() * 101),
  priv: Math.floor(Math.random() * 101),
  int: Math.floor(Math.random() * 101),
  cost: Math.floor(Math.random() * 5),
};

class PostInputs extends Component {

  constructor(props) {
    const item1 = { lat: 24.207, lng: 120.611, stat1: [0, 1, 2, 3], stat1Color: [0, 1, 2, 3], stat2: [3, 2, 1, 0], stat2Color: [3, 2, 1, 0] }
    const item2 = { lat: 24.21, lng: 120.61, stat1: [], stat1: [3, 2, 1, 0], stat1Color: [3, 2, 1, 0], stat2: [3, 2, 1, 0], stat2Color: [3, 2, 1, 0] }

    super(props)

    this.state = {
      sae: null,
      recevied_intersections: [item1, item2],
      statList: ['stat1', 'stat2'],
      statIndex:1
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRun = this.handleRun.bind(this);
  }

  handleClick() {
    axios({
      method: 'get',
      url: '/intersection',
    })
      .then(res => {
        console.log("Data: ", res.data["Queue"])
        this.setState({ recevied_intersections: [res.data],
          statList: ["Queue", "Reward", "Velocity", "AvgTime", "Throughput"],
          statIndex: 2,
        })
      })
  }

  handleInputChange = event => {
    this.setState({
      sae: event.target.value,
    });
  }

  handleRun = event => {
    event.preventDefault();

    const sae = this.state.sae

    axios.post('/run', { sae })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Get data</button>
        <MapDiv
          height={600}
          width={700}
          centerLat={24.204003}
          centerLng={120.610827}
          intersections={this.state.recevied_intersections}
          statList={this.state.statList}
          statIndex={this.state.statIndex}
          timeIndex={2}
        />
      </div>
    )
  }
}

export default About;
