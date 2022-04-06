import React, { useState } from "react";
import { Box } from "@mui/system";
import { TextField, Zoom } from "@mui/material";
import {
  CustomButton,
  CustomText,
  CenterBox,
  CenterHorizon,
} from "../UI/customMUI/CustomMUI";
import ColorBoxes from "../UI/ColorBoxes";
import { Link } from "react-router-dom";

const Register = ({ rightWord, recordedTime, userId }) => {
  const [userName, setUserName] = useState("");
  const [registered, setRegistered] = useState(false);
  const [boxAnimation, setBoxAnimation] = useState(false);

  const sendHighScore = async (e) => {
    e.preventDefault();

    if (e.type === "click") {
      if (userName.length >= 8) {
        alert(`Type less than 8 characters for the name`);
        return;
      }
      const usersScore = {
        name: userName.toUpperCase(),
        playTime: { time: recordedTime.time, ten: recordedTime.ten },
      };
      await fetch(`/api/games/${userId}/highscore`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usersScore),
      });
      setUserName("");
      setRegistered(true);
      setBoxAnimation(true);
    }
  };

  return (
    <>
      {!registered ? (
        <>
          <Box sx={{ textAlign: "center", m: 2 }}>
            <h1>🧁YOU WON !</h1>
          </Box>
          <CenterBox
            sx={{
              textAlign: "center",
            }}
            className="correctBox"
          >
            {rightWord.map((item, idx) => (
              <ColorBoxes item={item} key={idx} />
            ))}
          </CenterBox>
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
            <CenterHorizon
              component="form"
              sx={{
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
            </CenterHorizon>
          </Box>
        </>
      ) : (
        <CenterBox>
          <Zoom in={boxAnimation}>
            <Box
              sx={{
                padding: "100px 40px",
                borderRadius: "10px",
                margin: "10px",
                backgroundColor: "pink",
                maxWidth: "500px",
              }}
            >
              <Link to="/highscore" state={{ playId: userId }}>
                <Box textAlign="center">
                  <h1>Registered!</h1>
                </Box>
                <CustomButton variant="contained" sx={{ m: 2 }}>
                  <CustomText>Check out my rank</CustomText>
                </CustomButton>
              </Link>
            </Box>
          </Zoom>
        </CenterBox>
      )}
    </>
  );
};

export default Register;
