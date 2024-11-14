import React from 'react';
import { Dimensions, ScrollView } from 'react-native';
import Svg, { G, Line, Circle, Path, Text as SvgText } from 'react-native-svg';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { getResponsiveHeight } from '../utils/utils';

const LineChart = ({ data, labels, yMax = 100 }) => {
  const width = Dimensions.get('window').width * 2;
  const height = getResponsiveHeight(30);
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  const x = d3Scale.scalePoint().domain(labels).range([margin.left, width - margin.right]);
  const y = d3Scale.scaleLinear().domain([0, yMax]).range([height - margin.bottom, margin.top]);

  const lineGenerator = d3Shape
    .line()
    .x((d, i) => x(labels[i]))
    .y((d) => y(d.value))
    .curve(d3Shape.curveMonotoneX);

  const linePath = lineGenerator(data);

  return (
    <ScrollView horizontal style={{ height: height + margin.top + margin.bottom }}>
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
          <Path d={linePath} fill="none" stroke="#3D84FF" strokeWidth={2} />
        </G>
        <G>
          {data.map((d, i) => (
            <Circle key={i} cx={x(labels[i])} cy={y(d.value)} r={3} fill="#3D84FF" />
          ))}
        </G>
        <G>
          {data.map((d, i) => (
            <SvgText key={i} x={x(labels[i])} y={y(d.value) - 10} fontSize={10} fill="#000" textAnchor="middle">
              {Number(d.value).toFixed(1)}
            </SvgText>
          ))}
        </G>
        <G>
          {labels.map((d, i) => (
            <SvgText key={i} x={x(d)} y={height - 5} fontSize={10} fill="#000" textAnchor="middle">
              {d}
            </SvgText>
          ))}
        </G>
      </Svg>
    </ScrollView>
  );
};

export default LineChart;
