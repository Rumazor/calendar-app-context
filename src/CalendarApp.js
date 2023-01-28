import React from "react";
import { AppRouter } from "./router/AppRouter";
import { CalendarProvider } from "./components/context/CalendarContext";

export const CalendarApp = () => {
  return (
    <CalendarProvider>
      <AppRouter />
    </CalendarProvider>
  );
};
