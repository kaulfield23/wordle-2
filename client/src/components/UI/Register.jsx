import React from "react";
import { Box } from "@mui/system";

const Register = ({ rightWord, giveBoxes, recordedTime }) => {
  console.log(recordedTime, "recordedtime");
  return (
    <>
      <Box sx={{ textAlign: "center", m: 2 }}>
        <h1>🧁YOU WON !</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        className="correctBox"
      >
        {rightWord.map((item) => giveBoxes(item))}
      </Box>
    </>
  );
};

export default Register;
