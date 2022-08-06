import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editPost from "../../services/editPost";

const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3030/data/posts/${postId}`)
      .then((response) => response.json())
      .then((response) => {
        setPost(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title").trim();
    const text = formData.get("text").trim();

    if (title.length !== 0 && text.length !== 0) {
      const data = await editPost(title, text, user.accessToken, postId);

      if (!data.code) {
        navigate(`/posts/${postId}`, { replace: true });
      }
    }
  }

  return (
    <>
      {post !== null ? (
        <div className="create-post-div">
          <form className="create-post-form" onSubmit={submitHandler}>
            <div>
              <label>Title:</label>
              <input name="title" defaultValue={post.title}></input>
            </div>
            <div>
              <label>Text:</label>
              <input name="text" defaultValue={post.text}></input>
            </div>
            <button>Edit</button>
          </form>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default EditPost;
