import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../providers/UserProfileProvider';
import { QuizProvider } from '../providers/QuizProvider'
import Login from '../pages/Login';
import Register from '../pages/Register';
import Quiz from '../pages/Quiz'

const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <Switch>
      {/* <Route path="/" exact>
        {isLoggedIn ? <Home /> : <Redirect to="/login" />}
      </Route> */}
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <QuizProvider>
        <Route path="/quiz">
          <Quiz />
        </Route>
      </QuizProvider>
    </Switch>
  );
};

export default ApplicationViews;