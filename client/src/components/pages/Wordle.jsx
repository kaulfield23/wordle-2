import { Button, TextField, Grow, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import StopWatch from "../UI/StopWatch";
import {
  CustomText,
  CustomBox,
  CenterBox,
} from "../UI/customMUI/CustomText.jsx";
import Register from "../UI/Register.jsx";
import GiveUpMenu from "./GiveUpMenu.jsx";
import giveColorBoxes from "../UI/giveColorBoxes";

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
      setChecked(!checked);
      setResult(body);

      if (body.every((item) => item.result === "Correct")) {
        setNotFinished(false);
      }
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

  const generateBoxes = () => {
    const copyResult = boxes.slice();
    if (result) {
      let generatedBoxes = result.map((item) => giveColorBoxes(item));
      copyResult.push(generatedBoxes);
      copyResult.reverse();
      setBoxes(copyResult);
    }
  };

  const catchTime = (finishedTime) => {
    let copy = timeRecord.slice();
    copy = finishedTime;
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
              <CenterBox
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 1,
                  },
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
              </CenterBox>
              <CenterBox
                sx={{
                  flexDirection: "column",
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
              </CenterBox>
            </>
          ) : (
            <Register
              rightWord={result}
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
