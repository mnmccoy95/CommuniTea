import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const TagContext = createContext();

export function TagProvider(props) {
  const apiUrl = "/api/tag";

  const { getToken } = useContext(UserProfileContext);
  const [tags, setTags] = useState([]);

  const getTags = () => {
    getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((tags) => {
          setTags(tags);
        })
    );
  };

  const getTagById = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
    );
  };

  return (
    <TagContext.Provider
      value={{
        getTags,
        tags,
        setTags,
        getTagById
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
}