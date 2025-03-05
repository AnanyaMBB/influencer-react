import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../shared";
import { Chart } from 'primereact/chart';
import ChartDataLabels from 'chartjs-plugin-datalabels';


export default function InfluencerChart(props) {
    const chartData = {
        labels: props.labels,
        datasets: [
            {
                label: 'Impressions',
                data: props.data,
                fill: true, // Enables gradient below the line
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(24, 120, 241, 0.4)'); // Top gradient color
                    gradient.addColorStop(1, 'rgba(24, 120, 241, 0)');   // Bottom gradient color
                    return gradient;
                },
                borderColor: '#1878F1', // Line color
                borderWidth: 3, // Line thickness
                tension: 0.4, // Makes the line smooth
                pointRadius: 5, // Circle radius
                pointBackgroundColor: '#1878F1', // Circle color
                pointHoverRadius: 7, // Hover size
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hides the legend
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Removes the grid lines
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                    color: '#333', // X-axis text color
                },
            },
            y: {
                grid: {
                    display: false, // Removes the grid lines
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                    color: '#333', // Y-axis text color
                },
            },
        },
    };

    return (
        <Chart type="line" data={chartData} options={chartOptions} />
    );
}