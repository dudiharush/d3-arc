import React from "react";
import { render } from "react-dom";
import { scaleLinear, scaleSqrt } from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Selection from "d3-selection";

export interface IKpiArcProps {
  kpiValue: number;
  startAngle: number;
  endAngle: number;
  height: number;
}

class SApp extends React.Component<IKpiArcProps, {}> {
  render() {
    const { startAngle, endAngle, kpiValue, height } = this.props;

    const radius = height / 2;

    const x = scaleLinear()
      .domain([0, 1])
      .range([0, 2 * Math.PI]);

    const y = scaleLinear()
      .domain([0, 1])
      .range([0, radius]);

    const arcKpiData = {
      x0: startAngle,
      y0: 0.5,
      x1: endAngle,
      y1: 1
    };

    const arcKpiValueData = {
      x0: startAngle,
      y0: 0.5,
      x1: endAngle * kpiValue,
      y1: 1
    };

    const arc = d3Shape
      .arc()
      .startAngle(d => {
        return x(d.x0);
      })
      .endAngle(d => {
        return x(d.x1);
      })
      .innerRadius(d => {
        return y(d.y0);
      })
      .outerRadius(d => {
        return y(d.y1);
      });

    return (
      <svg width="400" height="400">
        <g transform={`translate(${radius}, ${radius})`}>
          <path id="kpi-arc" fill="rgba(192,192,192,1)" d={arc(arcKpiData)} />
          <path
            id="kpi-arc-value"
            fill="rgba(255, 0, 0, 0.8)"
            d={arc(arcKpiValueData)}
          />
        </g>
      </svg>
    );
  }
}

render(
  <SApp startAngle={0} endAngle={0.9} kpiValue={0.5} height={100} />,
  document.getElementById("root")
);
