import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import deletePost from "../../services/deletePost";
import "./DeletePost.css";

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
    <div className="delete-div">
      <div>
        <p className="delete-text">
          Are you sure you want to delete this post?
        </p>
        <button onClick={clickHandler} className="delete-button">
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeletePost;
