import axios from "axios";

const baseURL = " http://127.0.0.1:3001/api/persons";

const getAllPersons = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const getAllPersons2 = () => {
  const request = axios.get(baseURL);
  const nonExisting = {
    id: 10000,
    name: "Unknown name",
    number: "123456789",
  };
  return request.then((response) => response.data.concat(nonExisting));
};

const create = (newPerson) => {
  try{
    const request = axios.post(baseURL, newPerson);
    return request.then((response) => response.data);
  }catch(error){
    console.log(error)
  }
}

const deleteNumber = (id, data) => {
    return axios.delete(`${baseURL}/${id}`, data).then(response => console.log('Sucessfully deleted'))
}
const updateNumber = (updated) => {
    const request = axios.put(`${baseURL}`, updated)
    return request.then(response => response.data)
}

// const request = axios.post(`${baseURL}/${}`)
export default { getAllPersons, getAllPersons2, create, deleteNumber, updateNumber };
