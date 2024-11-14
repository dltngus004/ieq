import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { G, Line, Rect, Text as SvgText } from 'react-native-svg';
import * as d3Scale from 'd3-scale';
import { getResponsivePadding, getResponsiveHeight } from '../utils/utils';

const BarChart = ({ data, labels, yMax = 100 }) => {
  const width = Dimensions.get('window').width - getResponsivePadding(20);
  const height = getResponsiveHeight(30);
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  const x = d3Scale.scaleBand().domain(labels).range([margin.left, width - margin.right]).padding(0.1);
  const y = d3Scale.scaleLinear().domain([0, yMax]).range([height - margin.bottom, margin.top]);

  return (
    <Svg width={width} height={height + margin.top + margin.bottom}>
      <G>
        {y.ticks(5).map((tick, i) => (
          <G key={i} transform={`translate(0, ${y(tick)})`}>
            <Line x1={margin.left} x2={width - margin.right} stroke="#e0e0e0" />
            <SvgText x={margin.left - 10} fontSize={10} fill="#000" textAnchor="end" dy="0.32em">
              {tick.toFixed(1)}
            </SvgText>
          </G>
        ))}
      </G>
      <G>
        {data.map((d, i) => (
          <Rect key={i} x={x(d.key)} y={y(d.value)} width={x.bandwidth()} height={y(0) - y(d.value)} fill={d.color} />
        ))}
      </G>
      <G>
        {data.map((d, i) => (
          <SvgText key={i} x={x(d.key) + x.bandwidth() / 2} y={y(d.value) - 5} fontSize={10} fill="#000" textAnchor="middle">
            {d.value.toFixed(1)}
          </SvgText>
        ))}
      </G>
      <G>
        {labels.map((d, i) => (
          <SvgText key={i} x={x(d) + x.bandwidth() / 2} y={height - 5} fontSize={10} fill="#000" textAnchor="middle">
            {d}
          </SvgText>
        ))}
      </G>
    </Svg>
  );
};

export default BarChart;
