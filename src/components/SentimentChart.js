// SentimentScoreChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SentimentChart() {
    const sentimentScore = 75; // Example sentiment score
    const data = {
        labels: ["Sentiment Score", "Remaining"],
        datasets: [
            {
                data: [sentimentScore, 100 - sentimentScore],
                backgroundColor: ["#3b5998", "#eeeeee"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: "50%",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        if (tooltipItem.label === "Sentiment Score") {
                            return `Sentiment Score: ${sentimentScore}`;
                        }
                    }
                }
            },
            legend: {
                display: false
            }
        }
    };

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Doughnut data={data} options={options} />
        </div>
    );
}

