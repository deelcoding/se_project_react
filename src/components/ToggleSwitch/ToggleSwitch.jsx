import { useState } from "react";
import React from "react";
import "./ToggleSwitch.css";

// const ToggleSwitch = ({ isOn, handleToggle, onColor }) => {
// 	return (
// 			<>
// 					<input
// 							checked={isOn}
// 							onChange={handleToggle}
// 							className="react-switch-checkbox"
// 							id={`react-switch-new`}
// 							type="checkbox"
// 					/>
// 					<label
// 							style={{ background: isOn && onColor }}
// 							className="react-switch-label"
// 							htmlFor={`react-switch-new`}
// 					>
// 							<span className={`react-switch-button`} />
// 					</label>
// 			</>
// 	);
// };

const ToggleSwitch = () => {
  const [currentTemperatureUnit, handleToggleSwitchChange] = useState("F");
  const handleChange = (e) => {
    if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
    if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  };
  return (
    <label
      htmlFor=""
      className="switch"
      onChange={handleChange}>
      <input
        type="checkbox"
        className="switch__box"
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}>
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}>
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
