import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostComments from "../PostComments/PostComments";
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
  }, []);

  return (
    <div className="post-div-container">
      {post !== null ? (
        <div className="post-div">
          <label>{post.title}</label>
          <p>{post.text}</p>
          <div className="test-the-div">
            <p>Posted by: {post.username}</p>
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
      ) : (
        <p className="post-p">Loading...</p>
      )}
      {<PostComments />}
    </div>
  );
};

export default Post;
