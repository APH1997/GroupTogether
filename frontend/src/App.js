import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import LoginFormPage from './components/LoginFormPage/index';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    console.log('restoring user on refresh')
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    isLoaded && (
      <>
        <Switch>
          <Route to="/login">
            <LoginFormPage />
          </Route>
        </Switch>
      </>
    )
  );
}

export default App;
