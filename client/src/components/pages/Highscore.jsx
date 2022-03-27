import React, { useEffect } from "react";

const Highscore = () => {
  const callApi = async () => {
    const response = await fetch("/api/highscore");
    const body = await response.json();
    console.log(body, "hellooooo");
  };
  useEffect(() => {
    callApi();
  }, []);
  return <>body</>;
};

export default Highscore;
