import React from "react";
import { AppRouter } from "./router/AppRouter";
import { CalendarProvider } from "./components/context/CalendarContext";
import { AuthProvider } from "./components/context/AuthContext";

export const CalendarApp = () => {
  return (
    <AuthProvider>
      <CalendarProvider>
        <AppRouter />
      </CalendarProvider>
    </AuthProvider>
  );
};
