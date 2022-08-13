const deleteComment = (accessToken, commentId) => {
  return fetch(`http://localhost:3030/data/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "X-Authorization": accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default deleteComment;
