import React, { useContext, useEffect, useState } from "react";
import CreateComment from "../CreateComment/CreateComment";
import { useParams, Link } from "react-router-dom";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
import "./Comments.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ThemeContext } from "../../contexts/themeContext"

const Comments = () => {
  const { postId } = useParams();
  const [allComments, setAllComments] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [update, setUpdate] = useState([]);
  let newData;
  const [error, setError] = useState(null);
  const theme = useContext(ThemeContext)

  useEffect(() => {
    fetch(`http://localhost:3030/data/comments`)
      .then((response) => response.json())
      .then((response) => {
        if (response.code) {
          setAllComments([]);
        } else {
          setAllComments(response);
        }
      })
      .catch(() => {
        setError("The server failed to connect.");
      });
  }, [update]);

  if (allComments !== null) {
    if (allComments.code) {
      newData = [];
    } else {
      newData = allComments.filter((x) => x.postId === postId);
    }
  }

  return (
    <div className="post-comments-container">
      {error && <ErrorMessage error={error} />}
      {newData !== undefined ? (
        <>
          <p className={`post-comments-count-${theme}`}>Comments: {newData.length}</p>
          <div className={`post-comments-div-${theme}`}>
            {newData.length > 0 ? (
              newData.map((x) => (
                <div key={x._id} className={`post-comment-div-${theme}`}>
                  <p>{x.author}</p>
                  <p className="post-comment-comment">{x.comment}</p>
                  {user && x._ownerId === user._id ? (
                    <div>
                      <Link
                        to={`/comment/edit/${x._id}`}
                        className={`post-action-link-${theme}`}
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/comment/delete/${x._id}`}
                        className={`post-action-link-${theme}`}
                      >
                        Delete
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))
            ) : (
              <p className={`post-comments-empty-${theme}`}>No comments yet</p>
            )}
          </div>
          {user ? <CreateComment setUpdate={setUpdate} setError={setError} /> : <></>}
        </>
      ) : 
        error ? <></> : <LoadingMessage />
      }
    </div>
  );
};

export default Comments;
