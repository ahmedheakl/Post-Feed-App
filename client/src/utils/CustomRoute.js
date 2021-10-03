import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

import { Route, Redirect } from "react-router-dom";

function CustomRoute({ component: Comp, ...res }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...res}
      render={(props) => (user ? <Redirect to="/" /> : <Comp {...props} />)}
    />
  );
}

export default CustomRoute;
