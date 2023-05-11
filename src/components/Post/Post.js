import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Comments from "../Comments/Comments";
import LoadingMessage from "../LoadingMessage/LoadingMessage";
import "./Post.css";
import { ThemeContext } from "../../contexts/themeContext"

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState(null);
  const theme = useContext(ThemeContext)

  useEffect(() => {
    fetch(`http://localhost:3030/data/posts/${postId}`)
      .then((response) => response.json())
      .then((response) => {
        setPost(response);
      })
      .catch(() => {
        setError("The server failed to connect.");
      });
  }, [postId]);

  return (
    <div className="post-div-container">
      {post !== null ? (
        <>
          {post.code ? (
            <Navigate to="/*" replace />
          ) : (
            <div className={`post-div-${theme}`}>
              <label>{post.title}</label>
              <p className={`post-details-text-${theme}`}>{post.text}</p>
              <div className="post-details-div">
                <p className={`post-details-username-${theme}`}>
                  Posted by: {post.username}
                </p>
                {user && post._ownerId === user._id ? (
                  <div className="post-actions-div">
                    <Link
                      to={`/post/edit/${postId}`}
                      className={`post-action-link-${theme}`}
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/post/delete/${postId}`}
                      className={`post-action-link-${theme}`}
                    >
                      Delete
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        error ? <></> : <LoadingMessage />
      )}
      <Comments />
    </div>
  );
};

export default Post;
