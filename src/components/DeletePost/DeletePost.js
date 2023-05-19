import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import deletePost from "../../services/postServices/deletePost";
import "./DeletePost.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ThemeContext } from "../../contexts/themeContext"

const DeletePost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState(null);
  const theme = useContext(ThemeContext)

  async function clickHandler(e) {
    const data = await deletePost(user.accessToken, postId);

    if (data !== undefined) {
      if (!data.code) {
        navigate(`/posts`, { replace: true });
      } else {
        setError(`${data.message}.`);
      }
    } else {
      setError("The server failed to connect.");
    }
  }

  return (
    <div className={`delete-div-${theme}`}>
      {error && <ErrorMessage error={error} />}
      <div>
        <p className={`delete-text-${theme}`}>
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
