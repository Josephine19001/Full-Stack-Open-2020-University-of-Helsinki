import React from "react";

export default function Country({ country }) {
  return (
    <div>
      <h2>{country.name}</h2>
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
    </div>
  );
}
