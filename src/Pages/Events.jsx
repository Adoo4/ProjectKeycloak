import * as React from 'react';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import zIndex from '@mui/material/styles/zIndex';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Skeleton from '@mui/material/Skeleton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Chip from '@mui/material/Chip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';




let Events = ({ accessToken, user }) => {
    let [data, setData] = useState([])
    let [loading, setloading] = useState(true)
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const handleOpen3 = () => setOpen(true);
    const handleClose3 = () => setOpen(false);
    const [value, setValue] = useState(null);
    let [postData, setPostData] = useState({
        eventTitle: "",
        eventDescription: "",
        eventLocation: "",
        eventDate: ""

    })
    let [selectedEvent, setSelectedEvent] = useState(null)

    let [editEvent, setEditEvent] = useState({
        eventTitle: "",  //OVDJE SAM STAO
        eventDescription: "",
        eventLocation: "",
        eventDate: ""
    })

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };
    useEffect(() => {
        let fetchData = async () => {
            console.log(typeof accessToken)
            try {

                let response = await axios.get("/api/events/all");

                // Process response
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
        background: 'white',

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
                            fontSize: '14px', // Set label font size globally
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
                        backgroundColor: "lightgray", // Custom background color for all Skeletons
                        borderRadius: "8px", // Add rounded corners
                    },
                    rectangular: {
                        backgroundColor: "#3e3e40", // Specific color for rectangular Skeletons
                    },
                    text: {
                        backgroundColor: "#3e3e40", // Specific color for text Skeletons
                    },
                },
            },
        },
    });





    let addNewEvent = async () => {
        try {

            console.log("Post Data: ", postData); // Log to verify the data
            let response = await axios.post("/api/events/create", postData, { headers })
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

    let deleteEvent = async (eventId) => {
        try {
            let id = eventId;
            console.log("ID:", id)
            let response = await axios.delete(`/api/events/${eventId}`, { headers });
            if (response && response.data) {
                setData(data.filter((e, i) => eventId !== e.eventId))

            }




        }

        catch (e) {

            console.log(e.message)

        }


    }

    let itemToEdit = (e) => {
        let title = e.eventTitle;
        let location = e.eventLocation; // Corrected here
        let description = e.eventDescription; // Corrected here
        let date = e.eventDate;

        setEditEvent({
            eventTitle: title,
            eventLocation: location,  // Corrected
            eventDescription: description, // Corrected
            eventDate: date
        });
    };






    const panoramaImages = [
        {
            city: 'Tokyo',
            country: 'Japan',
            imageUrl: 'https://media.istockphoto.com/id/1692368430/photo/aerial-coit-tower-in-late-afternoon-with-downtown-san-francisco-skyscrapers-and-distant-bridge.jpg?s=2048x2048&w=is&k=20&c=V78ykggHv3YFdYb3L5Y4o48xSHkgrUF0Xs4hq3TWzK4=' // Tokyo skyline
        },
        {
            city: 'New York City',
            country: 'USA',
            imageUrl: 'https://fullsuitcase.com/wp-content/uploads/2022/05/One-day-in-New-York-USA-NYC-day-trip-itinerary-735x490.jpg.webp' // NYC skyline panorama
        },
        {
            city: 'Beijing',
            country: 'China',
            imageUrl: 'https://media.istockphoto.com/id/601158224/photo/aerial-view-of-a-downtown-la-at-sunset.jpg?s=612x612&w=0&k=20&c=V36E4qOGijXZzhlLYqWgw0zoGCtD7Cv4WKDq6SwWG5U=' // Beijing cityscape
        },
        {
            city: 'Moscow',
            country: 'Russia',
            imageUrl: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2Fnb3xlbnwwfHwwfHx8MA%3D%3D' // Moscow city view
        },
        {
            city: 'Paris',
            country: 'France',
            imageUrl: 'https://www.agoda.com/wp-content/uploads/2024/05/Featured-image-Austin-TX-USA-1244x700.jpg' // Paris city panorama
        },
        {
            city: 'London',
            country: 'United Kingdom',
            imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRva3lvfGVufDB8fDB8fHww' // London city view
        },
        {
            city: 'Berlin',
            country: 'Germany',
            imageUrl: 'https://content.paulreiffer.com/wp-content/uploads/2023/03/Golden-Blue-Hour-City-Downtown-Brickell-Town-Center-Rooftop-Night-Cityscape-Miami-Florida-Fine-Art-Wall-Decor-Paul-Reiffer-Professional-Landscape-Photographer-Phase-One.jpg' // Berlin skyline
        },
        {
            city: 'Delhi',
            country: 'India',
            imageUrl: 'https://content.paulreiffer.com/wp-content/uploads/2015/06/beijing-city-skyline-park-hyatt-china-summit-wing-night-cityscape-paul-reiffer-china.jpg' // Delhi city view
        },
        {
            city: 'Rio de Janeiro',
            country: 'Brazil',
            imageUrl: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?cs=srgb&dl=pexels-dominikagregus-672532.jpg&fm=jpg' // Rio de Janeiro panoramic view
        },
        {
            city: 'Rio de Janeiro',
            country: 'Brazil',
            imageUrl: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?cs=srgb&dl=pexels-dominikagregus-672532.jpg&fm=jpg' // Rio de Janeiro panoramic view
        }
    ];






    return (
        <Box sx={{ flexGrow: 1, padding: "10lvh 1rem 10lvh 1rem", width: "100%", backgroundColor: "#2c2c2c", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "2rem" }} >

            {accessToken ? <Box sx={{ '& > :not(style)': { m: 1 }, position: "fixed", bottom: "5rem", right: "1rem", zIndex: "999", width: "50%", minWidth: "220px", display: "flex", justifyContent: "space-around", alignItems: "center", maxWidth: "300px", background: "#2c2c2c", borderRadius: "30px 0px 0px 30px", borderLeft: "20px solid orange" }}>
                <Typography sx={{ fontWeight: "bold", color: "white" }}>ADD NEW EVENT</Typography>
                <Fab size="large" sx={{ backgroundColor: "orange" }} aria-label="add" onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </Box> : null}




            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {loading ? (

                    // Render skeletons while loading
                    Array.from({ length: 6 }).map((_, index) => (
                        <ThemeProvider theme={themeSkeleton}>
                            <Grid key={index} size={{ xs: 12, sm: 4, md: 4 }} sx={{ padding: { xs: "0.5rem", sm: "1rem" } }}>
                                <Card sx={{ minWidth: 280, minHeight: 450, padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "#323231" }}>
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
                    // Render actual data
                    data?.map((e, index) => (
                        <Grid key={e.eventId} size={{ xs: 12, sm: 4, md: 4 }} sx={{ padding: { xs: "0.5rem", sm: "1rem" } }}>
                            <Card sx={{ minWidth: 280, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "450px", boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;", backgroundColor: "#595959", color: "lightgray", borderTop: "10px solid orange" }}>
                                <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", flexGrow: 1, padding: "0.75rem" }}>
                                        <Badge
                                            color="warning"
                                            badgeContent={1}
                                            sx={{ zIndex: 99 }}
                                        >
                                            <BeenhereIcon />
                                        </Badge>
                                    </Box>

                                </Stack>
                                <CardActionArea>
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
                                        <Box sx={{display:"flex", justifyContent:"space-around", background:"gray"}}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>

                                            <Typography variant="h7" component="div" sx={{ color: "darkgray", }}>
                                                <Stack direction="row" spacing={1}>
                                                    <Chip sx={{background:"transparent"}}
                                                        label={
                                                            <span>
                                                                <LocationOnIcon style={{ marginRight: "0.3rem", verticalAlign: "middle" }} />
                                                               {e.eventLocation}
                                                            </span>
                                                        }
                                                    />

                                                </Stack>
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>



                                            <Typography variant="h7" component="div" sx={{ color: "darkgray" }}>

                                                <Stack direction="row" spacing={1}>
                                                    <Chip sx={{background:"transparent"}}
                                                        label={
                                                            <span>
                                                                <CalendarMonthIcon style={{ marginRight: "0.3rem", verticalAlign: "middle" }} />
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
                                    <Button size="small" sx={{ color: "gray" }}>
                                        <InfoIcon />
                                    </Button>

                                    {user?.resource_access?.["react-client"]?.roles[0] === "ADMIN" && (             //EDIT
                                        <Box sx={{ background: "orange", borderRadius: "2rem", color: "black" }}>
                                            <Button size="small" color="default" onClick={() => handleOpen3()}>
                                                <EditNoteIcon onClick={() => itemToEdit(e)} />
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


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button sx={{ position: "absolute", right: "0rem", top: "0.2rem" }} onClick={() => setOpen(false)}><CloseIcon /></Button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        New Event
                    </Typography>
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
                        <TextField id="standard-basic" label="Title" variant="standard" sx={{ width: "100%", maxWidth: "400px" }} InputLabelProps={{ //Title
                            style: { fontSize: '14px' }, // Label font size
                        }} onChange={(e) => { setPostData({ ...postData, eventTitle: e.target.value }); console.log(postData) }} />
                        <TextField id="standard-basic" label="Location" variant="standard" sx={{ width: "100%", maxWidth: "400px" }} InputLabelProps={{ //Location
                            style: { fontSize: '14px' }, // Label font size

                        }} onChange={(e) => { setPostData({ ...postData, eventLocation: e.target.value }); console.log(postData) }} />
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue); // Update local state for the DatePicker

                                        if (newValue) {
                                            // Format the date correctly
                                            const formattedDate = `${newValue.$y}-${String(newValue.$M + 1).padStart(2, '0')}-${String(newValue.$D).padStart(2, '0')}`;
                                            // Update the postData state
                                            setPostData((prevData) => ({ ...prevData, eventDate: formattedDate }));

                                            console.log("Formatted Date:", formattedDate); // Log the formatted date
                                            console.log(postData)
                                        } else {
                                            console.log("No date selected");
                                            // Optionally clear the date field in postData
                                            setPostData((prevData) => ({ ...prevData, eventDate: "" }));
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </ThemeProvider>
                        <TextField
                            id="outlined-multiline-static"    //Description
                            label="Description"
                            multiline
                            rows={4}
                            placeholder="Describe your event"
                            InputLabelProps={{
                                style: { fontSize: '14px' }, // Label font size
                            }}
                            onChange={(e) => { setPostData({ ...postData, eventDescription: e.target.value }); console.log(postData) }}
                        />


                    </Box>

                    <Box sx={{ alignSelf: "flex-end" }}>
                        <Button onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button onClick={() => addNewEvent()}>ADD</Button>

                    </Box>
                </Box>
            </Modal>
            <Modal

                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                        <Button variant="outlined" color="error" onClick={() => deleteEvent(selectedEvent)}>DELETE</Button>

                    </Box>

                </Box>
            </Modal>
            <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button sx={{ position: "absolute", right: "0rem", top: "0.2rem" }} onClick={() => setOpen3(false)}><CloseIcon /></Button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Event
                    </Typography>
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
                        <TextField id="standard-basic" label="Title" variant="standard" defaultValue={editEvent?.eventTitle || ""} sx={{ width: "100%", maxWidth: "400px" }} InputLabelProps={{ //Title
                            style: { fontSize: '14px' }, // Label font size
                        }} onChange={(e) => { setPostData({ ...postData, eventTitle: e.target.value }); console.log(postData) }} />
                        <TextField id="standard-basic" label="Location" variant="standard" defaultValue={editEvent.eventLocation} sx={{ width: "100%", maxWidth: "400px" }} InputLabelProps={{ //Location
                            style: { fontSize: '14px' }, // Label font size

                        }} onChange={(e) => { setPostData({ ...postData, eventLocation: e.target.value }); console.log(postData) }} />
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={value}
                                    defaultValue={editEvent.eventDate}
                                    onChange={(newValue) => {
                                        setValue(newValue); // Update local state for the DatePicker

                                        if (newValue) {
                                            // Format the date correctly
                                            const formattedDate = `${newValue.$y}-${String(newValue.$M + 1).padStart(2, '0')}-${String(newValue.$D).padStart(2, '0')}`;
                                            // Update the postData state
                                            setPostData((prevData) => ({ ...prevData, eventDate: formattedDate }));

                                            console.log("Formatted Date:", formattedDate); // Log the formatted date
                                            console.log(postData)
                                        } else {
                                            console.log("No date selected");
                                            // Optionally clear the date field in postData
                                            setPostData((prevData) => ({ ...prevData, eventDate: "" }));
                                        }
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
                                style: { fontSize: '14px' }, // Label font size
                            }}
                            onChange={(e) => { setPostData({ ...postData, eventDescription: e.target.value }); console.log(postData) }}
                        />


                    </Box>

                    <Box sx={{ alignSelf: "flex-end" }}>
                        <Button onClick={() => setOpen3(false)}>CANCEL</Button>
                        <Button onClick={() => addNewEvent()}>ADD</Button>

                    </Box>
                </Box>
            </Modal>

        </Box>
    )



}

export default Events

/*
Frontend Workaround
Verify Preflight Handling:

The preflight (OPTIONS) request is sent before your actual GET request.
While you can't modify preflight requests, ensure the backend server responds correctly to it.
Temporary Frontend Proxy (For Development):

If you don't control the backend server and are stuck, set up a proxy:
In your React package.json:
json
Copy code
"proxy": "http://avajava.pro:8888"
Change your Axios request to remove the domain, e.g.:
javascript
Copy code
let response = await axios.get("/api/events/all", {
    headers: { Authorization: `Bearer ${accessToken}` }
});
This will make requests appear as if they are coming from the same origin and bypass the preflight.



*/







