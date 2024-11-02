import Keycloak from 'keycloak-js';
import { useState, useEffect } from 'react';

let keycloak = new Keycloak({
  url: 'http://avajava.pro:8880',
  realm: "praksa",
  clientId: "react-client",
});

function Login() {
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [accessToken, setAccessToken] = useState("");
  let [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    let authenticate = async () => {
      try {
        let authenticated = await keycloak.init({
          pkceMethod: "S256",
          onLoad: "login-required",
        });
        
        if (authenticated) {
          setIsAuthenticated(true);
          setAccessToken(keycloak.token);
          setRefreshToken(keycloak.refreshToken);

          // Set up a periodic refresh interval
          setInterval(async () => {
            try {
              // Check if the token needs to be updated (30 seconds before expiration)
              let refreshed = await keycloak.updateToken(30); // 30 seconds buffer
              if (refreshed) {
                setAccessToken(keycloak.token); // Update state with the new token
                console.log("Token refreshed", keycloak.token);
              }
            } catch (error) {
              console.error("Failed to refresh token", error);
              handleLogout(); // Optionally, logout if refreshing fails
            }
          }, 1000 * 60); // Runs every minute
        }
      } catch (error) {
        console.log("Keycloak initialization failed", error);
      }
    };

    authenticate();
  }, []);

  let handleLogout = async () => {
    try {
      if (keycloak && keycloak.authenticated) {
        await keycloak.logout();
        setIsAuthenticated(false);
        console.log("Logged out");
      } else {
        console.log("Logout is not initialized!");
      }
    } catch (error) {
      console.log("Logout failed:", error.message);
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <button onClick={() => keycloak.login()}>LOGIN</button>
      ) : (
        <button onClick={handleLogout}>LOGOUT</button>
      )}
    </>
  );
}

export default Login;
