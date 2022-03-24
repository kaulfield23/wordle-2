import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const menus = ["GAME", "HIGHSCORE", "INFO"];

const DrawerMUI = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor={"right"}
      >
        <List>
          {menus.map((menu, index) => {
            let newPath = menu.split(" ").join("-").toLowerCase();
            return (
              <ListItemButton onClick={() => setOpenDrawer(false)} key={index}>
                <ListItemIcon>
                  <Link to={`/${newPath}`}>
                    <ListItemText
                      primaryTypographyProps={{
                        color: "primary",
                        fontWeight: "bold",
                        fontFamily: "Nunito",
                        variant: "body2",
                        padding: "13px",
                      }}
                    >
                      {menu}
                    </ListItemText>
                  </Link>
                </ListItemIcon>
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerMUI;
