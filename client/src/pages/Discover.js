import React, { useContext, useEffect, useState } from 'react';
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
      <Container>
        <Row>
          <Col className="col-lg-10">
            <PostList posts={posts} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Explore;