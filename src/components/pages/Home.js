import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Inputs></Inputs>
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
    };
  }
  render() {
    return (
      <div>
        {this.state.intersections}
      </div>
    )
  }
}


function Slider(props){
  return (
    <div class="slideout" id={props.id}>
      <h5>{props.header}</h5>
      <div id="saeVal">{props.preface}: 0</div>
      <input name="sae" type="range" class="slider" min="0" max="5" value="0" class="slider" id="sae"
        oninput="updateTextInput('saeVal', 'SAE Level', this.value)"></input>
      <div id="percentElectric">% of vehicles that are electric: 0</div>
      <input name="fuel" type="range" min="0" max="100" value="0" class="slider" id="electric"
        oninput="updateTextInput('percentElectric','% of vehicles that are electric', this.value)"></input>
    </div>
  )
}

export default Home;
