import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { CustomText, CenterBox } from "../UI/customMUI/CustomMUI";

const InputText = ({ sendGuess, word }) => {
  const [guessingWord, setGuessingWord] = useState("");
  const sendWord = async (input) => {
    input.preventDefault();
    if (input.type === "click") {
      if (guessingWord.length !== word.limit) {
        alert(`You must type ${word.limit} characters`);
        return;
      }
      sendGuess(guessingWord);
      setGuessingWord("");
    }
  };

  return (
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
        id="outlined-basic"
        label="Guessing word"
        variant="outlined"
        value={guessingWord}
        onChange={(e) => setGuessingWord(e.target.value)}
        onKeyUp={sendWord}
        sx={{ width: "250px" }}
      />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        onClick={sendWord}
        sx={{ height: "55px" }}
      >
        <CustomText>Send</CustomText>
      </Button>
    </CenterBox>
  );
};

export default InputText;
