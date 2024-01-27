const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
const todos = [];

//app.post & app.get --> body-parser
app.use("/", express.static(path.join(__dirname, "public")));

//Servizio per salvare i todo su server
app.post("/salvaTodo", (request, response) => {
  const todo = request.body;
  todo.id = new Date().getTime();
  todos.push(todo);
  response.json({ result: "ok" });
});

//Servizio per recuperare i todo su server
app.get("/recuperaTodo", (request, response) => {
  console.log("recupero");
  response.json({ todo: todos });
});

//Servizio per eliminare una todo su server
app.delete("/eliminaTodo/:id",(request, response)=>{
  //elimino la todo con id uguale a quello passato come parametro
  todos = todos.filter((element) => element.id !== req.params.id);
  response.json({ result: "ok" });
})

//Servizio per segnare come completata una todo
app.put("/completataTodo",(request, response)=>{
  const todoParameter = request.body;
  //ricerco l'elemento e lo modifico
  todos.map(todo=>{
    if(todo == todoParameter){
      response.json({ result: "ok" });
      return todo.completed = true;
    }
  });
  response.json({ result: "error" });
})

const server = http.createServer(app);
server.listen(80, () => {
  console.log("-> server running");
});
