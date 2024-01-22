const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const todos = [];
//app.post & app.get --> body-parser
app.use("/", express.static(path.join(__dirname, "public")));

//Servizio per salvare i todo su server
app.post("/salvaTodo", (request, response) => {
  const todo = request.body;
  todo.id = new Date().getTime();
  todos.push(todo);
  response.end(JSON.stringify({ result: "ok" }));
});

//Servizio per recuperare i todo su server
app.get("/recuperaTodo", (request, response) => {
  console.log("recupero");
  response.end(JSON.stringify({ todo: todos }));
});
const server = http.createServer(app);
server.listen(80, () => {
  console.log("-> server running");
});
