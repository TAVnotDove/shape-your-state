import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import addComment from "../../services/addComment";

const CreateComment = () => {
  const { postId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const comment = formData.get("comment");
    const commentObject = { postId, author: user.username, comment };
    const commentResponse = await addComment(commentObject, user.accessToken);

    if (!commentResponse.code) {
      console.log("success!");
      navigate(`/posts`, { replace: true });
      console.log(commentResponse);
    } else {
      console.log("failure!");
      console.log(commentResponse);
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
