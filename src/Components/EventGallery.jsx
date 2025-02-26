import { useState, useEffect, useRef } from "react";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import { Card, useTheme } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import CardMedia from "@mui/material/CardMedia";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { Delete } from "@mui/icons-material";



let EventGallery = ({
  loading,
  setData,
  setloading,
  accessToken,
  data,
  user,
  setOpen3,
  setEditEvent,
  setSelectedEvent,
  setOpen2,
  setDrawerData,
  setDrawer,
  searchdata,
  size,
 
  
  
}) => {

  
  const handleOpen3 = () => setOpen3(true);

  const cardRef = useRef(null);

  const themeSkeleton = createTheme({
    components: {
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: "gray",
            borderRadius: "8px",
          },
          rectangular: {
            backgroundColor: "#141414",
          },
          text: {
            backgroundColor: "#141414",
          },
        },
      },
    },
  });

  const handleOpen2 = () => setOpen2(true);

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root": {
              fontSize: "14px",
            },
          },
        },
      },
    },
  });
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const itemToEdit = (e) => {
    const title = e.eventTitle;
    const location = e.eventLocation;
    const description = e.eventDescription;
    const date = dayjs(e.eventDate);

    console.log(date);

    setEditEvent({
      eventId: e.eventId,
      eventTitle: title,
      eventLocation: location,
      eventDescription: description,
      eventDate: date,
    });
  };

  const initiateDrawer = (object) => {
    setDrawerData({ ...object });
    setDrawer(true); // Directly setting the drawer to open
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(typeof accessToken);
      try {
        const response = await axios.get("/api/events/all");

        if (response.data.length) {
          setData([...response.data]);
          console.log("RESPONSE:", response.data);
          setloading(false);
        }
      } catch (error) {
        console.error("ERROR:", error.message);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <Grid
  container
  spacing={{ xs: 12, sm: 1, md: 3 }} // Adjust spacing for different screen sizes
  columns={{ xs: 1, sm: 8, md: 12 }}
  sx={{
    background: "linear-gradient(to bottom,rgb(0, 0, 0), rgb(20, 20, 20))",
    minHeight:"60lvh",
    width:"100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding:"0.5rem",
    paddingBottom: 1, // Adds a little padding at the bottom if needed
  }}
>
  {loading
    ? Array.from({ length: 12 }).map((_, index) => (
        <ThemeProvider theme={themeSkeleton} key={index}>
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <Card
              sx={{
                minWidth: 250,
                minHeight: 450,
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems:"center",
                gap: "1rem",
                backgroundColor: "black",
              }}
            >
              <Skeleton variant="rectangular" height={350} width={300} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="80%" />
              
            </Card>
          </Grid>
        </ThemeProvider>
      ))
    : (searchdata?.length ? searchdata : data)?.map((e, index) => (
        <Grid item xs={12} sm={6} md={4} xl={12} key={index}>
         <Card
  ref={cardRef}
  elevation={0}
  sx={{
    width: "auto",
    background: "gray",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    minHeight: "250px",
    backgroundColor: "transparent",
    position: "relative",
    transition: "filter 0.3s ease-in-out, transform 0.3s ease-in-out",
    "&:hover": {
      filter: "multiply(1)",
      imageRendering: "crisp-edges",
      transform: "scale(1.05)",
      zIndex: 4,
      [theme.breakpoints.down("sm")]: {
        transform: "none",
      },
      animation: "pulse 1.5s infinite", // Pulsing effect on hover
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage:
        "repeating-linear-gradient(transparent 0px, rgba(255, 255, 255, 0.05) 3px, transparent 6px)", // Static scanlines
      opacity: 0,
      pointerEvents: "none",
      transition: "opacity 0.3s ease-in-out",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-100%",
      left: 0,
      width: "100%",
      height: "2%",
      background:
        "linear-gradient(rgba(0, 0, 0, 0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)", // Moving scanline
        
      animation: "scanline-hover 2s linear infinite",
      opacity: 0,
      zIndex: 9999,
      pointerEvents: "none",
      transition: "opacity 0.1s ease-in-out",
    },
    "&:hover::after, &:hover::before": {
      opacity: 0.9, // Show effect on hover
    },
    "@keyframes pulse": {
      "0%": {
        boxShadow: "0 0 5px 4px orange, 0 0 20px 8px rgba(238, 0, 0, 0.8)",
      },
      "50%": {
        boxShadow: "0 0 10px 8px orange, 0 0 30px 10px rgba(238, 0, 0, 0.8)",
      },
      "100%": {
        boxShadow: "0 0 5px 4px orange, 0 0 20px 8px rgba(238, 0, 0, 0.8)",
      },
    },
    "@keyframes scanline-hover": {
      "0%": { top: "-100%" },
      "100%": { top: "100%" },
    },
  }}
>
  <CardActionArea
    
    sx={{ position: "relative" }}
  >
    <Box
      sx={{
        position: "relative",
        height: size,
        "&:hover .event-details": {
          opacity: 0,
        },
        "&:hover .search-icon": {
          transform: "translate(-50%, -50%) translateY(0)",
          opacity: 1,
        },
      }}
      onClick={() => {
        if (isSmallScreen) {
          navigate(`/events/${e.eventId}`);
        } else {
          initiateDrawer(e);
        }
      }}
    >
      {/* Wrapper for Blur Effect */}
      <Box
        className="blur-bg"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(5px)", // Blur effect
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          
        }}
        
      />

      {/* Event Image */}
      <CardMedia
      
        component="img"
        image={
          e?.eventImage
            ? `data:image/jpeg;base64,${e.eventImage}`
            : "https://coffective.com/default-featured-image-png/"
        }
        alt="Event card"
        sx={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      />

      {/* Gradient Overlay with Text */}
      <Box
        className="event-details"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "5px",
          color: "white",
          transition: "opacity 0.3s ease",
          "&:hover + .blur-bg": {
            opacity: 1, // Activate blur effect on hover
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontFamily: "'Roboto', sans-serif",
            textAlign: "center",
            color: "white",
            fontSize: "1rem",
            width: "100%",
          }}
        >
          {e.eventTitle}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.75rem",
            fontFamily: "'Roboto', sans-serif",
            textAlign: "center",
            color: "gray",
          }}
        >
          {e.eventLocation}
        </Typography>
        
      </Box>

      <SearchIcon
        className="search-icon"
        sx={{
          display: { xs: "none", md: "inline" },
          position: "absolute",
          top: "50%",
          left: "50%",
          fontSize: "5rem",
          color: "orange",
          transform: "translate(-50%, -150%)",
          opacity: 0,
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      />
    </Box>

    { user &&
        user?.resource_access?.["react-client"]?.roles[0] === "ADMIN" ?
    <Box sx={{color:"white"}}>
   <EditNoteIcon onClick={() => { handleOpen3(); itemToEdit(e); console.log("ovoje e", e) }}/>
   <DeleteIcon onClick={()=>{setSelectedEvent(e.eventId);  handleOpen2();} }/>

    </Box> : null}
  </CardActionArea>
</Card>



        </Grid>
      ))}
</Grid>

  );
};

export default EventGallery;
