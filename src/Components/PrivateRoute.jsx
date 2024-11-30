import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, accessToken, ...rest }) => {
  // Log the access token only on mount (to avoid repetitive logs)
  useEffect(() => {
    console.log("ACCESS: ", accessToken);
  }, [accessToken]); // Only log when accessToken changes

  // If no access token is found, redirect to /events
  if (!accessToken) {
    return <Navigate to="/events" replace />;
  }

  // Render the element (protected component)
  return React.cloneElement(element, { ...rest });
};

export default PrivateRoute;
