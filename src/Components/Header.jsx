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
import { jwtDecode } from 'jwt-decode';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';



let Header = ({ accessToken, setAccessToken, refreshToken, setRefreshToken, setLoginFailed,user, setUser }) => {
  let [scrolled, setScrolled] = useState(false);
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  
  let [userRole, setUserRole] = useState(null);
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
          pkceMethod: "S256", onLoad: "check-sso"

        });
        console.log("Authenticated:", authenticated);
        console.log("TOKEN:", keycloak.token);
        console.log("Raw token:", keycloak.token); // This will give you the actual content of the token
          console.log("Keycloak token type:", typeof keycloak.token); // Check if it's a string or an object
        let token = keycloak.token;

        if (authenticated) {
          if (token) {
            let token = keycloak.token;
            console.log("Keycloak token type:", typeof token); // Should be "string"
            if (typeof token === "string") {
              setAccessToken(token);
            } else {
              console.log("Token is not a string:", token);
            }
            console.log("Token received:", token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            //setUser(decoded.preferred_username);
            console.log(decoded);

          } else {
            console.log("Failed to retrieve token.");

          }
          setIsAuthenticated(true);

          console.log(token)
          console.log(keycloak.refreshToken);
          setRefreshToken(keycloak.refreshToken);

          let intervalId = setInterval(async () => {
            try {
              let refreshed = await keycloak.updateToken(30); // 30 seconds buffer
              if (refreshed) {
                let token = keycloak.token;
                console.log("Keycloak token type:", typeof token); // Should be "string"
                if (typeof token === "string") {
                  setAccessToken(token);
                } else {
                  console.log("Token is not a string:", token);
                }
              }
            } catch (error) {
              console.error("Failed to refresh token", error);
              handleLogout(); // Optionally, logout if refreshing fails
            }
          }, 1000 * 60); // Runs every minute

          // Cleanup interval on unmount
          return () => clearInterval(intervalId);
        } else { setLoginFailed(true) }
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
      <AppBar position="fixed" sx={{ backgroundColor: scrolled ? 'rgba(0,0,0,0.5)' : 'transparent', transition: 'background-color 0.3s ease' }} elevation={0} >
        <Toolbar sx={{ gap: { xs: "0.6rem", sm: "1rem" }, display: "flex", justifyContent: "space-between" }}>
          {/* Navigation Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, justifyContent: 'flex-start', alignItems: "center", gap: { xs: "0.5rem", sm: "1rem" }, fontSize: "3rem" }}>
            <Button color="inherit" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, '&:hover': { color: 'orange' } }} onClick={() => navigate("/")}><HomeIcon sx={{ display: { sm: "none" } }} /> <Typography sx={{ display: { xs: "none", sm: "flex" } }}>HOME</Typography>  </Button>
            <Button color="inherit" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, '&:hover': { color: 'orange' } }} onClick={() => navigate("/events")}><EventIcon sx={{ display: { sm: "none" } }} /> <Typography sx={{ display: { xs: "none", sm: "flex" } }}>EVENTS</Typography> </Button>
            <Button color="inherit" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, '&:hover': { color: 'orange' } }}><InfoIcon sx={{ display: { sm: "none" } }} /> <Typography sx={{ display: { xs: "none", sm: "flex" } }}>ABOUT</Typography></Button>

          </Box>


          {isAuthenticated ? <Stack direction="row" spacing={1}>
            <Chip avatar={<Avatar><PersonIcon sx={{ background: "white" }} /></Avatar>} label={user.preferred_username} color="warning" sx={{
              display: { xs: "none", sm: "flex" }, backgroundColor: 'transparent',
              color: 'orange',
              '& .MuiChip-avatar': {
                backgroundColor: 'lightgray',
              },
            }} />

          </Stack> : null}


          <Box sx={{ display: "flex" }}>
            {!isAuthenticated ? (
              <Button color="filled" sx={{ display: "flex", backgroundColor: "orange", border: "1px solid transparent", padding: "0.25rem  1.25rem", gap: "1rem", justifyContent: "center", alignItems: "center", '&:hover': { color: 'white', background: "transparent", border: "1px solid orange" } }} onClick={() => keycloak.login()}>
                <Typography sx={{ fontSize: "0.7rem" }}>LOGIN</Typography>

              </Button>
            ) : (
              <Button color="outlined" sx={{ display: "flex", border: "1px solid white", padding: "0.25rem  1.25rem", gap: "1rem", justifyContent: "center", alignItems: "center", '&:hover': { color: 'orange', border: "1px solid orange" } }} onClick={handleLogout}>
                <Typography sx={{ fontSize: "0.7rem" }}>LOGOUT</Typography>

              </Button>
            )}
          </Box>
        </Toolbar>

      </AppBar>

    </Box>
  );
};

export default Header;
