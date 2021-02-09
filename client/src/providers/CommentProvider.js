import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const CommentContext = createContext();

export function CommentProvider(props) {
  const apiUrl = "/api/comment";
  const [comments, setComments] = useState([]);

  const { getToken } = useContext(UserProfileContext);
  const user = parseInt(JSON.parse(localStorage.getItem('userProfile')).id);


  const getCommentsByPostId = (postId) => {
    getToken().then((token) => {
      fetch(`${apiUrl}/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
        .then(setComments)
    })
  }

  const addComment = (comment) => {
    return getToken().then((token) => {
      fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      }).then((res) => res.json()).then((res) => console.log(res))
    })
  }

  const updateComment = (comment) => {
    getToken().then((token) => {
      fetch(`${apiUrl}/${comment.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      })
    })
  }

  const deleteComment = (comment) => {
    getToken().then((token) => {
      fetch(`${apiUrl}/${comment.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    })
  }

  return (
    <CommentContext.Provider
      value={{
        addComment,
        updateComment,
        deleteComment,
        comments,
        setComments,
        getCommentsByPostId
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
}