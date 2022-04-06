import { Button, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import StopWatch from "../UI/StopWatch";
import { CustomText, CustomBox, CenterBox } from "../UI/customMUI/CustomMUI";
import Register from "./Register";
import GiveUpMenu from "../UI/GiveUpMenu";
import ColorBoxes from "../UI/ColorBoxes";
import InputText from "../UI/InputText";

const Wordle = ({ word }) => {
  const [id, setId] = useState();
  const [guesses, setGuesses] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [notFinished, setNotFinished] = useState(true);
  const [ten, setTen] = useState(null);
  const [timer, setTimer] = useState(null);
  const [width, setWidth] = useState();

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

  const postGuessingWord = async (guessingWord) => {
    const response = await fetch(`/api/games/${id}/guess`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guessWord: guessingWord }),
    });
    const body = await response.json();

    setGuesses([...guesses, body]);

    if (body.every((item) => item.result === "Correct")) {
      setNotFinished(false);
    }
  };

  const giveUp = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    function handleSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleSize);
    handleSize();

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [setWidth]);

  //change boxes size when width is small
  let boxSize;
  if (width <= 700) {
    boxSize = `45px`;
  }

  //first grey boxes
  const setFirstBox = () => {
    let generateBoxes = Array(word.limit).fill("@");
    return generateBoxes.map((item, idx) => (
      <CustomBox
        key={idx}
        className="guessBox"
        sx={{ width: `${boxSize}`, height: `${boxSize}` }}
      />
    ));
  };

  //catch time when user finishes the game and send it to register page
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
              <InputText sendGuess={postGuessingWord} word={word} />
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

                {[...guesses].reverse().map((guess, idx) => (
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
              rightWord={guesses[guesses.length - 1]}
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
