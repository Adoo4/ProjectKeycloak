import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, accessToken, ...rest }) => {
  useEffect(() => {
    console.log("ACCESS: ", accessToken);
  }, [accessToken]); 
  if (!accessToken) {
    return <Navigate to="/events" replace />;
  }
  return React.cloneElement(element, { ...rest });
};

export default PrivateRoute;
