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
    if (inspiration) {
      return (<PostList posts={inspiration} />)
    } else {
      return (<p>You have no saved inspiration!</p>)
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <InspChecker />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Inspiration;