import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CalendarScreen } from "./../components/calendar/CalendarScreen";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

export const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route index path="/" element={<CalendarScreen />} />
          <Route path="*" element={<LoginScreen />} />
          {/* <Navigate replace to="/" /> */}
        </Routes>
      </Router>
    </>
  );
};
