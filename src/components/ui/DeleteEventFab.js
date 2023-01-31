import React, { useContext } from "react";
import "../calendar/modal.css";
import { CalendarContext } from "../context/CalendarContext";
import Swal from "sweetalert2";
import { fetchconToken } from "../helpers/fetch";

const DeleteEventFab = () => {
  const { calendarStateProvider } = useContext(CalendarContext);
  const { calendarState, setCalendarState } = calendarStateProvider;
  const { activeEvent } = calendarState;
  const eventId = activeEvent.id;

  const handleDelete = async (eventId) => {
    try {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "No podras recuperar la nota luego de eliminarla",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, ¡Borrarla!",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await fetchconToken(`events/${eventId}`, {}, "DELETE");
          const body = await resp.json();

          Swal.fire("¡Borrada!", "Tu nota ha sido borrada", "success");

          if (body.ok) {
            const updatedEvents = calendarState.events.filter(
              (event) => event.id !== activeEvent.id
            );
            setCalendarState({
              ...calendarState,
              events: updatedEvents,
              activeEvent: null,
            });
          } else {
            Swal.fire("Error", body.msg, "error");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={() => handleDelete(eventId)}
      className="btn btn-danger fab-danger"
    >
      <i className="fas fa-trash pr-4"></i>
      <span>Borrar Evento</span>
    </button>
  );
};

export default DeleteEventFab;
