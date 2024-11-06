import * as React from 'react';

import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';




let Home = (isImageLoaded) => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    let [counter, setCounter] = useState(0)
    let [counter2, setCounter2] = useState(0)
    useEffect(() => {
        const timer = setTimeout(() => {
          setShow(true);
        }, 1000); // 1 second delay
    
        return () => clearTimeout(timer); 
      }, []);


      useEffect(() => {
        const timer = setTimeout(() => {
          setShow2(true);
        }, 2000); // 1 second delay
    
        return () => clearTimeout(timer); 
      }, []);

      useEffect(() => {
        const count = setInterval(() => {
            setCounter((prev) => {
                if (prev >= 51238) {
                    clearInterval(count);
                    return prev; // Stop incrementing when 50,000 is reached
                }
                return prev + 231;
            });
        }, 1); // 0.1 second delay
    
        return () => clearInterval(count); // Cleanup on component unmount
    }, []);

    useEffect(() => {
      const count = setInterval(() => {
          setCounter2((prev) => {
              if (prev >= 16) {
                  clearInterval(count);
                  return prev; // Stop incrementing when 50,000 is reached
              }
              return prev + 1;
          });
      }, 100); // 0.1 second delay
  
      return () => clearInterval(count); // Cleanup on component unmount
  }, []);


    return(
        <Box sx={{position:"relative", width:"100%", height:"100%"}}>
        <Box
        sx={{
          backgroundImage: 'url("https://i.postimg.cc/hjnXtfPJ/Towers.png")',
          filter: isImageLoaded ? 'grayscale(1)' : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          padding: '1rem',
          color: 'white',
          position: "relative"
        }}
      >
        
      </Box>
      <Box elevation={0}
          sx={{
            position: 'absolute',
            width:"50%",
            minWidth:"350px",
            left: '0',
            background: "rgba(0, 0, 0, 0.5)",
            top: '40%',
            transform: 'translateY(-40%)', // Center vertically
            padding: '2rem 2rem 3rem 1rem', // Optional: add some padding
            color: 'white', // Change text color for better visibility
            textAlign: 'left', // Align text to the left
            mixBlendMode: 'normal' // Ensures child is rendered with no filter effects from parent
          }}
        >
          <Typography sx={{ fontSize: "clamp(4rem, 10vw, 10rem)", fontWeight: 'bold', lineHeight: { xs: "2rem", lg:"12rem" } }}>
            Event<span style={{ transition: 'color 4s ease', color: show2 ? "orange" : "white" }}>Or</span>
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              left: '10',
              top: '70%',
              transition: 'transform 2s ease',
              transform: show ? 'translateX(0px)' : 'translateX(-1000px)'
            }}
          >
            <Typography sx={{ fontSize: 'clamp(0.85rem, 2vw, 2rem)', color:"white", fontWeight: 'normal' }}>
              THE GLOBAL CONFERENCE WEBSITE
            </Typography>
          </Box>
          
        </Box>
        <Box sx={{position:"absolute", left:"0%", top:{xs:"50%", md:"55%"},  transform: {xs:'translateY(-10%)', md: 'translateY(-10%)'} ,display:"flex", flexDirection:{xs:"row", sm:"row"}, justifyContent:"space-around" ,width:"50%", minWidth:"350px", gap:"1rem",  backgroundColor:  'orange' ,padding:"1rem" }}>

            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                
            <Typography sx={{color:"white", fontSize:{xs:"2rem", md:"4rem", lg:"4rem"}, fontWeight:"bold", color:"black"}}>{counter}</Typography>
       
            <Typography sx={{color:"black", fontSize:"0.85rem", fontWeight:"bold" }}>EVENTS</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mx: 2,  transition: 'border 4s ease', border: show2 ? "1px solid black" : "1px solid transparent" }}/>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                
            <Typography sx={{color:"white", fontSize:{xs:"2rem", md:"4rem", lg:"4rem"}, fontWeight:"bold",  color:"black"}}>{`+${counter2}Milion`}</Typography>
          
            <Typography sx={{color:"black", fontSize:"0.85rem", fontWeight:"bold"}}>RESERVATIONS</Typography>
            </Box>
       
        </Box>
          
      </Box>
        )

}




export default Home