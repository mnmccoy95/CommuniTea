import React, { useContext, useEffect } from 'react';
import PostList from '../components/PostList';
import { InspirationContext } from "../providers/InspirationProvider"
import { StyleContext } from "../providers/StyleProvider"
import WindowChecker from '../utils/WindowChecker';

const Inspiration = () => {
  const { inspiration, getInspirationByUser } = useContext(InspirationContext);
  const { style } = useContext(StyleContext);

  useEffect(() => {
    window.scrollTo(0, 0)
    WindowChecker()
    getInspirationByUser();
  }, []);

  const InspChecker = () => {
    if (inspiration.length > 0) {
      return (<div className={`postList${style.child} postList`}>
        <PostList posts={inspiration} />
      </div>)
    } else {
      return (<div className={`margin-whole${style.child}`}><p className={`margin${style.child}`}>You have no saved inspiration!</p></div>)
    }
  }

  return (

    <InspChecker />

  );
};

export default Inspiration;