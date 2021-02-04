import React, { useContext, useEffect } from 'react';
import PostList from '../components/PostList';
import { PostContext } from '../providers/PostProvider'
import { Container, Col, Row } from "reactstrap"
import WindowChecker from '../utils/WindowChecker';

const Explore = () => {
  const { posts, getAllPosts } = useContext(PostContext);

  useEffect(() => {
    WindowChecker()
    getAllPosts();
  }, []);

  return (
    <>
      <div className="postList">
        <PostList posts={posts} />
      </div>
    </>
  );
};

export default Explore;