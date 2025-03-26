import React, { useState } from "react";
import InputForm from "./components/InputForm";
import RadarChart from "./components/RadarChart";

function randomScore() {
  return Math.floor(Math.random() * 3) + 1;
}

const App = () => {
  // Initialiser med default data
  const [chartData, setChartData] = useState({
    kravstabilitet: randomScore(),
    projektStoerrelse: randomScore(),
    kompleksitet: randomScore(),
    projektTeam: randomScore(),
    kritikalitetAfFejl: randomScore(),
  });

  const handleChartUpdate = (data) => {
    setChartData(data); // Opdaterer diagrammet live
  };

  return (
    <div style={{ backgroundColor: "white", padding: "20px", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "black" }}>Søstjernen</h1>
      <InputForm onChange={handleChartUpdate} currentValues={chartData} />
      <RadarChart data={chartData} />
      <p style={{ textAlign: "center", color: "black", marginTop: "20px" }}>
        De fem dimensioner kan scores fra "1" til "3" i Søstjerne-radardiagrammet.
      </p>
    </div>
  );
};

export default App;
