import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { CustomText, CenterBox } from "../UI/customMUI/CustomMUI";

const InputText = ({ sendGuess, inputGuess }) => {
  const [guessingWord, setGuessingWord] = useState("");

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
        id="filled-basic"
        label="Guessing word"
        variant="filled"
        value={guessingWord}
        onChange={(e) => setGuessingWord(e.target.value)}
        onKeyUp={sendGuess}
        sx={{ width: "250px" }}
      />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        onClick={sendGuess}
        sx={{ height: "55px" }}
      >
        <CustomText>Send</CustomText>
      </Button>
    </CenterBox>
  );
};

export default InputText;
