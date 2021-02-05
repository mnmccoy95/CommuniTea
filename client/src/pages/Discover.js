import React, { useContext, useEffect } from 'react';
import PostList from '../components/PostList';
import { PostContext } from '../providers/PostProvider'
import WindowChecker from '../utils/WindowChecker';
import Search from "./Search"

const Explore = () => {
  const { posts, getAllPosts } = useContext(PostContext);

  useEffect(() => {
    window.scrollTo(0, 0)
    WindowChecker()
    getAllPosts();
  }, []);

  return (
    <>
      <div className="postList">
        <Search />
        <PostList posts={posts} />
      </div>
    </>
  );
};

export default Explore;