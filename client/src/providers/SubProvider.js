import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const SubContext = createContext();

export function SubProvider(props) {
  const apiUrl = "/api/sub";

  const { getToken } = useContext(UserProfileContext);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState([]);
  const [rawSubs, setRawSubs] = useState([]);
  const userProfileId = parseInt(JSON.parse(localStorage.getItem('userProfile')).id);


  const getSubsByUser = () => {
    getToken().then((token) =>
      fetch(`${apiUrl}/getsubs/${userProfileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((subs) => {
          let postSubs = [];
          for (const sub of subs) {
            for (const post of sub.postSummary) {
              post.authorId = sub.authorId
              post.authorName = sub.authorName
              post.authorImg = sub.authorImg
              postSubs.push(post)
            }
          }
          setSubs(postSubs);
          setLoading(false)
        })
    );
  };

  const getSubList = () => {
    getToken().then((token) =>
      fetch(`${apiUrl}/getbyuser/${userProfileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((subs) => {
          setRawSubs(subs);
          setLoading(false)
        })
    );
  };

  const addSub = (sub) => {
    setLoading(true)
    getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sub),
      })
    ).then(getSubsByUser).then(getSubList);
  };

  const deleteSub = (providerId, subscriberId) => {
    setLoading(true)
    getToken().then((token) =>
      fetch(`${apiUrl}/${providerId}/${subscriberId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(getSubsByUser).then(getSubList)
    );
  }

  return (
    <SubContext.Provider
      value={{
        getSubsByUser,
        subs,
        setSubs,
        addSub,
        deleteSub,
        getSubList,
        rawSubs,
        loading
      }}
    >
      {props.children}
    </SubContext.Provider>
  );
}