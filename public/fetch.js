export const salva = (body) => {
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