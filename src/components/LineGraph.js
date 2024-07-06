// src/LineChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        // label: 'Sales',
        label: props.label,
        data: props.data,
        // data: [2000, 4000, 3000, 5000, 6000, 7000, 8000],
        borderColor: '#1878F1',
        backgroundColor: 'rgba(24, 120, 241, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
            display: false,
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          callback: function(value) {
            return value / 1000 + 'K';
          },
        },
        border: {
            display: false,
        }
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
