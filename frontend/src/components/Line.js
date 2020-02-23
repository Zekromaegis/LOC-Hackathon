import React from 'react';
import Plot from 'react-plotly.js';
export default function LineChart() {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          mode: 'lines+markers',
          marker: { color: 'red' }
        }
      ]}
      layout={{ width: 600, height: 400, title: 'A Fancy Plot' }}
    />
  );
}
