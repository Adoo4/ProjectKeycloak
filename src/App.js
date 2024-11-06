
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Events from './Pages/Events';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Box from '@mui/material/Box';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = React.useState(10);
  useEffect(() => {
    // Set a timeout to hide the loader after a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the delay time as needed

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
  ) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} size={80}/>
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{ color: "orange" }}
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 33);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Box  style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.5rem",
          color: "#333",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
          /* Add animations or custom styles here */
        }}><CircularProgressWithLabel sx={{color:"orange"}}value={progress} /></Box> // Replace with your custom loader component or styling
      ) : (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Events />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;