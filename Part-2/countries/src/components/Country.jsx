import React, { useState, useEffect } from "react";
import axios from "axios";

import Weather from './Weather';

export default function Country({ country }) {
  const [isShow, setIsShow] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  const api_key = process.env.REACT_APP_OPEN_WEATHER_API

  const weatherBaseURL = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`;

  const handleShow = (event,country) => {
    event.preventDefault();
    setIsShow(!isShow);
  };

  useEffect(() => {
    const fetchWeatherData = () => {
      axios
        .get(weatherBaseURL)
        .then((response) => setWeatherData([...response.data.weather]));
        
    };
    fetchWeatherData();
  }, []);

  console.log('weather', weatherData);

  return (
    <div>
      <h2>{country.name}</h2>
      <span>
        {" "}
        <button onClick={handleShow}>show</button>
      </span>
      {isShow && (
        <>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>

          <div>
            <h3>languages</h3>
            <div>
              <ul>
                {country.languages.map((lang) => {
                  return <li>{lang.name}</li>;
                })}
              </ul>
            </div>
          </div>
          <div>
            <img style={{ width: "50%" }} src={country.flag} />
          </div>
          {
            weatherData.map(current => {
              <Weather current={current} city={country.capital} />
            })
          }
        </>
      )}
    </div>
  );
}
