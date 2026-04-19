"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    background: {
      default: "#f6f3ee",
      paper: "#ffffff",
    },
    primary: {
      main: "#164b76",
    },
    secondary: {
      main: "#d86b2d",
    },
  },
});

export default theme;
