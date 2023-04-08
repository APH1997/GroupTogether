import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, NavLink} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";


import GroupsPage from "./components/Groups";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
            <NavLink to="/groups/all">Groups</NavLink>
          </Route>
          <Route exact path="/groups/all">
            <GroupsPage />
          </Route>
        </Switch>}
    </>
  );
}

export default App;
