import { createContext, useState, useMemo, useContext } from "react";
import moment from "moment/moment";

export const CalendarContext = createContext(null);

export const CalendarProvider = ({ children }) => {
  // Initial State
  const [calendarState, setCalendarState] = useState({
    events: [
      {
        id: new Date().getTime(),
        title: "Cumpleaños",
        start: moment().toDate(),
        end: moment().add(2, "hours").toDate(),
        bgcolor: "#fafafa",
        notes: "comprar el pastel",
        user: {
          _id: "123",
          name: "Ruma",
        },
      },
    ],
    activeEvent: null,
  });

  const calendarStateProvider = useMemo(
    () => ({ calendarState, setCalendarState }),
    [calendarState, setCalendarState]
  );

  //Manage State Modal
  const [modal, setModal] = useState(false);
  const providerModal = useMemo(() => ({ modal, setModal }), [modal, setModal]);

  //Manage Actions

  console.log(calendarState);
  const value = {
    providerModal,
    calendarStateProvider,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalenderContext = () => useContext(CalendarContext);
