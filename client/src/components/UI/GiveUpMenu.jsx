import { Box } from "@mui/system";
import { CustomText, CustomButton } from "./customMUI/CustomMUI";
import React, { useState, useEffect } from "react";

const GiveUpMenu = ({ userGaveUp }) => {
  const [giveUp, setGiveUp] = useState(false);

  useEffect(() => {
    userGaveUp(giveUp);
  }, [giveUp, userGaveUp]);

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
        <CustomButton
          variant="contained"
          sx={{ backgroundColor: "#65c2a6" }}
          onClick={() => setGiveUp(!giveUp)}
        >
          <CustomText>Try a new game</CustomText>
        </CustomButton>

        <CustomButton variant="contained" color="secondary">
          <a href="http://localhost:5080/highscores">
            <CustomText>Checkout highscores</CustomText>
          </a>
        </CustomButton>

        <CustomButton variant="contained" sx={{ backgroundColor: "#f8d486" }}>
          <CustomText>Information about Wordle</CustomText>
        </CustomButton>
      </Box>
    </>
  );
};

export default GiveUpMenu;
