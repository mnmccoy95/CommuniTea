import React, { useContext, useEffect, useState } from "react";
import { SubContext } from "../providers/SubProvider"
import WindowChecker from "../utils/WindowChecker";
import PostList from "../components/PostList"
import { StyleContext } from "../providers/StyleProvider"


const Subscriptions = () => {
  const { subs, getSubsByUser } = useContext(SubContext);
  const { style } = useContext(StyleContext);

  useEffect(() => {
    window.scrollTo(0, 0)
    WindowChecker()
    getSubsByUser()
  }, []);


  const SubChecker = () => {
    if (subs.length > 0) {
      return (<div className={`postList${style.child} postList`}>
        <PostList posts={subs} />
      </div>)
    } else {
      return (<div className={`margin-whole${style.child}`}><p className={`margin${style.child}`}>You have no subscriptions!</p></div>)
    }
  }

  return (
    <SubChecker />
  );
};

export default Subscriptions;