import React from "react";
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
// import DrawerMUI from "./DrawerMUI";

// const MyTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
//   fontWeight: "bold",
//   marginRight: theme.spacing(1),
//   color: "white",
//   fontFamily: "Nunito",
//   "&:hover": {
//     color: "primary",
//     opacity: 1,
//   },
//   "&.Mui-selected": {
//     color: "#primary",
//     fontWeight: "bold",
//   },
// }));
// const menus = ["Game", "Highscore", "Info"];

const NavbarMUI = () => {
  // const [value, setValue] = useState(0);
  // const theme = useTheme();
  // const isMobileSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Link to="/" component={Link}>
        Game
      </Link>
      <a href="http://localhost:5080/api/highscores">Highscore</a>
      {/* <a href="http://localhost:5080/api/layouts/highscore">info</a> */}
    </>
  );
};

export default NavbarMUI;
