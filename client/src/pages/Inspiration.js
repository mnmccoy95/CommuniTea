import React, { useContext, useEffect } from 'react';
import PostList from '../components/PostList';
import { InspirationContext } from "../providers/InspirationProvider"
import { Container, Col, Row } from "reactstrap"
import WindowChecker from '../utils/WindowChecker';

const Inspiration = () => {
  const { inspiration, getInspirationByUser } = useContext(InspirationContext);

  useEffect(() => {
    WindowChecker()
    getInspirationByUser();
  }, []);

  const InspChecker = () => {
    if (inspiration.length > 0) {
      return (<div className="postList">
        <PostList posts={inspiration} />
      </div>)
    } else {
      return (<p>You have no saved inspiration!</p>)
    }
  }

  return (

    <InspChecker />

  );
};

export default Inspiration;