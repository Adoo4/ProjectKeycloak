import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Events from './Pages/Events';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Page from './Pages/Page';
import PrivateRoute from './Components/PrivateRoute';
import { AnimatePresence } from "framer-motion";
import keycloak from './Components/keycloak'
import { jwtDecode } from 'jwt-decode';


function App() {
 
  const [loading, setLoading] = useState(!sessionStorage.getItem('hasLoadedBefore'));
  const [progress, setProgress] = useState(10);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageUrl = 'https://i.postimg.cc/hPy52XNz/close-up-person-prepared-traveling.jpg';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[accessToken, setAccessToken] = useState(null);
  const[refreshToken, setRefreshToken] = useState("");
  const[loginFailed, setLoginFailed] = useState(false);
  const[user, setUser] = useState(null);
  const accessTokenRef = useRef(null);


  useEffect(()=>{

    const authenticate = async () => {
      try {
        const authenticated = await keycloak.init({
          pkceMethod: "S256", onLoad: "check-sso" //ovdje promjena
        });
  
        if (authenticated) {
          const token = keycloak.token;
          if (token && typeof token === "string") {
            if (accessToken !== token) {
             // setAccessToken(token); // Update state only if token has changed
              console.log("render accessToken")
            }
            const decoded = jwtDecode(token);
            if (user !== decoded) {
              //setUser(decoded); // Update user only if it's different
              console.log("render User")
            }
           //setIsAuthenticated(true);
            console.log("render setIsAuthenticated")
            setRefreshToken(keycloak.refreshToken);
            console.log("render setRefreshToken")

          }
        } else {
         // setLoginFailed(true);
        }
      } catch (error) {
        console.error("Keycloak initialization failed", error);
      }
    };
  
    authenticate();


  }, []

  




    
  )
 

  

  useEffect(() => {
    if (!imageUrl) return; 
    const img = new Image();
    img.src = imageUrl;
  
    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => {
      console.error("Background image failed to load");
      setIsImageLoaded(false);
    };
  }, [imageUrl]);


  useEffect(() => {
  if (!isImageLoaded) return;

  const timer = setTimeout(() => {
    setLoading(false);
    sessionStorage.setItem("hasLoadedBefore", "true");
  }, 3000);

  return () => clearTimeout(timer);
}, [isImageLoaded]);


  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  useEffect(() => {
    if (!loading) return;
  
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 33);
  
    return () => clearInterval(timer);
  }, [loading]);

  return (
    <div className="App">
      {loading ? (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            height:"100lvh"
          }}
        >

          <Typography
            sx={{
              fontSize: "clamp(4rem, 10vw, 4rem)",
              fontWeight: 'bold',
              lineHeight: { xs: "2rem", lg: "4rem" },
              color: "white",
            }}
          >
            Event<span style={{ color: "orange" }}>Or</span>
          </Typography>
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              sx={{
                backgroundColor: "black",       
                '& .MuiLinearProgress-bar': {
                  backgroundColor: "orange"         
                }
              }}
            />
          </Box>
        </Box>
      ) : (
        <BrowserRouter>
        <Header
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          refreshToken={refreshToken}
          setRefreshToken={setRefreshToken}
          setLoginFailed={setLoginFailed}
          user={user}
          setUser={setUser}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
         
        />
        <AnimatePresence mode="wait">
          <Routes >
            <Route
              path="/"
              element={
                <Home
                  isImageLoaded={isImageLoaded}
                  accessToken={accessToken}
                  loginFailed={loginFailed}
                  setLoginFailed={setLoginFailed}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Events accessToken={accessToken} user={user} setUser={setUser} />} />
            <Route
              path="/events/:eventId"
              element={
                <PrivateRoute
                  element={<Page accessToken={accessToken} user={user} />}
                  accessToken={accessToken}
                />
              }
            />
          </Routes>
        </AnimatePresence>
       
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;


//    <Route path="/events/:eventId" element={<Page accessToken={accessToken} user={user} />} />