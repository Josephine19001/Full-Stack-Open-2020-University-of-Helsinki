import React from "react";

export default function Weather({ city, current }) {
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {current.description}</p>
    </div>
  );
}
