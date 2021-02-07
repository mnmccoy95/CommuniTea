import React, { useContext, useEffect, useState } from 'react';
import { StyleContext } from "../providers/StyleProvider"

const MyProfile = () => {
  const { updateStyle, getStyle } = useContext(StyleContext);
  const [style, setStyle] = useState([]);

  const handleStyleChange = (event) => {
    const styleId = parseInt(event.target.id);
    updateStyle(styleId)
    setStyle(getStyle())
  }

  return (
    <>
      <button id="1" className="dangerBtn btn" onClick={(e) => { handleStyleChange(e) }}>Sweet</button>
      <button id="2" className="pinkBtn-classic btn" onClick={(e) => { handleStyleChange(e) }}>Classic</button>
      <button id="3" className="pinkBtn-goth btn" onClick={(e) => { handleStyleChange(e) }}>Gothic</button>
    </>
  );
};

export default MyProfile;