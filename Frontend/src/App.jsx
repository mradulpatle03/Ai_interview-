import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/auth/Profile";
import QuizPage from "./pages/QuizPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthTimer } from "./hooks/useAuthTimer";

function App() {
  const token = useSelector((state) => state.auth.token);

  // Auto-logout when token expires
  useAuthTimer(token);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />

          {/* Default route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
