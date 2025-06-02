import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Line, Polyline, Circle, G, Text as SvgText, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

// This is a simplified version of a line chart component
// In a real app, you'd use a proper charting library like react-native-chart-kit
export function LineChart({ data, width, height, chartConfig, style }) {
  const { labels, datasets } = data;
  
  // Calculate padding and graph dimensions
  const paddingTop = 16;
  const paddingRight = 16;
  const paddingBottom = 40;
  const paddingLeft = 40;
  const graphWidth = width - paddingLeft - paddingRight;
  const graphHeight = height - paddingTop - paddingBottom;
  
  // Find min and max values for scaling
  const allValues = datasets.flatMap(dataset => dataset.data.filter(value => value !== null));
  const minValue = Math.min(...allValues) * 0.9;
  const maxValue = Math.max(...allValues) * 1.1;
  
  // Create x and y scales
  const xScale = (i) => paddingLeft + (i * graphWidth / (labels.length - 1));
  const yScale = (value) => {
    if (value === null) return null;
    return paddingTop + graphHeight - ((value - minValue) / (maxValue - minValue) * graphHeight);
  };

  // Generate axis lines and labels
  const xAxis = (
    <G>
      <Line
        x1={paddingLeft}
        y1={paddingTop + graphHeight}
        x2={paddingLeft + graphWidth}
        y2={paddingTop + graphHeight}
        stroke="#E5E5E5"
        strokeWidth="1"
      />
      {labels.map((label, i) => (
        <G key={`x-label-${i}`}>
          {i % Math.ceil(labels.length / 5) === 0 && (
            <>
              <Line
                x1={xScale(i)}
                y1={paddingTop + graphHeight}
                x2={xScale(i)}
                y2={paddingTop + graphHeight + 4}
                stroke="#777777"
                strokeWidth="1"
              />
              <SvgText
                x={xScale(i)}
                y={paddingTop + graphHeight + 16}
                textAnchor="middle"
                fill="#777777"
                fontSize="10"
              >
                {label}
              </SvgText>
            </>
          )}
        </G>
      ))}
    </G>
  );
  
  // Y-axis with grid lines
  const yAxisLines = [];
  const yLabels = [];
  const numYLabels = 5;
  
  for (let i = 0; i <= numYLabels; i++) {
    const yPos = paddingTop + (graphHeight / numYLabels) * i;
    const value = Math.round(maxValue - ((maxValue - minValue) / numYLabels) * i);
    
    yAxisLines.push(
      <Line
        key={`y-line-${i}`}
        x1={paddingLeft}
        y1={yPos}
        x2={paddingLeft + graphWidth}
        y2={yPos}
        stroke="#E5E5E5"
        strokeWidth="1"
      />
    );
    
    yLabels.push(
      <SvgText
        key={`y-label-${i}`}
        x={paddingLeft - 8}
        y={yPos + 4}
        textAnchor="end"
        fill="#777777"
        fontSize="10"
      >
        {value}
      </SvgText>
    );
  }
  
  // Generate line paths and points for each dataset
  const datasetElements = datasets.map((dataset, datasetIndex) => {
    const points = dataset.data.map((value, i) => {
      if (value === null) return null;
      return `${xScale(i)},${yScale(value)}`;
    }).filter(point => point !== null).join(' ');

    const dots = dataset.data.map((value, i) => {
      if (value === null) return null;
      return (
        <Circle
          key={`point-${datasetIndex}-${i}`}
          cx={xScale(i)}
          cy={yScale(value)}
          r={3}
          fill={dataset.color}
          stroke="white"
          strokeWidth="1"
        />
      );
    }).filter(dot => dot !== null);
    
    return (
      <G key={`dataset-${datasetIndex}`}>
        <Polyline
          points={points}
          fill="none"
          stroke={dataset.color}
          strokeWidth={dataset.strokeWidth || 2}
          strokeDasharray={dataset.dashGap ? `4,${dataset.dashGap}` : ''}
        />
        {dots}
      </G>
    );
  });

  return (
    <View style={[{ width, height }, style]}>
      <Svg width={width} height={height}>
        {yAxisLines}
        {xAxis}
        {yLabels}
        {datasetElements}
      </Svg>
    </View>
  );
}