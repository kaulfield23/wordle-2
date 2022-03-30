import { Button, TextField, Grow, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import StopWatch from "../UI/StopWatch";
import { CustomText, CustomBox } from "../UI/customMUI/CustomText.jsx";
import Register from "../UI/Register.jsx";
import GiveUpMenu from "./GiveUpMenu.jsx";

const Wordle = ({ word }) => {
  const [guessingWord, setGuessingWord] = useState("");
  const [id, setId] = useState();
  const [result, setResult] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [notFinished, setNotFinished] = useState(true);
  const [boxes, setBoxes] = useState([]);
  const [checked, setChecked] = useState(true);
  const [timeRecord, setTimeRecord] = useState("");

  const getId = async () => {
    const response = await fetch(
      `/api/games?wordlength=${word.limit}&type=${word.type}`,
      {
        method: "post",
      }
    );
    const body = await response.json();
    setId(body.id);
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    generateBoxes();
    setChecked(!checked);
  }, [result]);

  const sendGuessingWord = async (input) => {
    input.preventDefault();

    if (input.type === "click") {
      if (guessingWord.length !== word.limit) {
        alert(`You must type ${word.limit} characters`);
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
      }
      setChecked(!checked);
      setResult(body);
    }
  };

  const giveUp = () => {
    setIsPlaying(false);
  };

  const setFirstBox = () => {
    let generateBoxes = Array(word.limit).fill("@");
    return generateBoxes.map((item, idx) => (
      <CustomBox key={idx} className="guessBox" />
    ));
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
        <CustomBox sx={{ backgroundColor: "#ec8585" }}>
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
      copyResult.reverse();
      setBoxes(copyResult);
    }
  };

  const catchTime = (finishedTime) => {
    console.log(finishedTime, "what");
    let copy = timeRecord.slice();
    copy = finishedTime;
    console.log(copy, "copy");
    setTimeRecord(copy);
  };

  return (
    <>
      {isPlaying ? (
        <>
          <StopWatch isPlaying={notFinished} catchTime={catchTime} />
          {notFinished ? (
            <>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={giveUp}
                  color="secondary"
                >
                  <CustomText>I give up🤪</CustomText>
                </Button>
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
                  m: 3,
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {checked && (
                  <Zoom in={checked}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      {setFirstBox()}
                    </Box>
                  </Zoom>
                )}
                {boxes &&
                  boxes.map((item) => (
                    <Box sx={{ display: "flex" }}>{item}</Box>
                  ))}
              </Box>
            </>
          ) : (
            <Register
              rightWord={result}
              giveBoxes={giveColors}
              recordedTime={timeRecord}
              userId={id}
            />
          )}
        </>
      ) : (
        <GiveUpMenu />
      )}
    </>
  );
};

export default Wordle;
