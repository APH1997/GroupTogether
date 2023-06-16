import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, NavLink} from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import GroupsPage from "./components/Groups";
import GroupDetails from "./components/Groups/GroupDetails";
import EventsPage from "./components/Events";
import LandingPage from "./components/Landing";
import CreateGroupForm from "./components/Groups/CreateGroupForm"
import EditGroupForm from "./components/Groups/EditGroupForm";
import EventDetails from "./components/Events/EventDetails";
import CreateEventForm from "./components/Events/CreateEventForm";
import EditEventForm from "./components/Events/EditEventForm";
import MapContainer from "./components/Maps";

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
            <CreateGroupForm/>
          </Route>
          <Route exact path="/groups/:groupId">
            <GroupDetails />
          </Route>
          <Route exact path="/groups/:groupId/edit">
            <EditGroupForm />
          </Route>
          <Route exact path="/groups/:groupId/events/new">
            <CreateEventForm />
          </Route>
          <Route exact path="/groups/:groupId/events/:eventId/edit">
            <EditEventForm />
          </Route>
          <Route exact path="/events/all">
            <EventsPage />
          </Route>
          <Route exact path="/events/:eventId">
            <EventDetails />
          </Route>
          <Route exact path="/maps">
            <MapContainer />
          </Route>
          <Route>
            Page not found
          </Route>
        </Switch>}
    </>
  );
}

export default App;
