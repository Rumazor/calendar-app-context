import React, { useState, useContext, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import { NavbarUI } from "../ui/NavbarUI";
import { messages } from "../helpers/calendar-messages";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarContext } from "../context/CalendarContext";
import { AddFab } from "../ui/AddFab";
import DeleteEventFab from "../ui/DeleteEventFab";
import { fetchconToken } from "../helpers/fetch";
import { stringToDateFunction } from "../helpers/stringToDate";
import { AuthContext } from "../context/AuthContext";

moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const { providerModal, calendarStateProvider } = useContext(CalendarContext);
  const { authStateProvider } = useContext(AuthContext);
  const { auth } = authStateProvider;
  const { setModal, modal } = providerModal;
  const { setCalendarState, calendarState } = calendarStateProvider;

  const { activeEvent } = calendarState;
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const startLoadingEvent = async () => {
    try {
      const resp = await fetchconToken("events");
      const body = await resp.json();
      const events = stringToDateFunction(body.events);

      setCalendarState({
        ...calendarState,
        events: [...events],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDobleClick = (e) => {
    setModal(!modal);
  };
  const onSelectEvent = (e) => {
    setCalendarState({
      ...calendarState,
      activeEvent: e,
    });
  };
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    console.log(e);
    setCalendarState({
      ...calendarState,
      activeEvent: null,
    });
  };
  const evenStyleGetter = (event, start, end, isSelected) => {
    const { uid } = auth;

    const style = {
      backgroundColor: uid === event?.user?._id ? "#367CF7" : "#464660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return { style };
  };

  useEffect(() => {
    startLoadingEvent();
  }, []);
  return (
    <>
      <div className=" min-h-screen  font-Roboto">
        <NavbarUI />

        <Calendar
          className="p-8 flex flex-col min-h-screen"
          localizer={localizer}
          events={calendarState.events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={evenStyleGetter}
          onDoubleClickEvent={onDobleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          view={lastView}
          onSelectSlot={onSelectSlot}
          selectable={true}
          components={{
            event: CalendarEvent,
          }}
        />
        <AddFab />
        {activeEvent && <DeleteEventFab />}
        <CalendarModal />
      </div>
    </>
  );
};
