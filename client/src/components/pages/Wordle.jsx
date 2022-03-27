import React, { useEffect, useState } from "react";
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

  console.log(gameWord);
  return (
    <>
      <h1>hello</h1>
    </>
  );
};

export default Wordle;
