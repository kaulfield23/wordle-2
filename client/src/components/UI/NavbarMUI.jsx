import React from "react";
import { CenterBox, CustomText } from "./customMUI/CustomMUI";

const NavbarMUI = () => {
  const id = localStorage.getItem("userId");
  return (
    <>
      <CenterBox sx={{ backgroundColor: "#65c2a6" }}>
        <a href="/">
          <CustomText sx={{ m: 3, fontSize: "20px" }}>Home</CustomText>
        </a>
        <a href={`/highscores?id=${id}`}>
          <CustomText sx={{ m: 3, fontSize: "20px" }}>Highscore</CustomText>
        </a>
        <a href="/info">
          <CustomText sx={{ m: 3, fontSize: "20px" }}>Info</CustomText>
        </a>
      </CenterBox>
    </>
  );
};

export default NavbarMUI;
