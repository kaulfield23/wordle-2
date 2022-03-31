import { Box } from "@mui/system";
import React from "react";
import { CustomBox, CustomText } from "./customMUI/CustomText";

const giveColorBoxes = (item) => {
  if (item.result === "Correct") {
    return (
      <CustomBox sx={{ backgroundColor: "#65c2a6" }}>
        <Box sx={{ position: "relative", top: "30%" }}>
          <CustomText>{item.letter}</CustomText>
        </Box>
      </CustomBox>
    );
  } else if (item.result === "Misplaced") {
    return (
      <CustomBox sx={{ backgroundColor: "#f8d486" }}>
        <Box sx={{ position: "relative", top: "30%" }}>
          <CustomText>{item.letter}</CustomText>
        </Box>
      </CustomBox>
    );
  } else {
    return (
      <CustomBox sx={{ backgroundColor: "#ec8585" }}>
        <Box sx={{ position: "relative", top: "30%" }}>
          <CustomText>{item.letter}</CustomText>
        </Box>
      </CustomBox>
    );
  }
};

export default giveColorBoxes;
