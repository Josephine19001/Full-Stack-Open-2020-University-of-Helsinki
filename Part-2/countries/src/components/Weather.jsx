import React from "react";

export default function Weather({ city, current }) {
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {current.temperature}</p>
      <p>population: {current.population}</p>
      <div>
        <img style={{ width: "50%" }} src={current.weather_icons} />
      </div>
      <p>wind: {current.wind}</p>
    </div>
  );
}
