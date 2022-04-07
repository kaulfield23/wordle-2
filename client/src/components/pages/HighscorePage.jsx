import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CenterBox, CustomText } from "../UI/customMUI/CustomMUI";

const HighscorePage = () => {
  const location = useLocation();
  const [body, setBody] = useState();
  const [wordLength, setwordLength] = useState(3);
  const [wordType, setwordType] = useState("all");
  let id;

  //get player's id from register page
  if (location.state) {
    id = location.state.playId;
  }

  useEffect(() => {
    const getSortedHighscore = async () => {
      const response = await fetch(
        ` /api/highscore/sorted?id=${id}&wordLength=${wordLength}&type=${wordType}`
      );
      const resBody = await response.text();
      setBody(resBody);
    };
    getSortedHighscore();
  }, [wordLength, wordType, id]);

  const handleWordLength = (value) => {
    setwordLength(value);
  };
  const handleWordType = (value) => {
    setwordType(value);
  };
  return (
    <>
      <CenterBox sx={{ maxWidth: 300, margin: "50px auto 0 auto" }}>
        <CustomText sx={{ color: "#6d4c41", width: 150 }}>Sort : </CustomText>
        <FormControl fullWidth sx={{ marginRight: 2 }}>
          <InputLabel id="wordLength">Word length</InputLabel>
          <Select
            labelId="wordLength"
            id="wordLength"
            value={wordLength}
            label="wordLength"
            onChange={(e) => handleWordLength(e.target.value)}
          >
            <MenuItem value={3}>All letters</MenuItem>
            <MenuItem value={4}>4 letters</MenuItem>
            <MenuItem value={5}>5 letters</MenuItem>
            <MenuItem value={6}>6 letters</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="wordType">Word type</InputLabel>
          <Select
            labelId="wordType"
            id="wordType"
            value={wordType}
            label="wordType"
            onChange={(e) => handleWordType(e.target.value)}
          >
            <MenuItem value={"all"}>All types</MenuItem>
            <MenuItem value={"repeating"}>Repeating</MenuItem>
            <MenuItem value={"unique"}>Unique</MenuItem>
          </Select>
        </FormControl>
      </CenterBox>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
};

export default HighscorePage;
