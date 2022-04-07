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

  const userGaveUp = (value) => {
    if (value === true) {
      setIsReadyToPlay(false);
    }
  };
  return (
    <>
      {isReadyToPlay ? (
        <Wordle word={wordTypeForGame} gaveUp={userGaveUp} />
      ) : (
        <ConfigureGame wordType={checkWordType} />
      )}
    </>
  );
};

export default App;
