import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import DrawerMUI from "./DrawerMUI";

const MyTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  fontWeight: "bold",
  marginRight: theme.spacing(1),
  color: "white",
  fontFamily: "Nunito",
  "&:hover": {
    color: "primary",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#primary",
    fontWeight: "bold",
  },
}));
const menus = ["Game", "Highscore", "Info"];

const NavbarMUI = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar
        sx={{ backgroundColor: "#65c2a6" }}
        position="sticky"
        elevation={3}
      >
        <Toolbar>
          {isMobileSize ? (
            <>
              <Link to="/">
                <Typography
                  sx={{
                    marginLeft: "20px",
                    fontFamily: "Nunito",
                    fontWeight: "bold",
                    color: "#6d4c41",
                  }}
                >
                  Wordle
                </Typography>
              </Link>
              <DrawerMUI />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                value={value}
                onChange={(e, value) => setValue(value)}
                indicatorColor="primary"
                textColor="primary"
              >
                {menus.map((menu, index) => {
                  let newPath = menu.split(" ").join("-").toLowerCase();
                  return (
                    <MyTab
                      key={index}
                      label={menu}
                      to={`${newPath === "game" ? "/" : `/${newPath}`}`}
                      component={Link}
                    />
                  );
                })}
              </Tabs>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavbarMUI;
