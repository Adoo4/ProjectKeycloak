import './App.css';
import React, { useState, useEffect } from 'react';
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


function App() {
 
  const [loading, setLoading] = useState(!sessionStorage.getItem('hasLoadedBefore'));
  const [progress, setProgress] = useState(10);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageUrl = 'https://i.postimg.cc/hjnXtfPJ/Towers.png';

  const[accessToken, setAccessToken] = useState(null);
  const[refreshToken, setRefreshToken] = useState("");
  const[loginFailed, setLoginFailed] = useState(false);
  const[user, setUser] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => setIsImageLoaded(true);
    img.onerror = () => {
      console.error('Background image failed to load');
      setIsImageLoaded(false);
    };
  }, [imageUrl]);

  useEffect(() => {
    if (isImageLoaded) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasLoadedBefore', 'true'); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isImageLoaded]);

  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 33);
    return () => clearInterval(timer);
  }, [isImageLoaded]);

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
          <Header accessToken={accessToken} setAccessToken={setAccessToken} refreshToken={refreshToken} setRefreshToken={setRefreshToken} setLoginFailed={setLoginFailed} user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home isImageLoaded={isImageLoaded} accessToken={accessToken} loginFailed={loginFailed} setLoginFailed={setLoginFailed} />} />
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
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;


//    <Route path="/events/:eventId" element={<Page accessToken={accessToken} user={user} />} />