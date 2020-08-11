import React, { Component } from "react";
// import { Document, Page } from 'react-pdf';

import ReactPDF from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Document, Text, View, StyleSheet } from '@react-pdf/renderer';

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
        <PDF/>
        </PDFViewer>
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

export default About;
