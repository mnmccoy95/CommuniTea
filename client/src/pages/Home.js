import React, { useContext, useEffect, useState } from "react";
import { SubContext } from "../providers/SubProvider"
import WindowChecker from "../utils/WindowChecker";
import MySubs from "../components/MySubs";
import PostList from "../components/PostList"


const Subscriptions = () => {
  const { subs, getSubsByUser } = useContext(SubContext);

  useEffect(() => {
    WindowChecker()
    getSubsByUser()
  }, []);


  return (
    <div className="postList">
      <PostList posts={subs} />
    </div>
  );
};

export default Subscriptions;