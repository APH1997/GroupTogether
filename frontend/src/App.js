import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, NavLink } from "react-router-dom";
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
import ManageGroupsPage from "./components/Groups/ManageGroups";
import ManageEventsPage from "./components/Events/ManageEvents";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./components/404";


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
            <ProtectedRoute>
              <GroupsPage />
            </ProtectedRoute>
          </Route>

          <Route exact path="/groups/new">
            <ProtectedRoute>
              <CreateGroupForm />
            </ProtectedRoute>
          </Route>

          <Route exact path="/groups/:groupId">
            <ProtectedRoute>
              <GroupDetails />
            </ProtectedRoute>
          </Route>

          <Route exact path="/groups/:groupId/edit">
            <ProtectedRoute>
              <EditGroupForm />
            </ProtectedRoute>
          </Route>

          <Route exact path="/groups/:groupId/events/new">
            <ProtectedRoute>
              <CreateEventForm />
            </ProtectedRoute>
          </Route>

          <Route exact path="/groups/:groupId/events/:eventId/edit">
            <ProtectedRoute>
              <EditEventForm />
            </ProtectedRoute>
          </Route>

          <Route exact path="/events/all">
            <ProtectedRoute>
              <EventsPage />
            </ProtectedRoute>
          </Route>

          <Route exact path="/events/:eventId">
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          </Route>

          <Route exact path="/users/:userId/groups">
            <ProtectedRoute>
              <ManageGroupsPage />
            </ProtectedRoute>
          </Route>

          <Route exact path="/users/:userId/events">
            <ProtectedRoute>
              <ManageEventsPage />
            </ProtectedRoute>
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>}
    </>
  );
}

export default App;
