import moment from "moment/moment";

export const stringToDateFunction = (events = []) => {
  return events.map((event) => {
    return {
      ...event,
      end: moment(event.end).toDate(),
      start: moment(event.start).toDate(),
    };
  });
};
