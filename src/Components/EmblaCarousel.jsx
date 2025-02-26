import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import "../styles/Carousel.css"
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ConstructionIcon from '@mui/icons-material/Construction';
import LanguageIcon from '@mui/icons-material/Language';
import { Divider } from '@mui/material';
import { useMediaQuery } from "@mui/material";

export function EmblaCarousel() {
    const autoplayOptions = Autoplay({ delay: 3000, stopOnInteraction: false });
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const isXsScreen = useMediaQuery("(max-width:600px)");

  const containerHeight = isXsScreen ? "65lvh" : "80lvh";

  

  return (
    <Box sx={{ position: 'relative' }}>
    {/* Embla Carousel */}
    <div className="embla" ref={emblaRef}>
      <div className="embla__container" style={{ height: containerHeight }}>
        <div className="embla__slide" >
          <img
            src="https://i.postimg.cc/DvfFZ3WH/person-suffering-from-technology-addiction-cybersickness.jpg"
            alt=""
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://i.postimg.cc/WtcNKtw8/cyberpunk-warrior-woman-portrait.jpg"
            alt=""
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://i.postimg.cc/j5jQ1LvG/hot-air-balloons-dotting-sky-mountain-range.jpg"
            alt=""
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://i.postimg.cc/LsS0cJv0/freepik-expand-13980.png"
            alt=""
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://i.postimg.cc/J0wLBrRw/freepik-expand-16547.png"
            alt=""
          />
        </div>
        <div className="embla__slide">
          <img
            src="https://i.postimg.cc/8cGDJvZx/soccer-stadium-full-people.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  
    {/* Text and Icons positioned on top of the carousel */}
    <Box
      sx={{
        position: 'absolute',
        top: '50%', // Adjust as needed for positioning
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 2,
        color: 'white',
        padding: '1rem',
        width: '100%',
    
        display:"flex",
        flexDirection:"column",
        
      }}
    >
     <Typography
  variant="h4"
  component="h1"
  sx={{
    fontWeight: 'bold',
    fontSize: { xs: '2.5rem', lg: '5rem' },
    opacity: 0,
    transform: 'translateX(-100%)',
    animation: 'slideIn 1s forwards',
    '@keyframes slideIn': {
      '30%': { transform: 'translateX(-50%)', opacity: 0 },
      '100%': { transform: 'translateX(0)', opacity: 1 },
    },
  }}
>
        Create Moments That Matter
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        sx={{
          color: 'white',
         
          fontSize: { lg: '2rem' },
        }}
      >
        Discover experiences tailored just for you
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          color: 'white',
          mt: '1rem',
          justifyContent: 'center',
        }}
      >
        <MusicNoteIcon
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            border: '2px solid white',
            padding: '0.25rem',
            borderRadius: '10px',
          }}
        />
        <SportsFootballIcon
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            border: '2px solid white',
            padding: '0.25rem',
            borderRadius: '10px',
          }}
        />
        <LocalMallIcon
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            border: '2px solid white',
            padding: '0.25rem',
            borderRadius: '10px',
          }}
        />
        <TheaterComedyIcon
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            border: '2px solid white',
            padding: '0.25rem',
            borderRadius: '10px',
          }}
        />
        <SportsEsportsIcon
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            border: '2px solid white',
            padding: '0.25rem',
            borderRadius: '10px',
          }}
        />
      </Box>
      
    </Box>
  </Box>
  )
}