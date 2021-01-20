import React from 'react'

export default function CountryComponent({country}) {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <div>
        <h3>languages</h3>
        <ul>
          {country.languages.map((lang) => {
            // console.log('lang', lang)
            <li>{lang.nativeName}</li>;
          })}
        </ul>
      </div>
      <div>
        <img style={{ width: "50%" }} src={country.flag} />
      </div>
    </div>
  );
}
