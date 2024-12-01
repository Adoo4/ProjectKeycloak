import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import Skeleton from '@mui/material/Skeleton';
import Badge from '@mui/material/Badge';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useParams } from "react-router-dom";
import DescriptionIcon from '@mui/icons-material/Description';
import KeyIcon from '@mui/icons-material/Key';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



const Page = ({ accessToken, user }) => {

  const [item, setitem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservations, setreservations] = useState(true)
  const [listofreservations, setlistofreservations] = useState([])

  const { eventId } = useParams();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {

    console.log('Access Token:', accessToken);

    const fetchitem = async () => {


      try {
        console.log("DOHVACAM EVENT!!!!!!!!!!!")
        const response = await axios.get(`/api/events/${eventId}`, { headers })
        console.log("DOHVACEN ITEM: ", response.data)
        setitem(response.data);
        setLoading(false)

      }
      catch (e) {
        console.log(e.message)
      }
    }

    fetchitem();

  }, [accessToken, eventId])

  useEffect(() => {
    const fetchreservations = async () => {
      console.log(listofreservations)

      try {
        const response = await axios.get("/api/events/all/reservations", { headers })
        console.log("RESERVATIONS : ", response.data)
        const list = [...response.data];
        const filteredList = list.filter((e)=> e?.eventId?.eventId === item?.eventId)
        console.log("filtered: ",filteredList)
        setlistofreservations([...filteredList])
      }
      catch (e) {

      }
    }
    if (user?.resource_access?.["react-client"]?.roles?.includes("ADMIN")) {
      fetchreservations();
    }

  }, [item])


  const attendEvent = async () => {

    const payload = {
      userId: user.sub,
      userName: user.preferred_username,
      eventId: {
        eventId: item.eventId,
        eventTitle: item.eventTitle,
        eventDescription: item.eventDescription,
        eventLocation: item.eventLocation,
        eventDate: item.eventDate
      }
    }

    try {
      /*Iako zahtjhev prolazi izbacuje error 500 pa sam izbjegao update state-a, nakon reloada state se updateuje
      /*setlistofreservations(listofreservations.filter((e)=>e?.userId === payload?.userId? e : [...listofreservations, payload]))*/
      const response = await axios.post(`/api/events/${eventId}/reservation`, payload, { headers });
      console.log("RESERVATION MADE:",response.data)
     /* if(listofreservations.length) {
        console.log("listofreservations:", listofreservations)
      }*/
     




    }
    catch (e) {

      console.error("Error occurred:", e.response?.data || e.message);
    }


  }




  if (!!loading) {


    return (
      <Box sx={{ padding: "10lvh 1rem 10lvh 1rem", width: "100%", backgroundColor: "#2c2c2c", display: "flex", flexDirection: { xs: "column" }, justifyContent: "center", alignItems: "center", gap: "2rem" }} >

        <Skeleton variant="rectangular" width={"100%"} height={"100lvh"} />

        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

          </Box>

          <Box>
            <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
          </Box>

          <Box>
            <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
          </Box>
          <Box>
            <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
          </Box>

        </Box>

      </Box>

    )
  }


  return (

    <>

      <Box sx={{ width: "100%", height: "100lvh", backgroundImage: { xs: "url(https://i.postimg.cc/SRz2kCCD/map-pin-location-direction-position-graphic.jpg)", md: "url(https://i.postimg.cc/BQKYwzL1/soccer-fans-cheering-team-monochrome-1.jpg)" }, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", position: "fixed" }}></Box>

      {item && <Box sx={{ padding: "10lvh 1rem 10lvh 1rem", width: "100%", background: "linear-gradient(to bottom, transparent 0%, black 80%)", display: "flex", flexDirection: { xs: "column" }, justifyContent: "center", alignItems: "center", gap: "1rem", zIndex: 55 }} >


        <Typography sx={{ fontSize: "clamp(3rem, 10vw, 8rem)", color: "white" }}>{item.eventTitle}</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100%", gap: 4, alignItems: "center" }}>
          {reservations ? (
            <>
              {[
                {
                  title: "Location",
                  content: `Join us at the heart of ${item.eventLocation}, where the energy of the event comes alive! The venue is conveniently situated, offering easy accessibility and a welcoming atmosphere for all attendees. We can't wait to welcome you to this fantastic location and make the event truly memorable!`,
                  icon: <LocationOnIcon sx={{ fontSize: "2rem" }} />,
                },
                {
                  title: "Date",
                  content: item.eventDate,
                  icon: <CalendarMonthIcon sx={{ fontSize: "2rem" }} />,
                },
                {
                  title: "Description",
                  content: item.eventDescription,
                  icon: <DescriptionIcon sx={{ fontSize: "2rem" }} />,
                },
              ].map((section, index) => (
                <Box
                  key={index}
                  sx={{
                    background: "rgba(0,0,0,0.8)",
                    width: { lg: "50%", xs: "100%" },
                    display: "flex",
                    justifyContent: "space-between",
                    color: "white",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: "80%",
                      padding: { lg: 4, md: 2, xs: 2 },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ color: "orange", fontSize: "0.8rem", fontWeight: "bold" }}>
                      {section.title}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                      {section.content}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "20%", color: "orange" }}>
                    {section.icon}
                  </Box>
                </Box>
              ))}

              <Button
                sx={{
                  background: "orange",
                  color: "black",
                  minWidth: "300px",
                  "&:hover": { background: "darkorange" },
                }}
                onClick={attendEvent}
              >
                ATTEND
              </Button>

              {user?.resource_access?.["react-client"]?.roles?.includes("ADMIN") && (
                <Button
                  sx={{
                    background: "transparent",
                    color: "orange",
                    minWidth: "300px",
                    border: "1px solid orange",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    "&:hover": {
                      background: "rgba(255,165,0,0.1)",
                    },
                  }}
                  onClick={() => setreservations(false)}
                  aria-label="View Reservations"
                  title="View Reservations"
                >
                  <KeyIcon />
                  RESERVATIONS
                </Button>
              )}

            </>
          ) : (<>

            <TableContainer component={Paper} sx={{ background: "rgba(255,255,255, 0.2)", height: "50lvh", width: { xs: "100%", lg: "50%" } }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", flexGrow: 1, padding: "0.75rem", gap: "1rem", background: "orange", width: "100%" }}>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>PARTICIPANTS</Typography>
                <Badge
                  color="warning"
                  badgeContent={listofreservations ?listofreservations.length : 0}
                  sx={{ zIndex: 99 }}
                >
                  <BeenhereIcon fontSize="small" />
                </Badge>
              </Box>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "orange" }}>Reservation ID</TableCell>
                    <TableCell align="right" sx={{ color: "orange" }}>Username</TableCell>

                    <TableCell align="right" sx={{ color: "orange" }}>User ID</TableCell>


                  </TableRow>
                </TableHead>
                <TableBody>
                  {listofreservations &&
                    listofreservations.map((e, i) => {
                      
                      return (
                        <TableRow
                          key={e?.reservationId || i} 
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: "rgba(0,0,0,0.5)" }}
                        >
                          <TableCell component="th" scope="row" sx={{ color: "white" }} >
                            {e?.reservationId || "unknown"}
                          </TableCell>
                          <TableCell align="right" sx={{ color: "white" }}>{e?.userName || "unknown"}</TableCell>
                          <TableCell align="right" sx={{ color: "white" }}>{e?.userId || "unknown"}</TableCell>


                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              sx={{
                background: "transparent",
                color: "orange",
                minWidth: "300px",
                border: "1px solid orange",
                display: "flex",
                alignItems: "center",
                gap: 2,
                "&:hover": {
                  background: "rgba(255,165,0,0.1)",
                },
              }}
              onClick={() => setreservations(true)}
              aria-label="View Reservations"
              title="View Reservations"
            >

              BACK
            </Button>
          </>

          )}
        </Box>


      </Box>}</>
  )
}

export default Page


