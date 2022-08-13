import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editComment from "../../services/editComment";
import "../EditPost/EditPost.css";
import LoadingMessage from "../LoadingMessage/LoadingMessage";

const EditComment = () => {
  const { commentId } = useParams();
  const [comment, setComment] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

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

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const commentFromForm = formData.get("comment").trim();
    const commentObject = {
      postId: comment.postId,
      author: comment.author,
      comment: commentFromForm,
    };

    if (commentFromForm.length !== 0) {
      const data = await editComment(
        comment._id,
        commentObject,
        user.accessToken
      );

      if (!data.code) {
        navigate(`/posts/${comment.postId}`, { replace: true });
      }
      console.log(data);
    }
  }

  return (
    <div className="edit-post-div">
      {comment !== null ? (
        <form className="edit-post-form" onSubmit={submitHandler}>
          <div>
            <label>Comment:</label>
            <input name="comment" defaultValue={comment.comment}></input>
          </div>
          <button>Edit</button>
        </form>
      ) : (
        <LoadingMessage />
      )}
    </div>
  );
};

export default EditComment;
