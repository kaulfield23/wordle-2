import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import StopWatch from "../UI/StopWatch";
import { CustomText } from "../UI/CustomText";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const CustomButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  width: "300px",
}));

const Wordle = ({ wordTypeForGame }) => {
  const [guessingWord, setGuessingWord] = useState("");
  const [id, setId] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const getId = async () => {
    const response = await fetch(
      `/api/games?wordlength=${wordTypeForGame[0]}&type=${wordTypeForGame[1]}`,
      {
        method: "post",
      }
    );
    const body = await response.json();
    setId(body.id);
  };

  useEffect(() => {
    getId();
  }, []);

  const handleKeyUp = async (keyCode) => {
    if (keyCode === "Enter") {
      setGuessingWord("");
    }
  };
  const giveUp = () => {
    setIsPlaying(false);
  };

  const guessingWordSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {isPlaying ? (
        <>
          <StopWatch isPlaying={isPlaying} />
          <Box
            component="form"
            onSubmit={guessingWordSubmit}
            sx={{
              "& > :not(style)": {
                m: 1,
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            noValidate
          >
            <TextField
              id="filled-basic"
              label="Type guessing word"
              variant="filled"
              onChange={(e) => setGuessingWord(e.target.value)}
              onKeyUp={(e) => handleKeyUp(e.code)}
            />
            <Button type="submit" variant="contained" size="medium">
              <CustomText>Send</CustomText>
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", m: 5 }}>
            <Button
              variant="contained"
              size="small"
              onClick={giveUp}
              color="secondary"
            >
              <CustomText>I give up😢</CustomText>
            </Button>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "300px",
            height: "90vh",
            margin: "0 auto",
          }}
        >
          <Link to="/highscore">
            <CustomButton variant="contained" color="secondary">
              <CustomText>Checkout highscores</CustomText>
            </CustomButton>
          </Link>
          <Link to="/info">
            <CustomButton variant="contained">
              <CustomText>Information about Wordle</CustomText>
            </CustomButton>
          </Link>
        </Box>
      )}
    </>
  );
};

export default Wordle;
