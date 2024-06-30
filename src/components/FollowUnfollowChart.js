// DoughnutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FollowUnfollowChart() {
    const data = {
        labels: ["Follow", "Unfollow"],
        datasets: [
            {
                data: [60, 40], // Example data, adjust according to your needs
                backgroundColor: ["#3b5998", "#84a9db"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: "50%",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right'
            }
        }
    };
    
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Doughnut data={data} options={options} />
        </div>
    );
}



