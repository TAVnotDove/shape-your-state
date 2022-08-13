import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editPost from "../../services/editPost";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
import "./EditPost.css";

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
      const data = await editPost(
        title,
        text,
        user.username,
        user.accessToken,
        postId
      );

      if (!data.code) {
        navigate(`/posts/${postId}`, { replace: true });
      }
    }
  }

  return (
    <div className="edit-post-div">
      {post !== null ? (
        <form className="edit-post-form" onSubmit={submitHandler}>
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
      ) : (
        <LoadingMessage />
      )}
    </div>
  );
};

export default EditPost;
