const userLogin = (email, password) => {
  return fetch("http://localhost:3030/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error);
    });
};

export default userLogin;
