import React, { useEffect, useState } from "react";

import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "./NewReservation";
import NewTable from "./NewTable";
import SeatReservation from "./SeatReservation";
import useQuery from "../utils/useQuery";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());

  const url = useRouteMatch();
  const query = useQuery();

  function loadDate() {
    const newDate = query.get("date");
    if (newDate) {
      setDate(newDate);
    }
  }

  useEffect(loadDate, [url, query]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations/new">
        <NewReservation  />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} />
      </Route>
      <Route path="/dashboard/:date">
        <Dashboard />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
