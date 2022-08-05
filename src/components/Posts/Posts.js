import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

const Posts = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3030/data/posts")
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(data)

  return (
    <div className="posts-div">
      {data !== null ? (
        data.code !== 404 ? (
          data.length > 0 ? (
            data.map((x) => (
              <div key={x._id} className="post-div">
                <label>{x.title}</label>
                <p>{x.text}</p>
                <Link to={`/posts/${x._id}`}>Details</Link>
              </div>
            ))
          ) : (
            <p>No posts</p>
          )
        ) : (
          <p>No posts</p>
        )
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Posts;
