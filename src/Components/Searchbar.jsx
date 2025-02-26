import * as React from "react";
import {useState} from 'react';
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import Button from "@mui/material/Button";

export default function Searchbar({
  data,
  setData,
  searchdata,
  setSearchData,
  size,
  setSize
}) {
  let debounceTimer;
  let [toggle, settoggle] = useState(false)

  const searchHandler = (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = e.target.value.toLowerCase();
      if (query) {
        const filteredData = data.filter(
          (item) =>
            item.eventTitle.toLowerCase().includes(query) ||
            item.eventLocation.toLowerCase().includes(query)
        );
        console.log(filteredData);
        if (filteredData.length) {
          setSearchData(filteredData);
        }
      } else {
        setSearchData(data);
      }
    }, 300); // 300ms debounce delay
  };

  let sizeReduce = () => {

    if(size >= 300) {

        setSize((prev)=>prev - 50)
        settoggle(true)
    }

  }

  let sizeIncrease = () => {
    setSize(450)
    settoggle(false)
    
      }

  return (
    <Box
      sx={{
        padding: "1rem",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly", flexWrap:"wrap", gap:"1rem", background:"#141414", borderRadius:"3rem"
      }}
    >
      {/* Container for input and icon */}
      <Box sx={{ position: "relative", width: "40%", minWidth:"250px" }}>
        {/* Magnifier Icon */}
        <SearchIcon
          sx={{
            position: "absolute",
            top: "50%",
            left: "1rem", // Adjust padding from the left
            transform: "translateY(-50%)",
            color: "gray",
            pointerEvents: "none", // Prevent icon from capturing input focus/clicks
          }}
        />

        {/* Input Field */}
        <input
          type="search"
          placeholder="Search for events..."
          style={{
            borderRadius:"3rem",
            width: "100%",
            padding: "1rem 1rem 1rem 3rem", // Add left padding to avoid overlapping the icon
            background: "transparent",
            border: "1px solid gray",
            color: "white",

            WebkitAppearance: "none", // To standardize input appearance across browsers
          }}
          onChange={searchHandler}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth:"250px",
          justifyContent: "center",
          gap: "1rem",
          
          display:{xs:"none", md:"flex"},
          borderRadius:"3rem"
        }}
      >
       <Button sx={{display:toggle?  "flex" : "none"}} onClick={sizeIncrease}> <ControlPointOutlinedIcon sx={{ color: "gray", fontSize: "2rem" }} /></Button>
        <GridViewOutlinedIcon sx={{ color: "gray", fontSize: "2rem" }} />
       <Button onClick={sizeReduce}> <RemoveCircleOutlineIcon sx={{ color: "gray", fontSize: "2rem" }} /></Button>
      </Box>

      {/* Custom styles for the clear (cancel) button */}
      <style>
        {`
          input[type="search"]::-webkit-search-cancel-button {
            -webkit-appearance: none;
            height: 14px;
            width: 14px;
            background: gray;
            border-radius: 50%;
            mask: url('data:image/svg+xml;utf8,<svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"/></svg>') center / contain no-repeat;
          }
          input[type="search"]:focus::-webkit-search-cancel-button {
            background: gray; /* Ensure it stays gray on focus */
          }
        `}
      </style>
    </Box>
  );
}
