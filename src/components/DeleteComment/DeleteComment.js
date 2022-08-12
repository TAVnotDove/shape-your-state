import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import deleteComment from "../../services/deleteComment";
import "../DeletePost/DeletePost.css";

const DeleteComment = () => {
  const { commentId } = useParams();
  const [comment, setComment] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:3030/data/comments/${commentId}`)
      .then((response) => response.json())
      .then((response) => {
        setComment(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function clickHandler(e) {
    const data = await deleteComment(user.accessToken, commentId);

    if (!data.code) {
      navigate(`/posts/${comment.postId}`, { replace: true });
    }
    
    console.log(data)
  }

  return (
    <div className="delete-div">
      <div>
        <p className="delete-text">
          Are you sure you want to delete this comment?
        </p>
        <button onClick={clickHandler} className="delete-button">Yes</button>
      </div>
    </div>
  );
};

export default DeleteComment;
