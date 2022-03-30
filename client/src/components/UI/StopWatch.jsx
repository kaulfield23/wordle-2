import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const StopWatch = ({ isPlaying, catchTime }) => {
  const [timer, setTimer] = useState(0);
  const [ten, setTen] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      catchTime({ time: timer, tenOfMin: ten });
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  let count = timer % 10;

  useEffect(() => {
    if (timer % 10 === 0 && timer !== 0) {
      setTen(ten + 1);
    }
    if (ten === 5 && count === 0) {
      setTen(0);
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
          {Math.floor((timer / 60) % 60)} min {ten}
          {("0" + (timer % 10)).slice(1)} sec
        </p>
      </Box>
    </>
  );
};

export default StopWatch;
