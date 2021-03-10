import React, { useState, useEffect } from "react";
import axios from "axios";

import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState([]);

  let city = "Helsinki";
  const countryBaseURL = "https://restcountries.eu/rest/v2/all";
 

  const handleQueryChange = (event) => {
    setQuery(event.target.value);

    const filteredCountries = countries.filter((country) => {
      return country.name.toLowerCase().includes(query.toLowerCase()) === true;
    });

    setFilter([...filteredCountries]);
  };

  useEffect(() => {
    const fetchCountriesData = () => {
      axios
        .get(countryBaseURL)
        .then((response) => setCountries([...response.data]));
        
    };
    fetchCountriesData();
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
                {country.name}
                <Country country={country} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
