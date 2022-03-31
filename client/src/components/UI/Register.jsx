import React, { useState } from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { CustomButton, CustomText } from "./customMUI/CustomText";

const Register = ({ rightWord, giveBoxes, recordedTime, userId }) => {
  const [userName, setUserName] = useState("");

  const sendHighScore = async (e) => {
    e.preventDefault();

    if (e.type === "click") {
      const usersScore = {
        name: userName,
        playTime: { time: recordedTime.time, ten: recordedTime.tenOfMin },
      };
      await fetch(`/api/games/${userId}/highscore`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usersScore),
      });
      setUserName("");
    }
  };

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
      <Box
        sx={{
          textAlign: "center",
          m: "30px auto",
          backgroundColor: "#f8d486",

          p: 3,
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <h3>Register to highscore</h3>
        <Box
          component="form"
          sx={{
            display: "flex",
            justifyContent: "center",
            m: 2,
          }}
          noValidate
        >
          <TextField
            id="registerName"
            label="Enter your name"
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginRight: "10px",
            }}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            onKeyUp={sendHighScore}
          />
          <CustomButton
            type="submit"
            variant="contained"
            sx={{ width: "100px" }}
            onClick={sendHighScore}
          >
            <CustomText>Register</CustomText>
          </CustomButton>
        </Box>
      </Box>
    </>
  );
};

export default Register;
