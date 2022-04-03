import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const HighscorePage = () => {
  const location = useLocation();
  const [body, setBody] = useState();
  let id;

  if (location.state) {
    id = location.state.playId;
  }
  useEffect(() => {
    const getHighScore = async () => {
      const response = await fetch(`/api/highscore/${id}`);
      const resBody = await response.text();
      setBody(resBody);
    };
    getHighScore();
  }, [id]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
};

export default HighscorePage;
