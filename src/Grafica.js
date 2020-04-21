import React, { Component, createRef } from "react";
import Chart from "chart.js";

class ChartComponent extends Component {
  constructor(props) {
    super(props);
    this.chartRef = createRef();
  }
  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
    });
  }

  render() {
    return <canvas ref={this.chartRef}></canvas>;
  }
}

export default ChartComponent;
