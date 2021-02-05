import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PostList from '../components/PostList';
import { PostContext } from '../providers/PostProvider'
import WindowChecker from '../utils/WindowChecker';

const Profile = () => {
  const { posts, getPostsByUserId } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0)
    WindowChecker()
    getPostsByUserId(id)
  }, []);

  const PostChecker = () => {
    if (posts.length > 0) {
      return (<div className="postList">
        <PostList posts={posts} />
      </div>)
    } else {
      return (<p className="margin">You have no posts!</p>)
    }
  }

  return (
    <PostChecker />
  );
};

export default Profile;