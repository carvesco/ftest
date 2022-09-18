import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Groups from "./pages/groups/groups";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a92c2c",
    },
    secondary: {
      main: "#b4e0e2",
      contrastText: "rgba(203,41,41,0.87)",
    },
    background: {
      default: "#e3595c",
      paper: "#2ca9a9",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b4e0e2",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#e3595c" },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/groups" element={<Groups />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
