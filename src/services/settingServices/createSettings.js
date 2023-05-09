const createSettings = (accessToken) => {
  return fetch("http://localhost:3030/data/settings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": accessToken,
    },
    body: JSON.stringify({ theme: "dark" }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default createSettings;
