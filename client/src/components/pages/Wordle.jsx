import React from "react";
import { useLocation } from "react-router-dom";
const Wordle = () => {
  const location = useLocation();
  const wordLimit = location.state.wordLimit;
  const wordType = location.state.wordType;
  console.log(wordLimit, wordType);
  return (
    <>
      <h1>hello</h1>
    </>
  );
};

export default Wordle;
