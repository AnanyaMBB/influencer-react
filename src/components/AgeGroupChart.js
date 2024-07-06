import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function AgeGroupChart(props) {
    const options = {
        indexAxis: "y", // Ensures the chart is horizontal
        responsive: true, // Ensures the chart is responsive
        maintainAspectRatio: false, // Adjust based on your specific layout needs
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Top 5 Age Groups",
            },
            tooltip: {
                enabled: false,
            },
            datalabels: {
                color: "#000000",
                formatter: (value, context) => value.toLocaleString(), // Format numbers with commas
                align: (context) => {
                    const value = context.dataset.data[context.dataIndex];
                    return value < 100 ? "end" : "start"; // Adjusts position based on value size
                },
                anchor: "end",
                offset: 0, // Controls the distance between the end of the bar and the label
                font: {
                    size: 12, // Static font size, adjust as needed
                },
            },
        },
        scales: {
            x: {
                display: false, // Hides the x-axis line and labels
                grid: {
                    drawBorder: false,
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: "black", // Set y-axis tick color to black
                },
            },
        },
    };

    console.log(props.data);
    const data = {
        labels: ["13-17", "18-24", "25-34", "35-44", "45-54", "50-64", "65+"],
        datasets: [
            {
                label: "Age",
                data: [
                    props.data.this_week_13_17 || 0,
                    props.data.this_week_18_24 || 0,
                    props.data.this_week_25_34 || 0,
                    props.data.this_week_35_44 || 0,
                    props.data.this_week_45_54 || 0,
                    props.data.this_week_50_64 || 0,
                    props.data.this_week_65 || 0,
                ],
                borderColor: "rgba(0, 123, 255, 1)",
                backgroundColor: "rgba(0, 123, 255, 0.5)",
            },
        ],
    };

    return (
        <div style={{ height: "400px", width: "100%" }}>
            <Bar options={options} data={data} plugins={[ChartDataLabels]} />
        </div>
    );
}
