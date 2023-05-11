import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editComment from "../../services/commentServices/editComment";
import "./EditComment.css";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
import { ThemeContext } from "../../contexts/themeContext"

const EditComment = () => {
  const { commentId } = useParams();
  const [comment, setComment] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const theme = useContext(ThemeContext)

  useEffect(() => {
    fetch(`http://localhost:3030/data/comments/${commentId}`)
      .then((response) => response.json())
      .then((response) => {
        setComment(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [commentId]);

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
    }
  }

  return (
    <div className="edit-comment-div">
      {comment !== null ? (
        <form className={`edit-comment-form-${theme}`} onSubmit={submitHandler}>
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
