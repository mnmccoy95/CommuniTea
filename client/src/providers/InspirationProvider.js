import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const InspirationContext = createContext();

export function InspirationProvider(props) {
  const apiUrl = "/api/inspiration";

  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const [inspiration, setInspiration] = useState([]);
  const [loading, setLoading] = useState([]);
  const user = getCurrentUser();

  const getInspirationByUser = () => {
    const id = parseInt(user.id);
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((insp) => {
          setInspiration(insp);
          setLoading(false)
        }
        )
    );
  };

  const deleteInspiration = (id) => {
    setLoading(true)
    getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id),
      }).then(() => { getInspirationByUser(user.id) })
    )
  };

  const addInspiration = (insp) => {
    setLoading(true)
    getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(insp),
      })
    ).then(() => { getInspirationByUser(user.id) });
  };

  return (
    <InspirationContext.Provider
      value={{
        inspiration,
        setInspiration,
        getInspirationByUser,
        deleteInspiration,
        addInspiration,
        loading
      }}
    >
      {props.children}
    </InspirationContext.Provider>
  );
}