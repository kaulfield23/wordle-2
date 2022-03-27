import { Box } from "@mui/system";
import React from "react";

const Info = () => {
  return (
    <>
      <Box sx={{ marginTop: 5, textAlign: "center" }}>
        <h1>🧁wordle rules</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: 10,
          justifyContent: "center",
        }}
      >
        <h2>Correct word : </h2>
        <Box
          sx={{
            width: "35px",
            height: "35x",
            backgroundColor: "#65c2a6",
            marginLeft: "8px",
            borderRadius: "12px",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          m: 2,
        }}
      >
        <h2>Misplaced word : </h2>
        <Box
          sx={{
            width: "35px",
            height: "35x",
            backgroundColor: "#f8d486",
            marginLeft: "8px",
            borderRadius: "12px",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2>Incorrect word : </h2>
        <Box
          sx={{
            width: "35px",
            height: "35x",
            backgroundColor: "#f88e86",
            marginLeft: "8px",
            borderRadius: "12px",
          }}
        ></Box>
      </Box>
    </>
  );
};
export default Info;
