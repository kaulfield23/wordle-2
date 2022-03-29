import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import StopWatch from "../UI/StopWatch";
import {
  CustomText,
  CustomButton,
  CustomBox,
} from "../UI/customMUI/CustomText.jsx";
import { Link } from "react-router-dom";

const Wordle = ({ wordTypeForGame }) => {
  const [guessingWord, setGuessingWord] = useState("");
  const [id, setId] = useState();
  const [result, setResult] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [notFinished, setNotFinished] = useState(true);
  const [boxes, setBoxes] = useState([]);

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

  useEffect(() => {
    generateBoxes();
    checkCorect();
    // console.log(notFinished, "notFInished");
  }, [result]);

  const checkCorect = () => {};
  const sendGuessingWord = async (input) => {
    input.preventDefault();

    if (input.type === "click") {
      if (guessingWord.length !== wordTypeForGame[0]) {
        alert(`You must type ${wordTypeForGame[0]} characters`);
        return;
      }
      setGuessingWord("");

      const response = await fetch(`/api/games/${id}/guess`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guessWord: guessingWord }),
      });
      const body = await response.json();
      if (body.every((item) => item.result === "Correct")) {
        setNotFinished(false);
        console.log(notFinished);
      }

      setResult(body);
    }
  };

  const giveUp = () => {
    setIsPlaying(false);
  };

  const setFirstBox = () => {
    let generateBoxes = Array(wordTypeForGame[0]).fill("@");
    return generateBoxes.map((item, idx) => <CustomBox key={idx} />);
  };
  const giveColors = (item) => {
    if (item.result === "Correct") {
      return (
        <CustomBox sx={{ backgroundColor: "#65c2a6" }}>
          <Box sx={{ position: "relative", top: "30%" }}>
            <CustomText>{item.letter}</CustomText>
          </Box>
        </CustomBox>
      );
    } else if (item.result === "Misplaced") {
      return (
        <CustomBox sx={{ backgroundColor: "#f8d486" }}>
          <Box sx={{ position: "relative", top: "30%" }}>
            <CustomText>{item.letter}</CustomText>
          </Box>
        </CustomBox>
      );
    } else {
      return (
        <CustomBox>
          <Box sx={{ position: "relative", top: "30%" }}>
            <CustomText>{item.letter}</CustomText>
          </Box>
        </CustomBox>
      );
    }
  };
  const generateBoxes = () => {
    const copyResult = boxes.slice();
    if (result) {
      let generatedBoxes = result.map((item) => giveColors(item));
      copyResult.push(generatedBoxes);
      setBoxes(copyResult);
    }
  };

  const catchTime = (e) => {
    console.log(e, "hello");
  };

  return (
    <>
      {isPlaying ? (
        <>
          <StopWatch isPlaying={notFinished} catchTime={catchTime} />
          {notFinished ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {!result && (
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    {setFirstBox()}
                  </Box>
                )}
                {boxes &&
                  boxes.map((item) => (
                    <Box sx={{ display: "flex" }}>{item}</Box>
                  ))}
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 1,
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  m: 2,
                }}
                noValidate
              >
                <TextField
                  id="filled-basic"
                  label="Guessing word"
                  variant="filled"
                  value={guessingWord}
                  onChange={(e) => setGuessingWord(e.target.value)}
                  onKeyUp={sendGuessingWord}
                  sx={{ width: "250px" }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  onClick={sendGuessingWord}
                  sx={{ height: "55px" }}
                >
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
            <>
              <Box sx={{ textAlign: "center", m: 2 }}>
                <h1>🧁YOU WON !</h1>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {result.map((item) => giveColors(item))}
              </Box>
            </>
          )}
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
