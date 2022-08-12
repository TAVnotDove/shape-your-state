import React from "react";
import { useParams } from "react-router-dom";
import addComment from "../../services/addComment";

const CreateComment = ({ setUpdate }) => {
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
        console.log("success!");
        console.log(commentResponse);
        e.target.reset();
        setUpdate((oldState) => [...oldState]);
      } else {
        console.log("failure!");
        console.log(commentResponse);
      }
    }
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Comment:</label>
        <input type="text" name="comment"></input>
        <button>Comment</button>
      </form>
    </div>
  );
};

export default CreateComment;
