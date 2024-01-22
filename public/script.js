//DOM
const titoloTODO = document.getElementById("titoloInput");
const aggiungiTODO = document.getElementById("aggiungiButton");
const tbodyTODO = document.getElementById("contenutoTableTodo");
//variabili e template
let todos = [];
const todoTemplate = (title) => {
  return {
    title: title,
    completed: false,
  };
};

const templateBTNElimina = `
  <button class="btn btn-danger" id="ELIMINA_%ID">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
  </svg>
  </button>
`;

const templateBTNConferma = `
  <button class="btn btn-success" id="CONFERMA_%ID">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
  </svg>
  </button>
`;
const tbodyTodoTemplate =
  "<tr><td class='td %TESTOCOLOR'>%TITOLO</td><td>%CONFERMABTN</td><td>%ELIMINABTN</td></tr>";

//funzioni e programma
/** 
Funzione render per visualizzare in finestra la lista dei TODO
*/
const render = (
  array,
  templateRow,
  templateBTNElimina,
  templateBTNConferma,
  container,
) => {
  let html = "";
  let count = 0;
  array.forEach((element) => {
    let row = templateRow;
    row = row
      .replace("%TITOLO", element.title)
      .replace("%CONFERMABTN", templateBTNConferma.replace("%ID", count))
      .replace("%ELIMINABTN", templateBTNElimina.replace("%ID", count));
    if (element.completed) {
      row = row.replace("%TESTOCOLOR", "text-success");
    } else {
      row = row.replace("%TESTOCOLOR", "text-black");
    }
    html += row;
    count++;
  });
  //inserimento dell'html
  container.innerHTML = html;
  //gestione click button TODO completato
  const arrayBTNGreen = document.querySelectorAll(".btn-success");
  for (let i = 0; i < arrayBTNGreen.length; i++) {
    const button = arrayBTNGreen[i];
    if (button.id != "aggiungiButton") {
      button.onclick = () => {
        const posizioneID = button.id.split("_")[1];
        array[posizioneID].completed = true;
        render(
          array,
          templateRow,
          templateBTNElimina,
          templateBTNConferma,
          container,
        );
      };
    }
  }
  //gestione pressione button TODO elimina
  document.querySelectorAll(".btn-danger").forEach((button) => {
    button.onclick = () => {
      const posizioneID = button.id.split("_")[1];
      todos.splice(posizioneID, 1);
      render(
        array,
        templateRow,
        templateBTNElimina,
        templateBTNConferma,
        container,
      );
    };
  });
};

const salva = (body) => {
  return new Promise((resolve, reject) => {
    fetch("/salvaTodo", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => resolve("ok"));
  });
};
/** 
gestione click button aggiungiTODO presente nella card
*/
aggiungiTODO.onclick = () => {
  if (titoloTODO.value != "" && titoloTODO.value.length < 20) {
    if (titoloTODO.classList.contains("border-danger")) {
      titoloTODO.classList.remove("border-danger");
    }

    salva(todoTemplate(titoloTODO.value)).then((response) =>
      console.log(response),
    );

    todos.push(todoTemplate(titoloTODO.value));
    titoloTODO.value = "";
    render(
      todos,
      tbodyTodoTemplate,
      templateBTNElimina,
      templateBTNConferma,
      tbodyTODO,
    );
  } else {
    titoloTODO.classList.add("border-danger");
  }
};

window.onload = () => {
  fetch("/recuperaTodo", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.todo) {
        response = response.todo;
        todos = response;
        render(
          todos,
          tbodyTodoTemplate,
          templateBTNElimina,
          templateBTNConferma,
          tbodyTODO,
        );
      }
    });
};
