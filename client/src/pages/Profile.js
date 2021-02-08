import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PostList from '../components/PostList';
import { PostContext } from '../providers/PostProvider'
import WindowChecker from '../utils/WindowChecker';
import { StyleContext } from "../providers/StyleProvider"
import { Container, Col, Row } from "reactstrap"
import { UserProfileContext } from "../providers/UserProfileProvider"
import ProfileSummary from "../components/ProfileSummary"

const Profile = () => {
  const { posts, getPostsByUserId } = useContext(PostContext);
  const { userSummary, getUserSummary } = useContext(UserProfileContext);
  const { style } = useContext(StyleContext);
  const { id } = useParams();
  const userProfileId = parseInt(JSON.parse(localStorage.getItem('userProfile')).id);

  useEffect(() => {
    window.scrollTo(0, 0)
    WindowChecker()
    getPostsByUserId(id)
    getUserSummary(id)
  }, [id]);

  const PostChecker = () => {
    if (posts.length > 0) {
      return (<Col xs="auto">
        <PostList posts={posts} />
      </Col>)
    } else if (posts.length === 0 && parseInt(id) === userProfileId) {
      return (<div className={`margin-whole${style.child}`}>
        <p className={`margin${style.child}`}>You have no posts!</p>
      </div>)
    } else if (posts.length === 0 && parseInt(id) !== userProfileId) {
      return (<div className={`margin-whole${style.child}`}>
        <p className={`margin${style.child}`}>This user has no posts!</p>
      </div>)
    }
  }

  const profileChecker = () => {
    if (userSummary) {
      return (<ProfileSummary profileSummary={userSummary[0]} />)
    }
  }

  return (
    <>
      <Container className={`profileContainer${style.child}`}>
        <Row>
          {profileChecker()}
          <PostChecker />
        </Row>
      </Container>
    </>
  );
};

export default Profile;