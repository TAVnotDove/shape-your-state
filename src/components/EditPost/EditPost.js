import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editPost from "../../services/postServices/editPost";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
import "./EditPost.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ThemeContext } from "../../contexts/themeContext"

const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const theme = useContext(ThemeContext)

  useEffect(() => {
    fetch(`http://localhost:3030/data/posts/${postId}`)
      .then((response) => response.json())
      .then((response) => {
        setPost(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

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

      if (data !== undefined) {
        if (!data.code) {
          navigate(`/posts/${postId}`, { replace: true });
        } else {
          setError(`${data.message}.`);
        }
      } else {
        setError("The server failed to connect.");
      }
    } else {
      setError("You need to fill in both fields before submitting.");
    }
  }

  return (
    <div className={`edit-post-div-${theme}`}>
      {error && <ErrorMessage error={error} />}
      {post !== null ? (
        <form className={`edit-post-form-${theme}`} onSubmit={submitHandler}>
          <div>
            <label htmlFor="edit-post-title">Title:</label>
            <input name="title" id="edit-post-title" defaultValue={post.title}></input>
          </div>
          <div>
            <label htmlFor="edit-post-text">Text:</label>
            <input name="text" id="edit-post-text" defaultValue={post.text}></input>
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
