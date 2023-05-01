import { useState } from "react";
import { useNavigate } from "react-router-dom";
import createPost from "../../services/postServices/createPost";
import "./CreatePost.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const CreatePost = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState(null);

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title").trim();
    const text = formData.get("text").trim();

    if (title.length !== 0 && text.length !== 0) {
      const postResponse = await createPost(
        title,
        text,
        user.accessToken,
        user.username
      );

      if (postResponse !== undefined) {
        if (!postResponse.code) {
          navigate("/posts", { replace: true });
        } else {
          setError(`${postResponse.message}.`);
        }
      } else {
        setError("The server failed to connect.");
      }
    } else {
      setError("You need to fill in both fields before submitting.");
    }
  }

  return (
    <div className="create-post-div">
      {error && <ErrorMessage error={error} />}
      <form className="create-post-form" onSubmit={submitHandler}>
        <div>
          <label>Title:</label>
          <input name="title"></input>
        </div>
        <div>
          <label>Text:</label>
          <input name="text"></input>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
