import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { QuizProvider } from '../providers/QuizProvider'
import Login from '../pages/Login';
import Register from '../pages/Register';
import Quiz from '../pages/Quiz'
import { PostProvider } from '../providers/PostProvider'
import { TagProvider } from '../providers/TagProvider'
import Discover from '../pages/Discover'
import NewPost from '../pages/NewPost'
import { PostTagProvider } from '../providers/PostTagProvider';
import Search from "../pages/Search"

const ApplicationViews = () => {
  const { isLoggedIn, getCurrentUser } = useContext(UserProfileContext);
  const user = getCurrentUser();

  const approvalChecker = () => {
    if (user && user.approved === 2) {
      return (
        <QuizProvider>
          <Route path="/quiz">
            <Quiz />
          </Route>
        </QuizProvider>)

    } else if (user && user.approved === 1) {
      return (
        <PostTagProvider>
          <PostProvider>
            <TagProvider>
              <Route path="/discover">
                <Search />
                <Discover />
              </Route>
              <Route path="/newpost">
                <NewPost />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
            </TagProvider>
          </PostProvider>
        </PostTagProvider>
      )
    }
  }

  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      {approvalChecker()}
    </Switch>
  );
};

export default ApplicationViews;