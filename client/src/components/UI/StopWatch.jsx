import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const StopWatch = ({ isPlaying, catchMin, catchTime }) => {
  const [timer, setTimer] = useState(0);
  const [ten, setTen] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    if (timer % 10 === 0 && timer !== 0) {
      setTen((prev) => prev + 1);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, timer]);

  let count = timer % 10;

  useEffect(() => {
    catchMin(ten);
    if (ten === 6 && count === 0) {
      setTen(0);
    }
  }, [ten, catchMin, count]);

  useEffect(() => {
    catchTime(timer);
  }, [timer, catchTime]);

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
