import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import keycloak from './keycloak'
import { useNavigate } from 'react-router-dom';





let Header = () => {
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [accessToken, setAccessToken] = useState("");
  let [refreshToken, setRefreshToken] = useState("");
  let [scrolled, setScrolled] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let authenticate = async () => {
      try {
        let authenticated = await keycloak.init({
          pkceMethod: "S256",
          
        });

        if (authenticated) {
          setIsAuthenticated(true);
          setAccessToken(keycloak.token);
          setRefreshToken(keycloak.refreshToken);

          let intervalId = setInterval(async () => {
            try {
              let refreshed = await keycloak.updateToken(30); // 30 seconds buffer
              if (refreshed) {
                setAccessToken(keycloak.token); // Update state with the new token
                console.log("Token refreshed", keycloak.token);
                console.log(accessToken);
                console.log(refreshToken);
              }
            } catch (error) {
              console.error("Failed to refresh token", error);
              handleLogout(); // Optionally, logout if refreshing fails
            }
          }, 1000 * 60); // Runs every minute

          // Cleanup interval on unmount
          return () => clearInterval(intervalId);
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: scrolled ? 'black' :'transparent'  , transition: 'background-color 0.3s ease' }} elevation={0} >
      <Toolbar sx={{ gap: '1rem', display: "flex", justifyContent: "space-between" }}>
        {/* Navigation Buttons */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, justifyContent: 'flex-start', alignItems:"center" ,gap: '1rem', fontSize: "3rem" }}>
          <Button color="inherit" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }} onClick={()=>navigate("/")}>HOME</Button>
          <Button color="inherit" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }} onClick={()=>navigate("/events")}>EVENTS</Button>
          <Button color="inherit" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>ABOUT</Button>
        </Box>

        {/* Authentication Button */}
        <Box sx={{ display: "flex" }}>
          {!isAuthenticated ? (
            <Button color="default" sx={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center" }} onClick={() => keycloak.login()}>
              <PersonIcon fontSize="large" sx={{ color: 'white', background: "transparent", border:"2px solid white" ,borderRadius: "50%", padding: "0.2rem" }} />
              <Typography sx={{ display: { xs: "none", sm: "flex" } }}>LOGIN</Typography>
            </Button>
          ) : (
            <Button color="default" sx={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center" }} onClick={handleLogout}>
              <PersonIcon fontSize="large" sx={{ color: 'orange', background: "transparent", border:"2px solid orange" ,borderRadius: "50%", padding: "0.2rem" }} />
              <Typography sx={{ display: { xs: "none", sm: "flex", color:"orange" } }}>LOGOUT</Typography>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
    </Box>
  );
};

export default Header;
