import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { CustomText, CustomButton } from "../UI/customMUI/CustomText.jsx";
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
        <Link to="/highscore">
          <CustomButton variant="contained" color="secondary">
            <CustomText>Checkout highscores</CustomText>
          </CustomButton>
        </Link>
        <Link to="/info">
          <CustomButton variant="contained">
            <CustomText>Information about Wordle</CustomText>
          </CustomButton>
        </Link>
      </Box>
    </>
  );
};

export default GiveUpMenu;
