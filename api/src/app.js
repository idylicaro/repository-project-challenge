const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes:0
  }
  repositories.push(repository)
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { url, title, techs } = request.body
  const index = repositories.findIndex( repo => repo.id === id)
  if (index < 0){
    return response.sendStatus(400)
  }
  const likes = repositories[index].likes
  repositories.splice(index,1)
  repositories.push({
    id,
    url,
    title,
    techs,
    likes
  })
  return response.send({
    id,
    url,
    title,
    techs,
    likes
  })
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const index = repositories.findIndex( repo => repo.id === id)
  if(index < 0){
    return response.sendStatus(400)
  }
  repositories.splice(index)
  return response.sendStatus(204)
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const index = repositories.findIndex( repo => repo.id === id)
  if (index < 0){
    return response.sendStatus(400)
  }
  let repo = repositories[index]
  repo.likes += 1
  repositories.splice(index,1)
  repositories.push(repo)
  return response.send(repo)
});

module.exports = app;
