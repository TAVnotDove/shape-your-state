import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import deletePost from "../../services/deletePost";

const DeletePost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  async function clickHandler(e) {
    const data = await deletePost(user.accessToken, postId);

    if (!data.code) {
      navigate(`/posts`, { replace: true });
    }
  }

  return (
    <div className="logout-div">
      <p className="logout-text">Are you sure you want to delete this post?</p>
      <button onClick={clickHandler}>Yes</button>
    </div>
  );
};

export default DeletePost;
