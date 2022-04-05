import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { CustomText, CustomButton } from "./customMUI/CustomMUI";
import React from "react";

const GiveUpMenu = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "300px",
          height: "90vh",
          margin: "0 auto",
        }}
      >
        <Link to="/">
          <CustomButton
            variant="contained"
            sx={{ backgroundColor: "#65c2a6" }}
            onClick={() => {
              window.location.reload();
            }}
          >
            <CustomText>Try a new game</CustomText>
          </CustomButton>
        </Link>
        <Link to="/highscore">
          <CustomButton variant="contained" color="secondary">
            <CustomText>Checkout highscores</CustomText>
          </CustomButton>
        </Link>
        <Link to="/info">
          <CustomButton variant="contained" sx={{ backgroundColor: "#f8d486" }}>
            <CustomText>Information about Wordle</CustomText>
          </CustomButton>
        </Link>
      </Box>
    </>
  );
};

export default GiveUpMenu;
