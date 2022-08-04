const deletePost = (accessToken, postId) => {
  return fetch(`http://localhost:3030/data/posts/${postId}`, {
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

export default deletePost;
