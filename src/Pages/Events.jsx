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



let Events = ({accessToken}) => {
    let [data, setData] = useState([])
    let [loading, setloading] = useState(true)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = useState(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        minWidth:"320px",
        maxWidth :"600px",
        zIndex:"1000000",
        background: 'rgba(255,255,255,0.9)',
   
        boxShadow: 24,
        p: 4,
        display:"flex",
        flexDirection:"column",
        gap:"2rem",

        borderRadius:"30px"
      };

     
    useEffect(() => {
        let fetchData = async () => {
            console.log(typeof accessToken)
            try {
                // Ensure accessToken is defined and is a string
                if (!accessToken || typeof accessToken !== 'string') {
                    throw new Error("Access token is missing or invalid.");
                }
        
                console.log("ACCESS TOKEN:", accessToken);
        
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                };
        
                // Make the API request
                let response = await axios.get("/api/events/all", { headers });
        
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



    const events = [
        {
            eventId: 1,
            eventTitle: "Tech Conference 2024",
            eventDescription: "A conference bringing together tech enthusiasts and professionals to discuss the latest trends in technology.",
            eventLocation: "San Francisco, CA",
            eventDate: "2024-05-15"
        },
        {
            eventId: 2,
            eventTitle: "Art Exhibition: Modern Masters",
            eventDescription: "Explore contemporary art from renowned artists at this exclusive exhibition.",
            eventLocation: "New York, NY",
            eventDate: "2024-06-01"
        },
        {
            eventId: 3,
            eventTitle: "Food Festival 2024",
            eventDescription: "Join us for a weekend of delicious food from around the world, featuring local chefs and food trucks.",
            eventLocation: "Los Angeles, CA",
            eventDate: "2024-07-10"
        },
        {
            eventId: 4,
            eventTitle: "Annual Charity Gala",
            eventDescription: "A formal event to raise funds for local charities, featuring dinner, entertainment, and a silent auction.",
            eventLocation: "Chicago, IL",
            eventDate: "2024-08-20"
        },
        {
            eventId: 5,
            eventTitle: "Music Fest 2024",
            eventDescription: "A three-day music festival featuring various genres and performances from top artists.",
            eventLocation: "Austin, TX",
            eventDate: "2024-09-15"
        },

        {
            eventId: 5,
            eventTitle: "Music Fest 2024",
            eventDescription: "A three-day music festival featuring various genres and performances from top artists.",
            eventLocation: "Austin, TX",
            eventDate: "2024-09-15"
        },

        {
            eventId: 5,
            eventTitle: "Music Fest 2024",
            eventDescription: "A three-day music festival featuring various genres and performances from top artists.",
            eventLocation: "Austin, TX",
            eventDate: "2024-09-15"
        },

        {
            eventId: 5,
            eventTitle: "Music Fest 2024",
            eventDescription: "A three-day music festival featuring various genres and performances from top artists.",
            eventLocation: "Austin, TX",
            eventDate: "2024-09-15"
        },
        {
            eventId: 5,
            eventTitle: "Music Fest 2024",
            eventDescription: "A three-day music festival featuring various genres and performances from top artists.",
            eventLocation: "Austin, TX",
            eventDate: "2024-09-15"
        }
    ];

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
        <Box sx={{ flexGrow: 1, padding: "10lvh 1rem 10lvh 1rem", width:"100%" ,background: "#8cbce4", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"2rem"  }} >
           
           <Box   sx={{ '& > :not(style)': { m: 1 }, position: "fixed", bottom: "2rem", right: "1rem", zIndex:"99",  width:"50%", minWidth:"220px", display:"flex", justifyContent:"space-around", alignItems:"center", maxWidth:"300px", background:"#8cbce4", borderRadius:"30px 0px 0px 30px" }}>
  <Typography sx={{fontWeight:"bold", color:"white"}}>ADD NEW EVENT</Typography>
  <Fab size="large" color="primary" aria-label="add" onClick={handleOpen}>
    <AddIcon />
  </Fab>
</Box>


            

            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {data.map((e, index) => (
                    <Grid key={e.eventId} size={{ xs: 12, sm: 4, md: 4 }} sx={{ padding: { xs: "0.5rem", sm: "1rem" } }}>
                        <Card sx={{ minWidth: 280, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "450px", boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;", backgroundColor: "rgba(255,255,255, 0.7)" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={panoramaImages[index].imageUrl}
                                    alt="Event card"
                                />
                                <CardContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {e.eventTitle}
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                        <LocationOnIcon sx={{ fontSize: 20 }} />
                                        <Typography variant="h7" component="div">
                                            {e.eventLocation}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body3" color="text.secondary">
                                        {e.eventDescription}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{display:"flex", justifyContent:"space-between", background:"coral"}}>
                                <Button size="small" color="default">
                                  <InfoIcon />  
                                </Button>

                                <Box sx={{background:"orange", borderRadius:"2rem"}}>
                                <Button size="small" color="default" ><EditNoteIcon/></Button>
                                <Button size="small" color="default" ><DeleteIcon/></Button>
                                </Box>
                            </CardActions>
                        </Card>

                    </Grid>
                ))}
            </Grid>


            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Button sx={{position:"absolute", right:"0rem", top:"0.2rem"}} onClick={()=>setOpen(false)}><CloseIcon/></Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Event
          </Typography>
          <Box component="form" sx={{display:"flex", flexDirection:"column", gap:"1.3rem"}}>
          <TextField id="standard-basic" label="Title" variant="standard" sx={{width:"100%", maxWidth:"400px"}}/>
          <TextField id="standard-basic" label="Location" variant="standard" sx={{width:"100%", maxWidth:"400px"}}/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          
          
        }}
        placeholder="Enter your events description"
        sx={{width:"100%", maxWidth:"400px"}}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          placeholder="Describe your event"
        />


          </Box>

          <Box sx={{alignSelf:"flex-end"}}>
          <Button>CANCEL</Button>
            <Button>ADD</Button>

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







