import "./App.css";
import React, { useEffect, useState } from "react";
import Wordle from "./components/pages/Wordle";
import {
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const App = () => {
  const callApi = async () => {
    const response = await fetch("/highscore");
    const body = await response.json();
    console.log(body, "hellooooo");
  };
  useEffect(() => {
    callApi();
  }, []);

  const [wordLimit, setWordLimit] = useState("");
  const [wordType, setWordType] = useState("repeating");
  const handleChange = (e) => {
    setWordLimit(e.target.value);
  };

  const onChangeWordType = (e) => {
    setWordType(e.target.value);
  };

  const checkValues = (e) => {
    if (!wordLimit) {
      e.preventDefault();
      alert("Set word limit for playing!");
    }
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
          m: "20px auto 160px auto",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <FormControl sx={{ textAlign: "center" }}>
          <FormLabel sx={{ m: 2 }} id="wordType">
            Word type
          </FormLabel>
          <RadioGroup
            aria-labelledby="wordType"
            value={wordType}
            onChange={onChangeWordType}
            name="repeating"
          >
            <FormControlLabel
              sx={{ m: 1 }}
              value="repeating"
              control={<Radio color="secondary" />}
              label="Repeating characters (e.g.HELLO)"
            />
            <FormControlLabel
              sx={{ m: 1 }}
              value="unique"
              control={<Radio color="secondary" />}
              label="Unique characters only (e.g.CURLY)"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Link
        to="/Wordle"
        onClick={checkValues}
        state={{ wordLimit: wordLimit, wordType: wordType }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Button variant="contained">PLAY WORDLE!</Button>
        </Box>
      </Link>
    </>
  );
};

export default App;
