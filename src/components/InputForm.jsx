import React, { useState } from "react";

const InputForm = ({ onChange, currentValues }) => {
  const [values, setValues] = useState({
    kravstabilitet: currentValues.kravstabilitet || 1,
    projektStoerrelse: currentValues.projektStoerrelse || 1,
    kompleksitet: currentValues.kompleksitet || 1,
    projektTeam: currentValues.projektTeam || 1,
    kritikalitetAfFejl: currentValues.kritikalitetAfFejl || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...values, [name]: Math.max(0, Math.min(3, parseInt(value))) };
    setValues(updatedValues);
    onChange(updatedValues);
  };

  const fields = [
    { label: "Kravstabilitet", name: "kravstabilitet" },
    { label: "Projekt-størrelse", name: "projektStoerrelse" },
    { label: "Kompleksitet", name: "kompleksitet" },
    { label: "Projekt-team", name: "projektTeam" },
    { label: "Kritikalitet af fejl", name: "kritikalitetAfFejl" },
  ];

  return (
    <form>
      {fields.map((field) => (
        <label key={field.name}>
          {field.label}:
          <input
            type="number"
            name={field.name}
            min="0"
            max="3"
            value={values[field.name]}
            onChange={handleChange}
          />
        </label>
      ))}
    </form>
  );
};

export default InputForm;
