import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const drawTicksPlugin = {
  id: "drawTicksPlugin",
  afterDraw: (chart) => {
    const { ctx, scales } = chart;
    const scale = scales.r;
    const tickPositions = scale.ticks.map((tick) => tick.value).filter((value) => value > 0);
    const radius = scale.drawingArea;

    tickPositions.forEach((tickValue) => {
      const tickRadius = (tickValue / scale.max) * radius; 
      scale._pointLabels.forEach((label, index) => {

        // Offset tick value based on angle
        const angleRadians = scale.getIndexAngle(index);
        const angle = scale.getPointPosition(index, tickRadius);
        const offset = 15;

        // Adjust position with offset
        const x = angle.x + Math.cos(angleRadians) * offset;
        const y = angle.y + Math.sin(angleRadians) * offset;

        // Draw tick value
        ctx.fillStyle = "black"; 
        ctx.font = "12px Arial"; 
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tickValue, x, y); 
        ctx.restore();
      });
    });
  },
};



const RadarChart = ({ data }) => {
  const chartData = {
    labels: [
      "Kravstabilitet",
      "Projekt-størrelse",
      "Kompleksitet",
      "Projekt-team",
      "Kritikalitet af fejl",
    ],
    datasets: [
      {
        label: "Søstjerne",
        data: [
          data.kravstabilitet,
          data.projektStoerrelse,
          data.kompleksitet,
          data.projektTeam,
          data.kritikalitetAfFejl,
        ],
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderColor: "black",
        borderWidth: 1,
        pointBackgroundColor: "black",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 3,
        ticks: {
          stepSize: 1,
          display: false, // Hide default ticks
        },
        grid: {
          color: "black",
          lineWidth: 2,
        },
        angleLines: {
          display: true,
          color: "black",
          lineWidth: 1.5,
        },
        pointLabels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "black",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: "90vw", height: "60vh", margin: "0 auto" }}>
      <Radar data={chartData} options={options} plugins={[drawTicksPlugin]} />
    </div>
  );
};

export default RadarChart;
