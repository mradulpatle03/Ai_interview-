import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/auth/Profile";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
