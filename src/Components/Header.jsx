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

import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';




let Header = ({accessToken, setAccessToken,refreshToken,setRefreshToken}) => {
 
  
  let [scrolled, setScrolled] = useState(false);
  let [isAuthenticated, setIsAuthenticated] = useState(false);
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
          pkceMethod: "S256",  onLoad:"check-sso"
          
        });
        console.log("Authenticated:", authenticated);
        console.log("TOKEN:", keycloak.token);
        let token = keycloak.token;
        setAccessToken(token);
        if (authenticated) {
          if(token) {
            setAccessToken(token);
            console.log("Token received:", token);
          }else {
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
                setAccessToken(token); // Update state with the new token
                console.log("Token refreshed", token);
                console.log(token);
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
      <AppBar position="fixed" sx={{ backgroundColor: scrolled ? 'rgba(0,0,0,0.5)' :'transparent'  , transition: 'background-color 0.3s ease' }} elevation={0} >
      <Toolbar sx={{ gap: {xs:"0.8rem", sm:"1rem"}, display: "flex", justifyContent: "space-between" }}>
        {/* Navigation Buttons */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, justifyContent: 'flex-start', alignItems:"center" ,gap: {xs:"0.8rem", sm:"1rem"}, fontSize: "3rem" }}>
          <Button color="inherit" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, '&:hover': {color: 'orange'}, }} onClick={()=>navigate("/")}>HOME</Button>
          <Button color="inherit" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" },  '&:hover': {color: 'orange'} }} onClick={()=>navigate("/events")}>EVENTS</Button>
          <Button color="inherit" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" },  '&:hover': {color: 'orange'} }}>ABOUT</Button>
        </Box>

        {/* Authentication Button */}

        <Box>

       {isAuthenticated?  <PersonIcon fontSize="large" sx={{ color: 'white', background: "transparent", border:"2px solid white" ,borderRadius: "50%", padding: "0.2rem", display:{xs:"none", sm:"flex"} }} /> : null}
        </Box>


        <Box sx={{ display: "flex" }}>
          {!isAuthenticated ? (
            <Button color="outlined" sx={{ display: "flex", border:"2px solid white" ,padding:{sm:"0.25rem  1.25rem", xs:"0.25rem 1rem"}, borderRadius:"3rem" ,gap: "1rem", justifyContent: "center", alignItems: "center", '&:hover': {color: 'orange', border:"2px solid orange"} }} onClick={() => keycloak.login()}>
              <KeyIcon/>
              <Typography sx={{ display: { xs: "none", sm: "flex" }, fontSize:"0.8rem" }}>LOGIN</Typography>
              
            </Button>
          ) : (
            <Button color="outlined" sx={{ display: "flex", border:"2px solid white" ,padding:"0.25rem  1.25rem", borderRadius:"3rem" ,gap: "1rem", justifyContent: "center", alignItems: "center", '&:hover': {color: 'orange', border:"2px solid orange"} }} onClick={handleLogout}>
              <KeyOffIcon/>
              <Typography sx={{ display: { xs: "none", sm: "flex", color:"orange" },fontSize:"0.8rem"  }}>LOGOUT</Typography>
             
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
    </Box>
  );
};

export default Header;
