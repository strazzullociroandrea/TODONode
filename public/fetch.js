/**
 * Funzione per salvare su server una todo
 * @param {*} body 
 * @returns response
 */
export const salva = (body) => {
  return new Promise((resolve, reject) => {
    fetch("/salvaTodo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
};

/**
 * Funzione per recuperare le todo salvate su server
 * @returns response
 */
export const recupera = () =>{
  return new Promise((resolve, reject)=>{
    fetch("/recuperaTodo", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
    .then(response => response.json())
    .then(response => {
      if (response.todo) 
        resolve(response.todo);
      else
        reject("Errore, todo non presenti");
    }
    )
    .catch(error => reject(error))
  });
  
}
