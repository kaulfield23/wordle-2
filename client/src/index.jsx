import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import NavbarMUI from "./components/UI/NavbarMUI";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6d4c41",
    },
    secondary: {
      main: "#fa91b4",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <NavbarMUI />
      <div id="main">
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
