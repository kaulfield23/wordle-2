import "./App.css";
import React, { useState } from "react";
import Wordle from "./components/pages/Wordle";
import ConfigureGame from "./components/pages/ConfigureGame";
const App = () => {
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const [wordTypeForGame, setWordTypeForGame] = useState([]);
  const checkWordType = (value) => {
    if (value) {
      setIsReadyToPlay(true);
      setWordTypeForGame(value);
    }
  };
  return (
    <>
      {isReadyToPlay ? (
        <Wordle word={wordTypeForGame} />
      ) : (
        <ConfigureGame wordType={checkWordType} />
      )}
    </>
  );
};

export default App;
