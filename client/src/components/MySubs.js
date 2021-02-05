import React from "react";
import PostList from "./PostList";

const MySubs = ({ subs }) => {

  return (
    <div>
      {subs.map((sub) => (
        <div className="col-lg-10 col-xs-12 myposts-posts">
          <PostList posts={sub} />
        </div>
      ))}
    </div>
  );
};

export default MySubs;