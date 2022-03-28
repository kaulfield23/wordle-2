import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomText = styled((props) => <Typography {...props} />)(
  ({ theme }) => ({
    fontWeight: "bold",
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
  })
);
