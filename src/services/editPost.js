const editPost = (title, text, username, accessToken, postId) => {
  return fetch(`http://localhost:3030/data/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": accessToken,
    },
    body: JSON.stringify({ title, text, username}),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default editPost;
