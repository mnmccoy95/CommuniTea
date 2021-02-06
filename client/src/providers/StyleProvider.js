import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const StyleContext = createContext();

export function StyleProvider(props) {

  const [style, setStyle] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getStyle = () => {
    //function for getting user's preferred style from database
    //right now just test one style

    style.parent = ""
    style.child = ""
    return style
  };

  return (
    <StyleContext.Provider
      value={{
        style,
        getStyle
      }}
    >
      {props.children}
    </StyleContext.Provider>
  );
}