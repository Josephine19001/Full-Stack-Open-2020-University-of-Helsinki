const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "010-123456",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "080-129456",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "090-123456",
  },
];

const baseURL = "/api/persons";

app.get(baseURL, (request, response) => {
  response.json(persons);
});

app.post(baseURL, (request, response) => {
  const body = request.body;
  console.log(body)
  if (!body.number || !body.name) {
    return response.status(400).json({
      error: "body missing either name or number",
    });
  }
  console.log(request.body);
  const newId = generateId();
  const newPerson = {
    id: newId,
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(newPerson);
  response.status(204).send(persons);
});

app.get("/info", (resquest, response) => {
  const date = new Date();
  const html = `<!DOCTYPE htm>\n<html>\n<body>\n<h3>Phonebook has info for 4 people</h3>\n<h3>${date}</h3></body></html>`;
  response.status(200).send(html);
});

app.get(`${baseURL}/:id`, (request, response) => {
  const id = parseInt(request.params.id, 10);
  if (!id) {
    return response.status(404).json({
      error: `Person with ${id} was not found`,
    });
  }
  const foundPerson = findPerson(id);
  response.status(200).send(foundPerson);
});

app.delete(`${baseURL}/:id`, (request, response) => {
  const id = parseInt(request.params.id, 10);
  if (!id) {
    return response.status(404).json({
      error: `Person with ${id} was not found`,
    });
  }
  persons = findPersonAndDelete(id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, (error) => {
  if (error) {
    console.log("Something went wrong with server");
  }
  console.log(`Server running on port ${PORT}`);
});

const findPerson = (id) => {
  const person = persons.filter((person) => person.id === id);
  return person;
};

const findPersonAndDelete = (id) => {
  persons = persons.filter((person) => person.id !== id);
  return persons;
};

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;

  return maxId;
};
