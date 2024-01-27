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
let todos = [];

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
  response.json({ todo: todos });
});

//Servizio per eliminare i todo su server
app.delete("/eliminaTodo/:id",(request, response)=>{
 
  for(let i=0;i<todos.length;i++){
    const todo = todos[i];
    if(todo.id == request.params.id){
      todos.splice(i,1);
    }
  }
  response.json({result: "Ok"});
});

const server = http.createServer(app);
server.listen(80, () => {
  console.log("-> server running");
});
