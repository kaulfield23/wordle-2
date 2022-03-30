import React, { useEffect, useState } from "react";

const HighscorePage = () => {
  const [body, setBody] = useState();
  const getHighScore = async () => {
    const response = await fetch("/api/highscore");
    const resBody = await response.text();
    setBody(resBody);
  };
  useEffect(() => {
    getHighScore();
  }, []);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
};

export default HighscorePage;
