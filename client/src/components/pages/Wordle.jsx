import { Button, TextField, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import StopWatch from "../UI/StopWatch";
import { CustomText, CustomBox, CenterBox } from "../UI/customMUI/CustomMUI";
import Register from "./Register";
import GiveUpMenu from "../UI/GiveUpMenu";
import ColorBoxes from "../UI/ColorBoxes";

const Wordle = ({ word }) => {
  const [guessingWord, setGuessingWord] = useState("");
  const [id, setId] = useState();
  const [guesses, setGuesses] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [notFinished, setNotFinished] = useState(true);
  const [timeRecord, setTimeRecord] = useState(null);
  const [ten, setTen] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const getId = async () => {
      const response = await fetch(
        `/api/games?wordlength=${word.limit}&type=${word.type}`,
        {
          method: "post",
        }
      );
      const body = await response.json();
      setId(body.id);
    };
    getId();
  }, [word.limit, word.type]);

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

      setGuesses([...guesses, body].reverse());

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

  const catchMin = (value) => {
    if (!notFinished) {
      setTen(value);
    }
  };
  const catchTime = (value) => {
    if (!notFinished) {
      setTimer(value);
    }
  };

  return (
    <>
      {isPlaying ? (
        <>
          <StopWatch
            isPlaying={notFinished}
            catchMin={catchMin}
            catchTime={catchTime}
          />
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
                <Zoom key={guesses.length} in={true}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    {setFirstBox()}
                  </Box>
                </Zoom>

                {guesses.map((guess, idx) => (
                  <Box key={idx} sx={{ display: "flex" }}>
                    {guess.map((item, idx) => (
                      <ColorBoxes item={item} key={idx} />
                    ))}
                  </Box>
                ))}
              </CenterBox>
            </>
          ) : (
            <Register
              rightWord={guesses[0]}
              recordedTime={{ time: timer, ten: ten }}
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
