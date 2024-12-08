import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import InfoIcon from '@mui/icons-material/Info';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Skeleton from '@mui/material/Skeleton';
import Badge from '@mui/material/Badge';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Chip from '@mui/material/Chip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { x: "200%", opacity: 1 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

const modalVariants = {
    hidden: { y: "-200%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { y: "-200%", opacity: 0, transition: { duration: 0.1, ease: "easeOut" } },
  };





const Events = ({ accessToken, user }) => {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const handleOpen = () =>{ setOpen(true);}
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen(false);
    const [value, setValue] = useState(null);
    const [postData, setPostData] = useState({
        eventTitle: "",
        eventDescription: "",
        eventLocation: "",
        eventDate: ""

    })
    const [selectedEvent, setSelectedEvent] = useState(null)

    const [editEvent, setEditEvent] = useState({
        eventTitle: "",
        eventDescription: "",
        eventLocation: "",
        eventDate: ""
    })

    const [edit, setEdit] = useState({
        eventTitle: "",
        eventDescription: "",
        eventLocation: "",
        eventDate: ""
    })

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            console.log(typeof accessToken)
            try {

                const response = await axios.get("/api/events/all");

              
                if (response.data.length) {
                    setData([...response.data]);
                    console.log("RESPONSE:", response.data);
                    setloading(false)
                }
            } catch (error) {
                console.error("ERROR:", error.message);
            }
        };


        fetchData();
    }, [accessToken]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        minWidth: "320px",
        maxWidth: "600px",
        zIndex: "1000000",
        background: 'lightgray',

        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: "2rem",

        borderRadius: "30px"

    };

    const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        minWidth: "320px",
        maxWidth: "600px",
        zIndex: "1000000",
        background: 'orange',

        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: "2rem",


    };





    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputLabel-root': {
                            fontSize: '14px', 
                        },
                    },
                },
            },
        },
    });

    const themeSkeleton = createTheme({
        components: {
            MuiSkeleton: {
                styleOverrides: {
                    root: {
                        backgroundColor: "lightgray", 
                        borderRadius: "8px",
                    },
                    rectangular: {
                        backgroundColor: "#3e3e40",
                    },
                    text: {
                        backgroundColor: "#3e3e40", 
                    },
                },
            },
        },
    });





    const addNewEvent = async () => {
        try {

            console.log("Post Data: ", postData); 
            const response = await axios.post("/api/events/create", postData, { headers })
            if (response && response.data) {
                setData([...data, response.data]);
            }

        } catch (error) {
            if (error.response) {
                console.error("Response Error:", error.response);
            } else if (error.request) {
                console.error("Request Error:", error.request);
            } else {
                console.error("Error:", error.message);
            }



        }
    }

    const deleteEvent = async (eventId) => {
        try {
            const id = eventId;
            console.log("ID:", id)
            const response = await axios.delete(`/api/events/${eventId}`, { headers });
            if (response && response.data) {
                setData(data.filter((e, i) => eventId !== e.eventId))

            }




        }

        catch (e) {

            console.log(e.message)

        }


    }

    const itemToEdit = (e) => {

        const title = e.eventTitle;
        const location = e.eventLocation; 
        const description = e.eventDescription; 
        const date = dayjs(e.eventDate);

        console.log(date)

        setEditEvent({
            eventId: e.eventId,
            eventTitle: title,
            eventLocation: location,  
            eventDescription: description, 
            eventDate: date
        });
    };

    const changeEvent = async () => {
        const id = editEvent.eventId;
        const payload = {
            eventTitle: edit.eventTitle || editEvent.eventTitle, 
            eventDescription: edit.eventDescription || editEvent.eventDescription,
            eventLocation: edit.eventLocation || editEvent.eventLocation,
            eventDate: edit.eventDate || editEvent.eventDate, 
        };


        try {
            console.log(id)
            const response = await axios.put(`/api/events/${id}`, payload, { headers })
            console.log("SUCCESS: ", response.data)
            console.log("payload: ", payload)
            if (response && response.data) {
                //const convertedData = {eventTitle: payload}
                console.log(payload)
                console.log("data:",data)
                setData(data.map((e, i) => e.eventId === id ? { ...response.data, eventId: id } : e))

            }

        }
        catch (e) {

            console.log(e.message)
        }


    }






    const panoramaImages = [
        {
            city: 'Tokyo',
            country: 'Japan',
            imageUrl: 'https://media.istockphoto.com/id/1692368430/photo/aerial-coit-tower-in-late-afternoon-with-downtown-san-francisco-skyscrapers-and-distant-bridge.jpg?s=2048x2048&w=is&k=20&c=V78ykggHv3YFdYb3L5Y4o48xSHkgrUF0Xs4hq3TWzK4=' 
        },
        {
            city: 'New York City',
            country: 'USA',
            imageUrl: 'https://fullsuitcase.com/wp-content/uploads/2022/05/One-day-in-New-York-USA-NYC-day-trip-itinerary-735x490.jpg.webp' 
        },
        {
            city: 'Beijing',
            country: 'China',
            imageUrl: 'https://media.istockphoto.com/id/601158224/photo/aerial-view-of-a-downtown-la-at-sunset.jpg?s=612x612&w=0&k=20&c=V36E4qOGijXZzhlLYqWgw0zoGCtD7Cv4WKDq6SwWG5U=' 
        },
        {
            city: 'Moscow',
            country: 'Russia',
            imageUrl: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2Fnb3xlbnwwfHwwfHx8MA%3D%3D' 
        },
        {
            city: 'Paris',
            country: 'France',
            imageUrl: 'https://www.agoda.com/wp-content/uploads/2024/05/Featured-image-Austin-TX-USA-1244x700.jpg' 
        },
        {
            city: 'London',
            country: 'United Kingdom',
            imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRva3lvfGVufDB8fDB8fHww' 
        },
        {
            city: 'Berlin',
            country: 'Germany',
            imageUrl: 'https://content.paulreiffer.com/wp-content/uploads/2023/03/Golden-Blue-Hour-City-Downtown-Brickell-Town-Center-Rooftop-Night-Cityscape-Miami-Florida-Fine-Art-Wall-Decor-Paul-Reiffer-Professional-Landscape-Photographer-Phase-One.jpg' 
        },
        {
            city: 'Delhi',
            country: 'India',
            imageUrl: 'https://content.paulreiffer.com/wp-content/uploads/2015/06/beijing-city-skyline-park-hyatt-china-summit-wing-night-cityscape-paul-reiffer-china.jpg' 
        },
        {
            city: 'Rio de Janeiro',
            country: 'Brazil',
            imageUrl: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?cs=srgb&dl=pexels-dominikagregus-672532.jpg&fm=jpg' 
        },
        {
            city: 'Rio de Janeiro',
            country: 'Brazil',
            imageUrl: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?cs=srgb&dl=pexels-dominikagregus-672532.jpg&fm=jpg' 
        }
    ];
    //rezervna slika
    //https://img.freepik.com/free-photo/map-pin-location-direction-position-graphic_53876-124530.jpg?t=st=1732462094~exp=1732465694~hmac=18894946259011235e5de081433f1c0dede758c60b6eb1ed6a55f90630dd89f8&w=1380
    //keyword za trazenje u freepik "location"



    return (
        <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "tween", stiffness: 100 }}
    >
        <Box sx={{ flexGrow: 1, padding: "10lvh 1rem 10lvh 1rem", width: "100%", backgroundColor: "#2c2c2c", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "2rem" }} >

            {user && user?.resource_access?.["react-client"]?.roles[0] === "ADMIN" ? <Box sx={{ '& > :not(style)': { m: 1 }, position: "fixed", bottom: "5rem", right: "1rem", zIndex: "999", width: "50%", minWidth: "220px", display: "flex", justifyContent: "space-around", alignItems: "center", maxWidth: "300px", background: "#2c2c2c", borderRadius: "30px 0px 0px 30px", borderLeft: "20px solid orange" }}>
                <Typography sx={{ fontWeight: "bold", color: "white", fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>ADD NEW EVENT</Typography>
                <Fab size="large" sx={{ backgroundColor: "orange" }} aria-label="add" onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </Box> : null}




            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Box sx={{ backgroundColor: "orange", display: "flex", flexDirection: { xs: "column", md: "row" }, height: { xs: "25lvh", lg: "25lvh" }, justifyContent: "center", alignItems: "center", width: "100%", minWidth: "350px", padding: "2rem", borderRadius: "1rem" }}>

                

                    <Box sx={{display:"flex", flexDirection:"column"}}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "white", fontSize: {xs:"1rem", lg: "3rem" } }}>Choose Your Perfect Event</Typography>
                        <Typography variant="subtitle1" component="p" sx={{ color: "#2c2c2c", fontSize: { lg: "1.5rem" } }}>Discover experiences tailored just for you</Typography>
                        <Box sx={{  display: 'flex', gap: '1rem', color:"#2c2c2c", mt:"1rem", alignSelf:"flex-end" }}>
                            <MusicNoteIcon sx={{ fontSize: {xs:"2rem", md:'2.5rem'}, border:"2px solid #2c2c2c", padding :"0.25rem", borderRadius:"10px" }} />
                            <SportsFootballIcon sx={{ fontSize: {xs:"2rem", md:'2.5rem'}, border:"2px solid #2c2c2c", padding :"0.25rem", borderRadius:"10px" }} />
                            <LocalMallIcon sx={{ fontSize: {xs:"2rem", md:'2.5rem'}, border:"2px solid #2c2c2c", padding :"0.25rem", borderRadius:"10px" }} />
                            <TheaterComedyIcon sx={{ fontSize: {xs:"2rem", md:'2.5rem'}, border:"2px solid #2c2c2c", padding :"0.25rem", borderRadius:"10px" }} />
                            <SportsEsportsIcon sx={{ fontSize: {xs:"2rem", md:'2.5rem'}, border:"2px solid #2c2c2c", padding :"0.25rem", borderRadius:"10px" }} />
                        </Box>
                    </Box>


                </Box>
                {loading ? (

                    Array.from({ length: 6 }).map((_, index) => (
                        <ThemeProvider theme={themeSkeleton}>
                            <Grid key={index} size={{ xs: 12, sm: 4, md: 4 }} sx={{ padding: { xs: "0.5rem", sm: "1rem" } }}>
                                <Card sx={{ minWidth: 250, minHeight: 450, padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "#323231" }}>
                                    <Skeleton variant="rectangular" height={250} />
                                    <Skeleton variant="text" width="60%" />
                                    <Skeleton variant="text" width="80%" />
                                    <Skeleton variant="text" width="90%" />
                                    <Skeleton variant="text" width="70%" />
                                </Card>
                            </Grid>
                        </ThemeProvider>
                    ))
                ) : (
                  
                    data?.map((e, index) => (
                        <Grid key={e.eventId} size={{ xs: 12, sm: 4, md: 4 }} sx={{ padding: { xs: "0.5rem", sm: "1rem" } }}>
                            <Card sx={{ minWidth: 250, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "450px", boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;", backgroundColor: "#595959", color: "lightgray" }} >
                                <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", flexGrow: 1, padding: "0.75rem", gap: "1rem", background: "orange" }}>
                                        <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>PARTICIPANTS</Typography>
                                        <Badge
                                            color="warning"
                                            badgeContent={1}
                                            sx={{ zIndex: 99 }}
                                        >
                                            <BeenhereIcon fontSize="small" />
                                        </Badge>
                                    </Box>

                                </Stack>
                                <CardActionArea
                                    onClick={() => { accessToken ? navigate(`/events/${e.eventId}`) : console.log("Access key missing, acces denied") }}


                                >
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={panoramaImages[3].imageUrl}
                                        alt="Event card"
                                    />
                                    <CardContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ color: "#f2f2f2" }}>
                                            {e.eventTitle}
                                        </Typography>
                                        <Box sx={{ display: "flex", justifyContent: "space-around", background: "gray" }}>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>

                                                <Typography variant="h7" component="div" sx={{ color: "darkgray", fontWeight: "bold" }}>
                                                    <Stack direction="row" spacing={1}>
                                                        <Chip sx={{ background: "transparent" }}
                                                            label={
                                                                <span>
                                                                    <LocationOnIcon style={{ marginRight: "0.3rem", verticalAlign: "middle", color: "orange" }} />
                                                                    {e.eventLocation}
                                                                </span>
                                                            }
                                                        />

                                                    </Stack>
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>



                                                <Typography variant="h7" component="div" sx={{ color: "darkgray", fontWeight: "bold" }}>

                                                    <Stack direction="row" spacing={1}>
                                                        <Chip sx={{ background: "transparent" }}
                                                            label={
                                                                <span>
                                                                    <CalendarMonthIcon style={{ marginRight: "0.3rem", verticalAlign: "middle", color: "orange" }} />
                                                                    {e.eventDate}
                                                                </span>
                                                            }
                                                        />

                                                    </Stack>


                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="body3" sx={{ color: "darkgray" }}>
                                            {e.eventDescription}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button size="small" sx={{ color: "gray" }} onClick={() => { accessToken ? navigate(`/events/${e.eventId}`) : console.log("Access key missing, acces denied") }}>
                                        <InfoIcon />
                                    </Button>

                                    {user?.resource_access?.["react-client"]?.roles[0] === "ADMIN" && (             //EDIT
                                        <Box sx={{ background: "orange", borderRadius: "2rem", color: "black" }}>
                                            <Button size="small" color="default" onClick={() => { handleOpen3(); itemToEdit(e); console.log("ovoje e", e) }}>
                                                <EditNoteIcon />
                                            </Button>
                                            <Button
                                                size="small"
                                                color="default"
                                                onClick={() => {
                                                    setSelectedEvent(e.eventId);
                                                    handleOpen2();
                                                }}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </Box>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}



            </Grid>

            
            <AnimatePresence>
      {open && (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100lvh",
            }}
          >
            <Box sx={style}>
              <Button sx={{ position: "absolute", right: "0rem", top: "0.2rem" }} onClick={handleClose}>
                X
              </Button>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                New Event
              </Typography>
              <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
                <TextField
                  label="Title"
                  variant="standard"
                  sx={{ width: "100%", maxWidth: "400px" }}
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
                  onChange={(e) => setPostData({ ...postData, eventTitle: e.target.value })}
                />
                <TextField
                  label="Location"
                  variant="standard"
                  sx={{ width: "100%", maxWidth: "400px" }}
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
                  onChange={(e) => setPostData({ ...postData, eventLocation: e.target.value })}
                />
                <ThemeProvider theme={theme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                        if (newValue) {
                          const formattedDate = `${newValue.$y}-${String(newValue.$M + 1).padStart(2, "0")}-${String(
                            newValue.$D
                          ).padStart(2, "0")}`;
                          setPostData((prevData) => ({ ...prevData, eventDate: formattedDate }));
                        }
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  placeholder="Describe your event"
                  InputLabelProps={{
                    style: { fontSize: "14px" },
                  }}
                  onChange={(e) => setPostData({ ...postData, eventDescription: e.target.value })}
                />
              </Box>
              <Box sx={{ alignSelf: "flex-end" }}>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button
                  onClick={() => {
                    addNewEvent();
                    handleClose();
                  }}
                >
                  ADD
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Modal>
      )}
    
            
            <Modal
          

                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                  <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100lvh",
            }}
          >
                <Box sx={style2}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "1rem" }}>
                        <WarningAmberIcon /> WARNING
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
                        Are you sure you want to delete this Event?
                    </Typography>
                    <Box sx={{ alignSelf: "flex-end", display: "flex", gap: "1rem" }}>
                        <Button color="default" onClick={handleClose2}>CANCEL</Button>
                        <Button variant="outlined" color="error" onClick={() => {deleteEvent(selectedEvent); setOpen2(false)}}>DELETE</Button>

                    </Box>

                </Box>
                </motion.div>
            </Modal>
            <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100lvh",
            }}
          >
                <Box sx={style}>
                    <Button sx={{ position: "absolute", right: "0rem", top: "0.2rem" }} onClick={() => setOpen3(false)}><CloseIcon /></Button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Event
                    </Typography>
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
                        <TextField id="standard-basic" label="Title" variant="standard" defaultValue={editEvent?.eventTitle || ""} sx={{ width: "100%", maxWidth: "400px" }} InputLabelProps={{ //Title
                            style: { fontSize: '14px' }, 
                        }} onChange={(e) => { setEdit({ ...edit, eventTitle: e.target.value || editEvent.eventTitle }); }} />
                        <TextField id="standard-basic" label="Location" variant="standard" defaultValue={editEvent.eventLocation} sx={{ width: "100%", maxWidth: "400px" }} InputLabelProps={{ //Location
                            style: { fontSize: '14px' }, 

                        }} onChange={(e) => { setEdit({ ...edit, eventLocation: e.target.value || editEvent.eventLocation }); }} />
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={value || editEvent.eventDate}
                                    onChange={(newValue) => {

                                        const selectedDate = newValue || value || editEvent.eventDate;


                                        setValue(selectedDate);


                                        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');


                                        setEdit((prevData) => ({
                                            ...prevData,
                                            eventDate: formattedDate,
                                        }));

                                        console.log('Formatted Date:', formattedDate);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </ThemeProvider>
                        <TextField
                            id="outlined-multiline-static"    //Description
                            label="Description"
                            defaultValue={editEvent.eventDescription}
                            multiline
                            rows={4}
                            placeholder="Describe your event"
                            InputLabelProps={{
                                style: { fontSize: '14px' }, 
                            }}
                            onChange={(e) => { setEdit({ ...edit, eventDescription: e.target.value || editEvent.eventDescription }); console.log(edit) }}
                        />


                    </Box>

                    <Box sx={{ alignSelf: "flex-end" }}>
                        <Button onClick={() => {
                            setOpen3(false); setEditEvent({
                                eventTitle: "",
                                eventDescription: "",
                                eventLocation: "",
                                eventDate: ""
                            })
                        }}>CANCEL</Button>
                        <Button onClick={changeEvent}>APPLY</Button>

                    </Box>
                </Box>
                </motion.div>
            </Modal>
            </AnimatePresence>
        </Box>
        </motion.div>
    )



}

export default Events









