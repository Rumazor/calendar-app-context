import React, { useContext } from "react";
import "../calendar/modal.css";
import { CalendarContext } from "../context/CalendarContext";
const DeleteEventFab = () => {
  const { calendarStateProvider } = useContext(CalendarContext);
  const { calendarState, setCalendarState } = calendarStateProvider;
  const { activeEvent } = calendarState;

  const handleDelete = () => {
    const updatedEvents = calendarState.events.filter(
      (event) => event.id !== activeEvent.id
    );
    setCalendarState({
      ...calendarState,
      events: updatedEvents,
      activeEvent: null,
    });
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger fab-danger">
      <i className="fas fa-trash pr-4"></i>
      <span>Borrar Evento</span>
    </button>
  );
};

export default DeleteEventFab;
