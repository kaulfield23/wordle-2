import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const StopWatch = ({ isPlaying }) => {
  const [timer, setTimer] = useState(0);
  const [sixty, setSixty] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  let count = timer % 10;

  useEffect(() => {
    if (timer % 10 === 0 && timer !== 0) {
      setSixty(sixty + 1);
    }
    if (sixty === 5 && count === 0) {
      setSixty(0);
    }
  }, [count]);

  return (
    <>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "25px",
          textAlign: "center",
          color: "brown",
          m: 8,
        }}
      >
        <p>
          {Math.floor((timer / 60) % 60)} min {sixty}
          {("0" + (timer % 10)).slice(1)} sec
        </p>
      </Box>
    </>
  );
};

export default StopWatch;
