import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Embla, { EmblaCarousel } from "../Components/EmblaCarousel";
import "../styles/Divider.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ConstructionIcon from "@mui/icons-material/Construction";
import LanguageIcon from "@mui/icons-material/Language";
import Drawer from "@mui/material/Drawer";
import InputFileUpload from "../Components/UploadComponent";
import EventGallery from "../Components/EventGallery";
import Searchbar from "../Components/Searchbar";

const pageVariants = {
  initial: { x: "200%", opacity: 1 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-200%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    y: "-200%",
    opacity: 0,
    transition: { duration: 0.1, ease: "easeOut" },
  },
};

const Events = ({ accessToken, user }) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [drawerData, setDrawerData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [size, setSize] = useState(450)
  const [notification, setNotification] = useState("")
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleClose2 = () => setOpen2(false);

  const handleClose3 = () => setOpen(false);
  const [value, setValue] = useState(null);
  const [postData, setPostData] = useState({
    eventTitle: "",
    eventDescription: "",
    eventLocation: "",
    eventDate: "",
  });
  const [inViewport, setInViewport] = useState(false);
  const cardRef = useRef(null);
  const [searchdata, setSearchData] = useState([])


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInViewport(true); // Card is in the viewport
        } else {
          setInViewport(false); // Card is out of the viewport
        }
      },
      { threshold: 0.5 } // Trigger when at least 50% of the card is in the viewport
    );

    if (cardRef.current) {
      observer.observe(cardRef.current); // Start observing the card
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current); // Clean up observer
      }
    };
  }, []);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [editEvent, setEditEvent] = useState({
    eventTitle: "",
    eventDescription: "",
    eventLocation: "",
    eventDate: "",
    eventImage:""
  });

  const [edit, setEdit] = useState({
    eventTitle: "",
    eventDescription: "",
    eventLocation: "",
    eventDate: "",
  });

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const toggleDrawer = (open) => () => {
    setDrawer(open);
    setNotification("")
  };

  const navigate = useNavigate();
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    minWidth: "320px",
    maxWidth: "600px",
    zIndex: "1000000",
    background: "lightgray",

    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",

    borderRadius: "30px",
  };

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    minWidth: "320px",
    maxWidth: "600px",
    zIndex: "1000000",
    background: "orange",

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
            "& .MuiInputLabel-root": {
              fontSize: "14px",
            },
          },
        },
      },
    },
  });

  const addNewEvent = async () => {
    try {
      const formData = new FormData();
       formData.append('event', new Blob([JSON.stringify(postData)], { type: 'application/json' }));
  
      if (selectedFile) {
        console.log(selectedFile)

        formData.append("image", selectedFile);
      }
  
      const response = await axios.post("/api/events/create", formData, {

        headers: {

          Authorization: `Bearer ${accessToken}`,

        },
      });
  
      if (response && response.data) {
        setData([...data, response.data]);

        console.log("Event added:", response.data);
      }
    } catch (error) {
      
        console.error("Server responded with:", error.response.data);
      
    }
  };
  
  const deleteEvent = async (eventId) => {
    try {
      const id = eventId;
      console.log("ID:", id);
      const response = await axios.delete(`/api/events/${eventId}`, {
        headers,
      });
      if (response && response.data) {
        setData(data.filter((e, i) => eventId !== e.eventId));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEditEvent((prev) => ({ ...prev, eventImage: reader.result }));
    };
  };

  const itemToEdit = (e) => {
    const title = e.eventTitle;
    const location = e.eventLocation;
    const description = e.eventDescription;
    const date = dayjs(e.eventDate);
    const image = e.eventImage;
  
    setEditEvent({
      eventId: e.eventId,
      eventTitle: title,
      eventLocation: location,
      eventDescription: description,
      eventDate: date,
      eventImage: image, // Add this line
    });
  };
  

  const changeEvent = async () => {
    const id = editEvent.eventId;
    try {
      const formData = new FormData();
      
      // Ensure event data is updated correctly
      const eventData = {
        eventTitle: edit.eventTitle || editEvent.eventTitle,
        eventDescription: edit.eventDescription || editEvent.eventDescription,
        eventLocation: edit.eventLocation || editEvent.eventLocation,
        eventDate: edit.eventDate || dayjs(editEvent.eventDate).format("YYYY-MM-DD"),
      };
      
      formData.append('event', new Blob([JSON.stringify(eventData)], { type: 'application/json' }));
  
      // Append the image: Use selectedFile if a new file is chosen, else use existing eventImage
      if (selectedFile) {
        console.log("Uploading new file:", selectedFile);
        formData.append("image", selectedFile);
      } else if (editEvent.eventImage) {
        // Reuse the existing image if no new file is selected
        const existingImageBlob = await fetch(editEvent.eventImage).then((res) => res.blob());
        formData.append("image", existingImageBlob, "existingImage.jpg");
      }
  
      const response = await axios.put(`/api/events/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response && response.data) {
        setData(
          data.map((e) => (e.eventId === id ? { ...response.data, eventId: id } : e))
        );
        console.log("Event updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error updating event:", error.response?.data || error.message);
    }
  };
  
  
  
  
  const list = () =>
    drawerData.eventId && (
      <Box
        sx={{
          minWidth: 400,
          maxWidth: 500,
           background: "linear-gradient(to bottom, #000000 100%, #333333 100%)", // Image gradient (dark to dark gray)
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          zIndex: 1300,
          color: "white",
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "2rem",
          
        }}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <Box
  sx={{
    width: "100%",
    height: "650px",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* The Image */}
  <img
    src={`data:image/jpeg;base64,${drawerData.eventImage}`}
    alt="Event"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />

  {/* The Overlay with Infinite Scanline Effect */}
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0.1))",
      pointerEvents: "none",

      // Static scanlines
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage:
          "repeating-linear-gradient(transparent 0px, rgba(255, 255, 255, 0.05) 3px, transparent 6px)", 
        opacity: 0.2, // Adjust scanline visibility
        pointerEvents: "none",
      },

      // Moving horizontal scanline
      "&::before": {
        content: '""',
        position: "absolute",
        top: "-100%",
        left: 0,
        width: "100%",
        height: "3%",
        background:
          "linear-gradient(rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
        animation: "scanline-animation 6s linear infinite",
        opacity: 0.2, // Adjust brightness
        pointerEvents: "none",
      },

      // Keyframe animation
      "@keyframes scanline-animation": {
        "0%": { top: "-100%" },
        "100%": { top: "100%" },
      },
    }}
  />
</Box>


        {/* Event Details */}
        <Box
          sx={{
            px: 2,
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "orange" }}>
            {drawerData.eventLocation}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
            {drawerData.eventTitle}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "gray", mt: 1 }}
            onClick={() => console.log(drawerData.eventDate)}
          >
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(drawerData.eventDate))}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
            {drawerData.eventDescription}
          </Typography>
        </Box>

        {/* Attend Button */}
        <Button
        
          sx={{
            background: "orange",
            fontWeight: "bold",
            color: "black",
            width: "100%",
            "&:hover": {
              background: "#ffb84d", // Slightly lighter orange on hover
            },
          }} 
          onClick={() => 
            user?.resource_access?.["react-client"]?.roles.includes("ADMIN") || 
            user?.resource_access?.["react-client"]?.roles.includes("KORISNIK")
              ? navigate(`/events/${drawerData.eventId}`)
              : setNotification("Please login to continue")
          }
        >
          PROCEED

         
        </Button>
        {notification&& <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", color:"orange" }}> <Typography sx={{fontSize:"0.9rem"}}>{notification}</Typography> </Box>}
      </Box>
    );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "tween", stiffness: 100 }}
    >
      <Box
        sx={{
          flexGrow: 1,
          gap:"4rem",
          width: "100%",
          background: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user &&
        user?.resource_access?.["react-client"]?.roles[0] === "ADMIN" ? (
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
              position: "fixed",
              bottom: "5rem",
              right: "1rem",
              zIndex: "999",
              width: "50%",
              minWidth: "220px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              maxWidth: "300px",
              background: "#2c2c2c",
              borderRadius: "30px 0px 0px 30px",
              borderLeft: "20px solid orange",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "white",
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
              }}
            >
              ADD NEW EVENT
            </Typography>
            <motion.div
              whileHover={{ rotate: 180 }} // Rotates 360 degrees
              style={{ display: "inline-block", cursor: "pointer" }}
            >
              {" "}
              <Fab
                size="large"
                sx={{ backgroundColor: "orange" }}
                aria-label="add"
                onClick={handleOpen}
              >
                <AddIcon />
              </Fab>
            </motion.div>
          </Box>
        ) : null}

        <EmblaCarousel />
       

     { data &&  <Box sx={{display:"flex", width:"60%"}}> <Searchbar size={size} setSize={setSize} data={data} setData={setData} searchdata={searchdata} setSearchData={setSearchData}/></Box>}

        <AnimatePresence>
          <EventGallery
            loading={loading}
            setData={setData}
            setloading={setloading}
            accessToken={accessToken}
            data={data}
            user={user}
            setOpen3={setOpen3}
            setEditEvent={setEditEvent}
            setSelectedEvent={setSelectedEvent}
            setOpen2={setOpen2}
            setDrawerData={setDrawerData}
            setDrawer={setDrawer}
            searchdata={searchdata}
            size={size}
            
          />
          {open && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
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
                  <Button
                    sx={{ position: "absolute", right: "0rem", top: "0.2rem" }}
                    onClick={handleClose}
                  >
                    X
                  </Button>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    New Event
                  </Typography>
                  <Box
                    component="form"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.3rem",
                    }}
                  >
                    <TextField
                      label="Title"
                      variant="standard"
                      sx={{ width: "100%", maxWidth: "400px" }}
                      InputLabelProps={{
                        style: { fontSize: "14px" },
                      }}
                      onChange={(e) =>
                        setPostData({ ...postData, eventTitle: e.target.value })
                      }
                    />
                    <TextField
                      label="Location"
                      variant="standard"
                      sx={{ width: "100%", maxWidth: "400px" }}
                      InputLabelProps={{
                        style: { fontSize: "14px" },
                      }}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          eventLocation: e.target.value,
                        })
                      }
                    />
                    <ThemeProvider theme={theme}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                            if (newValue) {
                              const formattedDate = `${newValue.$y}-${String(
                                newValue.$M + 1
                              ).padStart(2, "0")}-${String(
                                newValue.$D
                              ).padStart(2, "0")}`;
                              setPostData((prevData) => ({
                                ...prevData,
                                eventDate: formattedDate,
                              }));
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
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          eventDescription: e.target.value,
                        })
                      }
                    />
                    <InputFileUpload setFile={setSelectedFile} />{" "}
                    {/* Image upload component */}
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
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <WarningAmberIcon /> WARNING
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  Are you sure you want to delete this Event?
                </Typography>
                <Box
                  sx={{ alignSelf: "flex-end", display: "flex", gap: "1rem" }}
                >
                  <Button color="default" onClick={handleClose2}>
                    CANCEL
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      deleteEvent(selectedEvent);
                      setOpen2(false);
                    }}
                  >
                    DELETE
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </Modal>

          <div>
            <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </div>

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
                <Button
                  sx={{ position: "absolute", right: "0rem", top: "0.2rem" }}
                  onClick={() => setOpen3(false)}
                >
                  <CloseIcon />
                </Button>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Event
                </Typography>
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.3rem",
                  }}
                >
                  <TextField
                    id="standard-basic"
                    label="Title"
                    variant="standard"
                    defaultValue={editEvent?.eventTitle || ""}
                    sx={{ width: "100%", maxWidth: "400px" }}
                    InputLabelProps={{
                      //Title
                      style: { fontSize: "14px" },
                    }}
                    onChange={(e) => {
                      setEdit({
                        ...edit,
                        eventTitle: e.target.value || editEvent.eventTitle,
                      });
                    }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Location"
                    variant="standard"
                    defaultValue={editEvent.eventLocation}
                    sx={{ width: "100%", maxWidth: "400px" }}
                    InputLabelProps={{
                      //Location
                      style: { fontSize: "14px" },
                    }}
                    onChange={(e) => {
                      setEdit({
                        ...edit,
                        eventLocation:
                          e.target.value || editEvent.eventLocation,
                      });
                    }}
                  />
                  <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date"
                        value={value || editEvent.eventDate}
                        onChange={(newValue) => {
                          const selectedDate =
                            newValue || value || editEvent.eventDate;

                          setValue(selectedDate);

                          const formattedDate =
                            dayjs(selectedDate).format("YYYY-MM-DD");

                          setEdit((prevData) => ({
                            ...prevData,
                            eventDate: formattedDate,
                          }));

                          console.log("Formatted Date:", formattedDate);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </ThemeProvider>
                  <TextField
                    id="outlined-multiline-static" //Description
                    label="Description"
                    defaultValue={editEvent.eventDescription}
                    multiline
                    rows={4}
                    placeholder="Describe your event"
                    InputLabelProps={{
                      style: { fontSize: "14px" },
                    }}
                    onChange={(e) => {
                      setEdit({
                        ...edit,
                        eventDescription:
                          e.target.value || editEvent.eventDescription,
                      });
                      console.log(edit);
                    }}
                  />
                    <InputFileUpload setFile={setSelectedFile} />
                </Box>

                <Box sx={{ alignSelf: "flex-end" }}>
                  <Button
                    onClick={() => {
                      setOpen3(false);
                      setEditEvent({
                        eventTitle: "",
                        eventDescription: "",
                        eventLocation: "",
                        eventDate: "",
                        
                      });
                    }}
                  >
                    CANCEL
                  </Button>
                  <Button onClick={changeEvent}>APPLY</Button>
                </Box>
              </Box>
            </motion.div>
          </Modal>
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default Events;
