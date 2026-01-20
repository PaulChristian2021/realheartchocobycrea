// ./theme.js
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // activates dark mode
    background: {
      default: "#121212", // primary background
      paper: "#1E1E1E", // secondary background for cards, sections
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0", // muted secondary text
    },
    primary: {
      main: "#FF6B6B", // accent for CTA buttons, links (soft Valentine red/pink)
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 500 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem", color: "#B0B0B0" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
  },
});

export default darkTheme;
