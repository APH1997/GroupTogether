import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, NavLink} from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import GroupsPage from "./components/Groups";
import GroupDetails from "./components/Groups/GroupDetails";
import EventsPage from "./components/Events";
import LandingPage from "./components/Landing";


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
            <LandingPage />
          </Route>
          <Route exact path="/groups/all">
            <GroupsPage />
          </Route>
          <Route exact path="/groups/new">

          </Route>
          <Route exact path="/groups/:groupId">
            <GroupDetails />
          </Route>
          <Route exact path="/events/all">
            <EventsPage />
          </Route>
        </Switch>}
    </>
  );
}

export default App;
