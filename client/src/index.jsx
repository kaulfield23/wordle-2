import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Info from "./components/pages/Info";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarMUI from "./components/UI/NavbarMUI";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6d4c41",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavbarMUI />
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/info" element={<Info />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
