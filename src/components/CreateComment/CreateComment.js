import React from "react";
import { useParams } from "react-router-dom";
import addComment from "../../services/commentServices/addComment.js";
import "./CreateComment.css";

const CreateComment = ({ setUpdate, setError }) => {
  const { postId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const comment = formData.get("comment").trim();

    if (comment.length !== 0) {
      const commentObject = { postId, author: user.username, comment };
      const commentResponse = await addComment(commentObject, user.accessToken);

      if (!commentResponse.code) {
        e.target.reset();
        setUpdate((oldState) => [...oldState]);
      } else {
        setError(commentResponse)
      }
    }
  }

  return (
    <div className="create-comment-container">
      <form onSubmit={submitHandler}>
        <label htmlFor="create-comment-field">Comment:</label>
        <input id="create-comment-field" type="text" name="comment"></input>
        <button>Comment</button>
      </form>
    </div>
  );
};

export default CreateComment;
