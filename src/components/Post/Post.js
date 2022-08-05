import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    <>
      {post !== null ? (
        <div className="post-div">
          <label>{post.title}</label>
          <p>{post.text}</p>
          {user && post._ownerId === user._id ? (
            <>
              <Link to={`/post/edit/${postId}`}>Edit</Link>
              <Link to={`/post/delete/${postId}`}>Delete</Link>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Post;
