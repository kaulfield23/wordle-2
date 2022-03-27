import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import StopWatch from "../UI/StopWatch";

const Wordle = ({ wordTypeForGame }) => {
  const [gameWord, setGameWord] = useState("");

  const getAWord = async () => {
    const response = await fetch(
      `/api/word?wordlength=${wordTypeForGame[0]}&type=${wordTypeForGame[1]}`
    );
    const body = await response.json();
    setGameWord(body);
  };

  useEffect(() => {
    getAWord();
  }, []);

  return (
    <>
      <StopWatch />
    </>
  );
};

export default Wordle;
