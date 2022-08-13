import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Comments from "../Comments/Comments";
import "./Post.css";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:3030/data/posts/${postId}`)
      .then((response) => response.json())
      .then((response) => {
        setPost(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

  return (
    <div className="post-div-container">
      {post !== null ? (
        <>
          {post.code ? (
            <Navigate to="/*" replace />
          ) : (
            <div className="post-div">
              <label>{post.title}</label>
              <p className="post-details-text">{post.text}</p>
              <div className="post-details-div">
                <p className="post-details-username">Posted by: {post.username}</p>
                {user && post._ownerId === user._id ? (
                  <div className="post-actions-div">
                    <Link
                      to={`/post/edit/${postId}`}
                      className="post-action-link"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/post/delete/${postId}`}
                      className="post-action-link"
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
        <p className="post-p">Loading...</p>
      )}
      <Comments />
    </div>
  );
};

export default Post;
