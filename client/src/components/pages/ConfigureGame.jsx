import React, { useState } from "react";
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
import { CustomText, CenterHorizon } from "../UI/customMUI/CustomMUI";

const ConfigureGame = (props) => {
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
      return alert("Set word limit for playing!");
    }
    props.wordType({ limit: wordLimit, type: wordType });
  };
  return (
    <>
      <Typography
        sx={{
          fontSize: "25px",
          margin: "50px auto 70px auto",
          fontWeight: "bold",
          color: "#65c2a6",
          fontFamily: "nunito",
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
          m: "20px auto 100px auto",
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
      <CenterHorizon
        sx={{
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
      </CenterHorizon>

      <CenterHorizon
        sx={{
          paddingBottom: "30px",
        }}
      >
        <Button variant="contained" onClick={checkValues}>
          <CustomText>PLAY WORDLE!</CustomText>
        </Button>
      </CenterHorizon>
    </>
  );
};

export default ConfigureGame;
