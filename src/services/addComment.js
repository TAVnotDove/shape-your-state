const addComment = (commentObject, accessToken) => {
  return fetch(`http://localhost:3030/data/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": accessToken,
    },
    body: JSON.stringify(commentObject),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default addComment;
