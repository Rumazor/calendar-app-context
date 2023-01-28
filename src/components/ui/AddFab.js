import React, { useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";
import "../calendar/modal.css";

export const AddFab = () => {
  const { providerModal } = useContext(CalendarContext);
  const { setModal } = providerModal;

  const handleFab = () => {
    setModal(true);
  };

  return (
    <button onClick={handleFab} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
    </button>
  );
};
