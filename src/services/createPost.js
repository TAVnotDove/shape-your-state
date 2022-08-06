const createPost = (title, text, accessToken, username) => {
    return fetch("http://localhost:3030/data/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": accessToken
      },
      body: JSON.stringify({ title, text, username}),
    })
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  export default createPost;
  