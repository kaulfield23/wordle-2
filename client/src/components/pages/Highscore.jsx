import React, { useEffect } from "react";

const Highscore = () => {
  const getHighScore = async () => {
    const response = await fetch("/api/highscore");
    const body = await response.json();
    console.log(body, "hellooooo");
  };
  useEffect(() => {
    getHighScore();
  }, []);
  return <>body</>;
};

export default Highscore;
