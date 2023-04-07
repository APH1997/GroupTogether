import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import LoginFormPage from './components/LoginFormPage/index';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';


function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  console.log('user:', user);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
        <Switch>
          <Route exact path="/">
            {user && <h1>Hello {user.username}</h1>}
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
    )
  );
}

export default App;
