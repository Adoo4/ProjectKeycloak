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
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';



const Header = ({ accessToken, setAccessToken, refreshToken, setRefreshToken, setLoginFailed,user, setUser }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

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
    const authenticate = async () => {
      try {
        const authenticated = await keycloak.init({
          pkceMethod: "S256", onLoad: "check-sso"

        });
        console.log("Authenticated:", authenticated);
        console.log("TOKEN:", keycloak.token);
        console.log("Raw token:", keycloak.token); 
          console.log("Keycloak token type:", typeof keycloak.token); 
        const token = keycloak.token;

        if (authenticated) {
          if (token) {
            const token = keycloak.token;
            console.log("Keycloak token type:", typeof token); 
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

          const intervalId = setInterval(async () => {
            try {
              const refreshed = await keycloak.updateToken(30);
              if (refreshed) {
                console.log("Refreshed token: ", refreshed)
                const token = keycloak.token;
                console.log("Keycloak token type:", typeof token); 
                if (typeof token === "string") {
                  setAccessToken(token);
                } else {
                  console.log("Token is not a string:", token);
                }
              }
            } catch (error) {
              console.error("Failed to refresh token", error);
              handleLogout(); 
            }
          }, 1000 * 60); // 1 Minuta
          return () => clearInterval(intervalId);
        } else { setLoginFailed(true) }
      } catch (error) { console.log("Keycloak initialization failed", error);
      }
    };

    authenticate();
  }, []);



  const handleLogout = async () => {
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
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, justifyContent: 'flex-start', alignItems: "center", gap: { xs: "0.5rem", sm: "1rem" }, fontSize: "3rem" }}>
            <Button color="inherit" sx={{ fontSize: { xs: "0.7rem", sm: "1rem" }, '&:hover': { color: 'orange' } }} onClick={() => navigate("/")}><HomeIcon sx={{ display: { sm: "none" } }} /> <Typography sx={{ display: { xs: "none", sm: "flex" } ,fontSize: { xs: "0.7rem", sm: "0.9rem" } }}>HOME</Typography>  </Button>
            <Button color="inherit" sx={{ fontSize: { xs: "0.7rem", sm: "1rem" }, '&:hover': { color: 'orange' } }} onClick={() => navigate("/events")}><EventIcon sx={{ display: { sm: "none" } }} /> <Typography sx={{ display: { xs: "none", sm: "flex" }, fontSize: { xs: "0.7rem", sm: "0.9em" }}}>EVENTS</Typography> </Button>
            <Button color="inherit" sx={{ fontSize: { xs: "0.7rem", sm: "1rem" }, '&:hover': { color: 'orange' } }}><InfoIcon sx={{ display: { sm: "none" } }} /> <Typography sx={{ display: { xs: "none", sm: "flex" },fontSize: { xs: "0.7rem", sm: "0.9rem" } }}>ABOUT</Typography></Button>

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
