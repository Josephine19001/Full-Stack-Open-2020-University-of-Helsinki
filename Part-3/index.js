require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const requestLogger = require("request-logger");
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

// Express configuration
const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.log("Something went wrong with server");
  }
  console.log(`Server running on port ${PORT}`);
});

const Phone = require("./models/phonebook");

const baseURL = "/api/persons";

app.use(express.json());
app.use(cors());

morgan.token("host", function (request, response) {
  return request.hostname;
});

morgan.token("body", function (request, response) {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.post(baseURL, (request, response, next) => {
  const { name, number } = request.body;
 
  const newPerson = new Phone({
    name: name,
    number: number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.get(baseURL, (request, response, next) => {
  Phone.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => {
      next(error);
    });
});

app.put(`${baseURL}/:id`, (request, response, next) => {
  const { name, number } = request.body;
  const id = request.params.id;

  const updatePerson = {
    name,
    number,
  };

  Phone.findByIdAndUpdate(id, updatePerson, { new: false })
    .then((updatedPerson) => {
      response.status(200).json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.get(`${baseURL}/:id`, (request, response, next) => {
  const id = request.params.id;
  Phone.findById(id)
    .then((person) => {
      if (!person) {
        response
          .status(404)
          .json({
            error: `Person with ${id} was not found`,
          })
          .end();
      }
      response.status(200).send(person);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete(`${baseURL}/:id`, (request, response, next) => {
  const id = request.params.id;
  Phone.findByIdAndRemove(id)
    .then((result) => {
      response
        .status(204)
        .json(`Successfully delete person with id:${id}`)
        .end();
    })
    .catch((error) => {
      next(error);
    });
});

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);
