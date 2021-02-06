import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PostList from '../components/PostList';
import { PostContext } from '../providers/PostProvider'
import WindowChecker from '../utils/WindowChecker';
import { StyleContext } from "../providers/StyleProvider"

const Profile = () => {
  const { posts, getPostsByUserId } = useContext(PostContext);
  const { style } = useContext(StyleContext);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0)
    WindowChecker()
    getPostsByUserId(id)
  }, []);

  const PostChecker = () => {
    if (posts.length > 0) {
      return (<div className={`postList${style.child} postList`}>
        <PostList posts={posts} />
      </div>)
    } else {
      return (<div className={`margin-whole${style.child}`}><p className={`margin${style.child}`}>You have no posts!</p></div>)
    }
  }

  return (
    <PostChecker />
  );
};

export default Profile;