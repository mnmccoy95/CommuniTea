import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
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
import { InspirationProvider } from '../providers/InspirationProvider'
import Inspiration from '../pages/Inspiration';
import Home from '../pages/Home'
import { SubProvider } from '../providers/SubProvider'
import Profile from '../pages/Profile';

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
      return (<>
        <PostTagProvider>
          <PostProvider>
            <TagProvider>
              <InspirationProvider>
                <SubProvider>
                  <Route path="/newpost">
                    <NewPost />
                  </Route>

                  <Route path="/" exact>
                    <Home />
                  </Route>
                </SubProvider>
              </InspirationProvider>
            </TagProvider>
          </PostProvider>
        </PostTagProvider>

        <PostTagProvider>
          <PostProvider>
            <TagProvider>
              <InspirationProvider>
                <SubProvider>
                  <Route path="/profile/:id">
                    <Profile />
                  </Route>
                </SubProvider>
              </InspirationProvider>
            </TagProvider>
          </PostProvider>
        </PostTagProvider>
        <PostTagProvider>
          <PostProvider>
            <TagProvider>
              <InspirationProvider>
                <SubProvider>
                  <Route path="/discover">
                    <Discover />
                  </Route>
                </SubProvider>
              </InspirationProvider>
            </TagProvider>
          </PostProvider>
        </PostTagProvider>
        <PostTagProvider>
          <PostProvider>
            <TagProvider>
              <InspirationProvider>
                <SubProvider>
                  <Route path="/inspiration">
                    <Inspiration />
                  </Route>
                </SubProvider>
              </InspirationProvider>
            </TagProvider>
          </PostProvider>
        </PostTagProvider>

      </>
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