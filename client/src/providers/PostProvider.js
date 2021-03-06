import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const PostContext = createContext();

export function PostProvider(props) {
  const apiUrl = "/api/post";

  const { getToken } = useContext(UserProfileContext);
  const [posts, setPosts] = useState([]);
  const user = parseInt(JSON.parse(localStorage.getItem('userProfile')).id);


  const getAllPosts = () => {
    getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((posts) => {
          setPosts(posts);
        })
    );
  };

  const getPostsByUserId = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/getbyuser/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((posts) => {
          setPosts(posts);
        })
    );
  };

  const getPostsByTagName = (name) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/search/${name}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const postsToUse = res.map(r => { return r.post })
          for (const post of postsToUse) {
            post.authorName = post.userProfile.displayName
            post.context = post.content
            post.authorImg = post.userProfile.imageLocation
          }
          setPosts(postsToUse)
          window.scrollTo(0, 0)
        })
    );
  };

  const updatePost = (post) => {
    post.userProfile = null
    getToken().then((token) => {
      fetch(`${apiUrl}/${post.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
      })
    })
  }

  const deletePost = (post) => {
    getToken().then((token) => {
      fetch(`${apiUrl}/${post.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        if (window.location.href.includes("profile")) {
          getPostsByUserId(user)
        } else {
          getAllPosts()
        }
      })
    })
  }

  return (
    <PostContext.Provider
      value={{
        getAllPosts,
        getPostsByUserId,
        setPosts,
        posts,
        getPostsByTagName,
        updatePost,
        deletePost
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}