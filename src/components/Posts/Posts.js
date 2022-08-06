import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

const Posts = () => {
  const [data, setData] = useState(null);
  const select = useRef();

  function onChange(e) {
    if (e.target.value === "recent") {
      setData((data) =>
        data.slice().sort((a, b) => a._createdOn - b._createdOn)
      );
    } else {
      setData((data) =>
        data.slice().sort((a, b) => b._createdOn - a._createdOn)
      );
    }
  }

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

  return (
    <div className="posts-div">
      <label htmlFor="cars">Choose a car:</label>
      <select ref={select} name="cars" id="cars" onChange={onChange}>
        <option value="recent">Recent</option>
        <option value="oldest">Oldest</option>
      </select>
      {data !== null ? (
        data.code !== 404 ? (
          data.length > 0 ? (
            data.map((x) => (
              <div key={x._id} className="post-div">
                <label>{x.title}</label>
                <p>Posted by: {x.username}</p>
                <p>Posted on: {String(new Date(x._createdOn))}</p>

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
