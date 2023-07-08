import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spots";
import SingleSpotDetails from "./components/SingleSpotDetails";
import UserManageSpots from "./components/UserManageSpots";
import CreateSingleSpot from "./components/CreateSingleSpot"
import EditSingleSpot from "./components/EditSingleSpot"

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
          <Route exact path="/" >
            <SpotsIndex />
          </Route >
          <Route path="/spots/new" >
            <CreateSingleSpot />
          </Route >
          <Route path="/spots/current">
            <UserManageSpots />
          </Route>
          <Route path="/spots/:spotId/edit" >
            <EditSingleSpot />
          </Route >
          <Route path="/spots/:spotId" >
            <SingleSpotDetails />
          </Route >
        </Switch>}
    </>
  );
}

export default App;
