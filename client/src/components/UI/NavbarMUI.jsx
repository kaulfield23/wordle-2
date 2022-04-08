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
  return (
    <>
      <a href="/">Home</a>
      <a href="/highscores">Highscores</a>
      <a href="/info">Info</a>
    </>
  );
};

export default NavbarMUI;
