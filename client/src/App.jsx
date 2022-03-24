import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
function App() {
  const callApi = async () => {
    const response = await fetch("/highscore");
    const body = await response.json();
    console.log(body, "hellooooo");
  };
  useEffect(() => {
    callApi();
  }, []);

  const [wordLimit, setWordLimit] = useState("");

  const handleChange = (e) => {
    setWordLimit(e.target.value);
    console.log(e.target.value, "target");
  };

  return (
    <>
      <Typography
        sx={{
          fontSize: "25px",
          margin: "50px auto 70px auto",
          fontWeight: "bold",
          color: "#6d4c41",
          textAlign: "center",
        }}
      >
        Wordle Game
      </Typography>
      <Typography
        sx={{
          fontSize: "20px",
          textAlign: "center",
          color: "#6d4c41",
        }}
      >
        🧁Configure game
      </Typography>
      <Box
        sx={{
          minWidth: 300,
          m: "20px auto",
          width: "200px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="howManyLetters">How many letters?</InputLabel>
          <Select
            labelId="howManyLetters"
            id="howManyLetters"
            value={wordLimit}
            label="How many letters?"
            onChange={handleChange}
          >
            <MenuItem value={4}>Play with 4-letter words</MenuItem>
            <MenuItem value={5}>Play with 5-letter words</MenuItem>
            <MenuItem value={6}>Play with 6-letter words</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default App;
