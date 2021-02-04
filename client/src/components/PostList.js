import React from "react";
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div className="postCard" key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </>
  );
};

export default PostList;