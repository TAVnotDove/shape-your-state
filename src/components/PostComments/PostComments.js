import React, { useEffect, useState } from "react";
import CreateComment from "../CreateComment/CreateComment";
import { useParams, Link } from "react-router-dom";
import "./PostComments.css";

const PostComments = () => {
  const { postId } = useParams();
  const [allComments, setAllComments] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  let newData;

  useEffect(() => {
    fetch(`http://localhost:3030/data/comments`)
      .then((response) => response.json())
      .then((response) => {
        setAllComments(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (allComments !== null) {
    if (allComments.code) {
      newData = [];
    } else {
      newData = allComments.filter((x) => x.postId === postId);
    }
  }
  console.log(allComments, 100);
  console.log(newData, 200);

  return (
    <div className="post-comments-container">
      {newData !== undefined ? (
        <>
          <p>Comments: {newData.length}</p>
          <div className="post-comments-div">
            {newData.length > 0 ? (
              newData.map((x) => (
                <div key={x._id} className="post-comment-div">
                  <p>{x.author}</p>
                  <p className="test-p-agent">{x.comment}</p>
                  {user && x._ownerId === user._id ? (
                    <div>
                      <Link
                        to={`/comment/edit/${x._id}`}
                        className="post-action-link"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/comment/delete/${x._id}`}
                        className="post-action-link"
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
              <p>No comments yet</p>
            )}
          </div>
          <CreateComment />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostComments;
