import { Box } from "@mui/system";
import React from "react";
import { CenterBox } from "../UI/customMUI/CustomMUI";

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
            backgroundColor: "#ec8585",
            marginLeft: "8px",
            borderRadius: "12px",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          margin: "20px auto",
          textAlign: "center",
          p: 5,
          maxWidth: "500px",
        }}
      >
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </h3>
      </Box>
    </>
  );
};
export default Info;
