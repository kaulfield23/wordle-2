import { Typography, Button, Box } from "@mui/material";
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

export const CustomButton = styled((props) => <Button {...props} />)(
  ({ theme }) => ({
    width: "300px",
  })
);

export const CustomBox = styled((props) => <Box {...props} />)(({ theme }) => ({
  width: "55px",
  height: "55px",
  backgroundColor: "#b9b7b6",
  borderRadius: "12px",
  margin: "0 5px 10px 10px",
}));

export const CenterBox = styled((props) => <Box {...props} />)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const CenterHorizon = styled((props) => <Box {...props} />)(
  ({ theme }) => ({
    display: "flex",
    justifyContent: "center",
  })
);
