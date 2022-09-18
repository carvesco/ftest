import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Groups from "./pages/groups/groups";



function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/groups" element={<Groups />} />
      </Routes>
  );
}

export default App;
