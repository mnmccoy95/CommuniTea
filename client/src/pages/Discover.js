import React, { useContext, useEffect } from 'react';
import PostList from '../components/PostList';
import { PostContext } from '../providers/PostProvider'
import WindowChecker from '../utils/WindowChecker';
import Search from "./Search"
import { StyleContext } from "../providers/StyleProvider"

const Explore = () => {
  const { posts, getAllPosts } = useContext(PostContext);
  const { style } = useContext(StyleContext);

  useEffect(() => {
    window.scrollTo(0, 0)
    WindowChecker()
    getAllPosts();
  }, []);

  return (
    <>
      <div className={`postList postList${style.child}`}>
        <Search />
        <PostList posts={posts} />
      </div>
    </>
  );
};

export default Explore;