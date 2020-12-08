import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        props.isAuth ? <Component {...props} /> : <Redirect to={{
          pathname: '/',
          state: { from: '/saved-news' }
        }} />
      }
    </Route>
)}

export default ProtectedRoute;