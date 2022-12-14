import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadingMessage from "../LoadingMessage/LoadingMessage";

const Posts = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  function onChange(e) {
    if (e.target.value === "recent") {
      setData((data) =>
        data.slice().sort((a, b) => b._createdOn - a._createdOn)
      );
    } else {
      setData((data) =>
        data.slice().sort((a, b) => a._createdOn - b._createdOn)
      );
    }
  }

  useEffect(() => {
    fetch("http://localhost:3030/data/posts")
      .then((response) => response.json())
      .then((response) => {
        if (response.code) {
          setData([]);
        } else {
          setData(response.slice().sort((a, b) => b._createdOn - a._createdOn));
        }
      })
      .catch((error) => {
        setError("The server failed to connect.");
      });
  }, []);

  return (
    <div className="posts-div">
      <div className="posts-view-select-div">
        <label htmlFor="posts-view-select">View order:</label>
        <select id="posts-view-select" onChange={onChange}>
          <option value="recent">Recent</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      {error ? (
        <ErrorMessage error={error} />
      ) : data !== null ? (
        data.length > 0 ? (
          data.map((x) => (
            <div key={x._id} className="post-div">
              <label>{x.title}</label>
              <p className="posts-details-text">Posted by: {x.username}</p>
              <div className="test-div-post">
                <PostDate date={x._createdOn} />
                <Link to={`/posts/${x._id}`} className="posts-details-link">
                  Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="posts-details-text">No posts</p>
        )
      ) : (
        <LoadingMessage />
      )}
    </div>
  );
};

const PostDate = ({ date }) => {
  const formattedDate = String(new Date(date)).substring(4, 24);

  return <p className="posts-details-text">Posted on: {formattedDate}</p>;
};

export default Posts;
