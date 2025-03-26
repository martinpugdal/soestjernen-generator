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
    const radius = scale.drawingArea;
    const tickPositions = scale.ticks.map((tick) => tick.value).filter((value) => value > 0);

    tickPositions.forEach((tickValue) => {
      const tickRadius = (tickValue / scale.max) * radius;

      scale._pointLabels.forEach((label, index) => {
        const tickPoint = scale.getPointPosition(index, tickRadius);

        const perpendicularAngle = scale.getIndexAngle(index);
        const lineLength = 20;
        const startX = tickPoint.x - Math.cos(perpendicularAngle) * (lineLength / 2);
        const startY = tickPoint.y - Math.sin(perpendicularAngle) * (lineLength / 2);
        const endX = tickPoint.x + Math.cos(perpendicularAngle) * (lineLength / 2);
        const endY = tickPoint.y + Math.sin(perpendicularAngle) * (lineLength / 2);

        ctx.save();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();

        const offset = 20;
        const valueX = tickPoint.x + Math.cos(perpendicularAngle) * offset;
        const valueY = tickPoint.y + Math.sin(perpendicularAngle) * offset;

        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tickValue, valueX, valueY);
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
          lineWidth: 0,
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
