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



let Events = () => {


    let [data, setData] = useState(true)
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






return(
    <Box sx={{ flexGrow: 1, mt:"10lvh", mb:"10lvh" }}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {events.map((e, index) => (
        <Grid key={index} size={{ xs: 12, sm: 4, md: 4 }} sx={{padding:"1rem"}}>
           <Card sx={{ minWidth: 280, display:"flex", flexDirection:"column", alignItems:"stretch", minHeight:"400px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={e.eventImage}
                alt="Event card"
              />
               <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {e.eventTitle}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <LocationOnIcon />
                  <Typography variant="h7" component="div">
                    {e.eventLocation}
                  </Typography>
                </Box>
                <Typography variant="body3" color="text.secondary">
                  {e.eventDescription}
                </Typography>
              </CardContent> 
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>

        </Grid>
      ))}
    </Grid>
  </Box>
)



}

export default Events







