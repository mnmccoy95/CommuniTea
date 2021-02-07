import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const StyleContext = createContext();

export function StyleProvider(props) {
  const { getToken } = useContext(UserProfileContext);
  const [style, setStyle] = useState([]);

  const getStyle = () => {
    let newStyle = []
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
      const userProfileStyle = parseInt(userProfile.styleId)
      if (userProfileStyle === 1) {
        newStyle.child = " ";
        newStyle.parent = " ";
      } else if (userProfileStyle === 2) {
        newStyle.child = "-classic";
        newStyle.parent = "classic";
      } else if (userProfileStyle === 3) {
        newStyle.child = "-goth";
        newStyle.parent = "goth";
      }
    } else {
      newStyle.child = " ";
      newStyle.parent = " ";
    }
    setStyle(newStyle)
    return newStyle
  };

  const updateStyle = (styleId) => {
    const userProfileId = parseInt(JSON.parse(localStorage.getItem('userProfile')).id);
    return getToken().then((token) => {
      fetch(`/api/userprofile/updatestyle/${userProfileId}/${styleId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => resp.json())
        .then((res) => {
          localStorage.removeItem("userProfile")
          localStorage.setItem("userProfile", JSON.stringify(res));
          styleLogic(res.styleId)
        })
    })
  }

  const styleLogic = (styleId) => {
    if (styleId === 1) {
      style.child = " ";
      style.parent = " ";
    } else if (styleId === 2) {
      style.child = "-classic";
      style.parent = "classic";
    } else if (styleId === 3) {
      style.child = "-goth";
      style.parent = "goth";
    }
    setStyle(style)
  }

  return (
    <StyleContext.Provider
      value={{
        style,
        getStyle,
        updateStyle,
        setStyle
      }}
    >
      {props.children}
    </StyleContext.Provider>
  );
}