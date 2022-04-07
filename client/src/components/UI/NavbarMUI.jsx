import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";

const NavbarMUI = () => {
  const handle = (e) => {
    e.preventDefault();
    console.log("hello");
    fetch("/api/highscores")
      .then((response) => response.text())
      .then((text) => console.log(text));
  };

  return (
    <>
      <a href="/">Home</a>
      <a href="http://localhost:5080/highscores">Highscore</a>
    </>
  );
};

export default NavbarMUI;
