import { createContext, useState, useMemo, useContext } from "react";

export const CalendarContext = createContext(null);

// {
//         id: asdasdasd,
//         title: "Cumpleaños",
//         start: moment().toDate(),
//         end: moment().add(2, "hours").toDate(),
//         notes: "comprar el pastel",
//         user: {
//           _id: "123",
//           name: "Ruma",
//         },
//       },

export const CalendarProvider = ({ children }) => {
  // Initial State
  const [calendarState, setCalendarState] = useState({
    events: [],
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
