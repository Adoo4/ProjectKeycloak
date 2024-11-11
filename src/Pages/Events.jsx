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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';


let Events = (accessToken) => {
    let [data, setData] = useState([])


    useEffect(() => {
        let fetchData = async () => {
            try {
                console.log("AKSES TOKEN:", accessToken)
                const headers = {
                    'Authorization': `Bearer ${accessToken}`,
                };

                let response = await axios.get("http://avajava.pro:8888/api/events/all"
                );
                if (response.data.length) {
                    setData([...response.data])
                    console.log("RESPONSE:", response.data)
                }
            } catch (error) { 
                console.log(error.message) 
            }

        }

        
            fetchData();
        
    }, [])



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
        }
    ];
    
      




    return (
        <Box sx={{ flexGrow: 1, padding: "10lvh 1rem 10lvh 1rem", background: "#8cbce4", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",  }} >
           
            <Card variant="outlined" sx={{width:"100%", height:"10lvh", borderRadius:"5px", border:"2px solid white" ,display:"flex", gap:"1rem", fontSize:"1.2rem", color:"black", minWidth: 280, maxWidth: 500, boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;", backgroundColor: "rgba(255,255,255, 0.7)"}}><AddCircleIcon/>ADD NEW EVENT</Card>


            

            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {(data.length ? data : events).map((e, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 4, md: 4 }} sx={{ padding: { xs: "0.5rem", sm: "1rem" } }}>
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
                            <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
                                <Button size="small" color="default">
                                  <InfoIcon />  
                                </Button>

                                <Box>
                                <Button size="small" color="default" ><EditNoteIcon/></Button>
                                <Button size="small" color="default" ><DeleteIcon/></Button>
                                </Box>
                            </CardActions>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </Box>
    )



}

export default Events







