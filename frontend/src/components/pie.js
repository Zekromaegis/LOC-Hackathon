import React from 'react';
import Plot from 'react-plotly.js';

function PieChart() {
  return (
    <Plot
      data={[{ values: [19, 26, 55], labels: ['Residential', 'Non-Residential', 'Utility'], type: 'pie' }]}
      layout={{ width: 600, height: 400, title: 'A Fancy Plot' }}
    />
  );
}

export default PieChart;
