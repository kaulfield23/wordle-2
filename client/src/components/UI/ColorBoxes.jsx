import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { CustomBox, CustomText } from "./customMUI/CustomMUI";

const ColorBoxes = ({ item }) => {
  const [width, setWidth] = useState();
  let boxSize;

  useEffect(() => {
    function handleSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleSize);
    handleSize();

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [setWidth]);

  if (width <= 700) {
    boxSize = `45px`;
  }

  console.log("color boxes");
  if (item.result === "Correct") {
    return (
      <CustomBox
        sx={{
          backgroundColor: "#65c2a6",
          width: `${boxSize}`,
          height: `${boxSize}`,
        }}
      >
        <Box sx={{ position: "relative", top: "30%" }}>
          <CustomText>{item.letter}</CustomText>
        </Box>
      </CustomBox>
    );
  } else if (item.result === "Misplaced") {
    return (
      <CustomBox
        sx={{
          backgroundColor: "#f8d486",
          width: `${boxSize}`,
          height: `${boxSize}`,
        }}
      >
        <Box sx={{ position: "relative", top: "30%" }}>
          <CustomText>{item.letter}</CustomText>
        </Box>
      </CustomBox>
    );
  } else {
    return (
      <CustomBox
        sx={{
          backgroundColor: "#ec8585",
          width: `${boxSize}`,
          height: `${boxSize}`,
        }}
      >
        <Box sx={{ position: "relative", top: "30%" }}>
          <CustomText>{item?.letter}</CustomText>
        </Box>
      </CustomBox>
    );
  }
};

export default ColorBoxes;
