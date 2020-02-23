import React from 'react';
import Plot from 'react-plotly.js';

function Histogram() {
  var x = [];
  for (var i = 0; i < 10; i++) {
    x[i] = Math.random();
  }
  return (
    <Plot
      data={[
        {
          x: x,
          type: 'histogram'
        }
      ]}
      layout={{ width: 600, height: 400, title: 'Histogram' }}
    />
  );
}

export default Histogram;
