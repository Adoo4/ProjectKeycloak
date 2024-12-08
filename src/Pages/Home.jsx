import * as React from 'react';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const pageVariants = {
  initial: { x: "-100vw", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100vw", opacity: 0 },
  
};

const Home = ({isImageLoaded, accessToken, loginFailed}) => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [counter, setCounter] = useState(0);
    const [counter2, setCounter2] = useState(0);


   
    

    useEffect(() => {
      const hasAnimationPlayed = sessionStorage.getItem('hasAnimationPlayed');
    
    
      let intervalId1, intervalId2;
    
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
      if (!hasAnimationPlayed) {
        
        const timeoutId = setTimeout(async () => {
         
          intervalId1 = setInterval(() => {
            setCounter((prev) => {
              if (prev >= 51932) {
                clearInterval(intervalId1); 
                return 51932; 
              }
              return prev + 481; 
            });
          }, 20); 
    
          intervalId2 = setInterval(() => {
            setCounter2((prev) => {
              if (prev >= 16) {
                clearInterval(intervalId2); 
                return 16; 
              }
              return prev + 1; 
            });
          }, 100); 
    
       
          setShow(true);
          await delay(1500); // 0.5 sekundi
          setShow2(true);
    
         
          sessionStorage.setItem('hasAnimationPlayed', 'true');
        }, 200);
    
     
        return () => {
          clearTimeout(timeoutId);
          clearInterval(intervalId1);
          clearInterval(intervalId2);
        };
      } else {
      
        setShow(true);
        setShow2(true);
        setCounter(51932);
        setCounter2(16);
      }
    }, []);

    useEffect(()=>{}, ) //napraviti tajmer da nakon izvjesnog vremena alert login fail nestane kao i login success
    
    
  
    return (
      <motion.div
      
  variants={pageVariants}
  initial="initial"
  animate="animate"  
  exit="exit"
  transition={{ type: "tween", stiffness: 100 }}
  style={{ height: "110lvh", width: "100%", overflow: "hidden" }}
>
        <Box sx={{ position: "relative", width: "100%", height: "100lvh" }}>

            <Box
                sx={{
                  backgroundImage: ' url("https://i.postimg.cc/hjnXtfPJ/Towers.png")',
                    filter: isImageLoaded ? 'grayscale(1)' : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    padding: ' 1rem',
                    color: 'white',
                    position: "relative"
                }}
            >
            </Box>

            <Box sx={{
                position: 'absolute',
                width: "70%",
                minWidth: "340px",
                maxWidth: "900px",
                left: '0',
                display:"flex",
                flexDirection:"column",
               
                
                top: '40%',
                transform: 'translateY(-40%)',
              
                color: 'white',
                textAlign: 'left',
                mixBlendMode: 'normal'
            }}>
                <Box sx={{ display: "flex", flexDirection: "column", background: "rgba(0, 0, 0, 0.5)", padding:"1rem", boxShadow: "box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>
                    <Typography sx={{ fontSize: "clamp(4rem, 10vw, 10rem)", fontWeight: 'bold', lineHeight: { xs: "clamp(3rem, 17vw, 3.5rem)", sm: "8vw", md: "8vw", lg: "8vw" } }}>
                        Event<span style={{ transition: 'color 4s ease', color: show2 ? "orange" : "white" }}>Or</span>
                    </Typography>

                    <Box
                        sx={{
                            position: 'relative',
                            transition: 'transform 1.5s ease-in',
                            transform: show ? 'translateX(0px)' : 'translateX(-1000px)'
                        }}
                    >
                        <Typography sx={{ fontSize: 'clamp(0.85rem, 2vw, 2rem)', color: "white", fontWeight: 'bold' }}>
                            THE GLOBAL CONFERENCE WEBSITE
                        </Typography>
                    </Box>
                </Box>

                <Box  sx={{ display: "flex", justifyContent: "space-evenly", width: { xs: "330px", sm: "100%" }, minWidth: "340px", maxWidth: "740px", gap: "1rem", backgroundColor: 'orange', padding: "1rem", boxShadow: "box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography  sx={{ fontSize: { xs: "1.8rem", md: "4rem", lg: "4rem" }, fontWeight:"bold", color: "black" }}>{counter}</Typography>
                        <Typography sx={{ color: "black", fontSize: "0.80rem", fontWeight: "bold" }}>EVENTS</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ mx: 2, transition: 'border 4s ease', border: show2 ? "1px solid black" : "1px solid transparent" }} />
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography sx={{ fontSize: { xs: "1.8rem", md: "4rem", lg: "4rem" }, fontWeight:"bold", color: "black" }}>{`+${counter2}M`}</Typography>
                        <Typography sx={{ color: "black", fontSize: "0.80rem", fontWeight: "bold" }}>RESERVATIONS</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
        </motion.div>
    );
};

export default Home;




/*
<Box sx={{display:"flex"}}>
      <Box elevation={0}
          sx={{
            position: 'absolute',
            width:"50%",
            minWidth:"350px",
            left: '0',
            background: "rgba(0, 0, 0, 0.5)",
            top: '40%',
            transform: 'translateY(-40%)', // Center vertically
            padding: '2rem 2rem 2rem 1rem', // Optional: add some padding
            color: 'white', // Change text color for better visibility
            textAlign: 'left', // Align text to the left
            mixBlendMode: 'normal' // Ensures child is rendered with no filter effects from parent
          }}
        >
          <Typography sx={{ fontSize: "clamp(4rem, 10vw, 10rem)", fontWeight: 'bold',  }}>
            Event<span style={{ transition: 'color 4s ease', color: show2 ? "orange" : "white" }}>Or</span>
          </Typography>
          <Box
            sx={{
              position: 'relative',
              transition: 'transform 2s ease',
              transform: show ? 'translateX(0px)' : 'translateX(-1000px)'
            }}
          >
            <Typography sx={{ fontSize: 'clamp(0.85rem, 2vw, 2rem)', color:"white", fontWeight: 'normal' }}>
              THE GLOBAL CONFERENCE WEBSITE
            </Typography>
          </Box>
          
        </Box>
        <Box sx={{  transform: {xs:'translateY(-10%)', md: 'translateY(-10%)'} ,display:"flex", flexDirection:{xs:"row", sm:"row"}, justifyContent:"space-around" ,width:"50%", minWidth:"350px", gap:"1rem",  backgroundColor:  'orange' ,padding:"1rem" }}>

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

*/ 