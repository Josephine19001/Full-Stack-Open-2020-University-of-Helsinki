import React, { useState, useEffect } from "react";
import axios from "axios";

import Country from "./components/Country";
import Weather from "./components/Weather";
import keys from "./keys";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  let city = "Helsinki";
  const countryBaseURL = "https://restcountries.eu/rest/v2/all";
  const weatherBaseURL = `http://api.weatherstack.com/current?access_key=${keys.weatherApiKey}&query=${city}`;

  const handleQueryChange = (event) => {
    setQuery(event.target.value);

    const filteredCountries = countries.filter((country) => {
      return country.name.toLowerCase().includes(query.toLowerCase()) === true;
    });

    setFilter([...filteredCountries]);
  };


  const handleShow = (event) => {
    event.preventDefault();

    setIsShow(true);
  };

  useEffect(() => {
    const fetchCountriesData = () => {
      axios
        .get(countryBaseURL)
        .then((response) => setCountries([...response.data]));
        
    };
    // const fetchWeatherData = () => {
    //   axios
    //     .get(weatherBaseURL)
    //     .then((response) => setWeatherData([...response.data]));
    // };
    fetchCountriesData();
    // fetchWeatherData();
  }, []);

  return (
    <div className="App">
      <div>
        find countries <input type="text" onChange={handleQueryChange} />
      </div>
      <div>
        {filter.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          filter.map((country) => {
            return (
              <div>
                {country.name} <button onClick={handleShow}>show</button>
                {isShow === true ? <Country country={country} /> : null}
                {weatherData.map((current) => {
                  return <Weather city={country.capital} current={current} />;
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
