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
    const updatedValues = { ...values, [name]: parseInt(value) };
    setValues(updatedValues);
    onChange(updatedValues);
  };

  return (
    <form>
      <label>
        Kravstabilitet:
        <input
          type="number"
          name="kravstabilitet"
          min="1"
          max="3"
          value={values.kravstabilitet}
          onChange={handleChange}
        />
      </label>
      <label>
        Projekt-størrelse:
        <input
          type="number"
          name="projektStoerrelse"
          min="1"
          max="3"
          value={values.projektStoerrelse}
          onChange={handleChange}
        />
      </label>
      <label>
        Kompleksitet:
        <input
          type="number"
          name="kompleksitet"
          min="1"
          max="3"
          value={values.kompleksitet}
          onChange={handleChange}
        />
      </label>
      <label>
        Projekt-team:
        <input
          type="number"
          name="projektTeam"
          min="1"
          max="3"
          value={values.projektTeam}
          onChange={handleChange}
        />
      </label>
      <label>
        Kritikalitet af fejl:
        <input
          type="number"
          name="kritikalitetAfFejl"
          min="1"
          max="3"
          value={values.kritikalitetAfFejl}
          onChange={handleChange}
        />
      </label>
    </form>
  );
};

export default InputForm;
