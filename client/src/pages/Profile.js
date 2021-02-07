import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PostList from '../components/PostList';
import { PostContext } from '../providers/PostProvider'
import WindowChecker from '../utils/WindowChecker';
import { StyleContext } from "../providers/StyleProvider"
import MyProfile from "./MyProfile"

const Profile = () => {
  const { posts, getPostsByUserId } = useContext(PostContext);
  const { style } = useContext(StyleContext);
  const { id } = useParams();
  const userProfileId = parseInt(JSON.parse(localStorage.getItem('userProfile')).id);

  useEffect(() => {
    window.scrollTo(0, 0)
    WindowChecker()
    getPostsByUserId(id)
  }, []);

  const PostChecker = () => {
    if (posts.length > 0 && parseInt(id) === userProfileId) {
      return (<div className={`postList${style.child} postList`}>
        <PostList posts={posts} />
        <MyProfile />
      </div>)
    } else if (posts.length === 0 && parseInt(id) === userProfileId) {
      return (<div className={`margin-whole${style.child}`}>
        <p className={`margin${style.child}`}>You have no posts!</p>
        <MyProfile />
      </div>)
    } else if (posts.length === 0 && parseInt(id) !== userProfileId) {
      return (<div className={`margin-whole${style.child}`}>
        <p className={`margin${style.child}`}>This user has no posts!</p>
      </div>)
    } else if (posts.length > 0 && parseInt(id) !== userProfileId) {
      return (<div className={`postList${style.child} postList`}>
        <PostList posts={posts} />
      </div>)
    }
  }

  return (
    <>
      <PostChecker />
    </>
  );
};

export default Profile;