import React,{useState, useEffect} from 'react';
import axios from 'axios'

import CountryComponent from './components/CountryComponent'

const baseURL = "https://restcountries.eu/rest/v2/all";

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState([])
  const [isShow, setIsShow] = useState(false)

  const handleQueryChange = (event) => {
    setQuery(event.target.value)

    const filteredCountries = countries.filter(country => {
      return country.name.toLowerCase().includes(query.toLowerCase()) === true
    })

    setFilter([...filteredCountries])
  }

  const handleShow = (event) => {
    event.preventDefault()

    setIsShow(true)
  }

  useEffect(() => {
    
    const fetchData =  () => {
      axios.get(baseURL).then(response => setCountries([...response.data]));
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <div>
        find countries <input type="text" onChange={handleQueryChange}/>
      </div>
      <div>
        {
          filter.length > 10 ? <p>Too many matches, specify another filter</p>:
          filter.map((country) => {
            return (
              <div>
                {country.name}{" "}
                <button onClick={handleShow}>show</button>
                {isShow && <CountryComponent country={country} />}
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
