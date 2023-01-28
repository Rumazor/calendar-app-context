import React, { useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { CalendarContext } from "../context/CalendarContext";
import Modal from "react-modal";
import moment from "moment/moment";
import Swal from "sweetalert2";

import "./modal.css";

Modal.setAppElement("#root");

const nowMoment = moment().minutes(0).second(0).add(1, "hours");
const endMoment = nowMoment.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: nowMoment.toDate(),
  end: endMoment.toDate(),
};
export const CalendarModal = () => {
  const [dateStart, setDateStart] = useState(nowMoment.toDate());
  const [dateEnd, setDateEnd] = useState(endMoment.toDate());
  const [titleValit, setTitleValit] = useState(true);
  const { providerModal, calendarStateProvider } = useContext(CalendarContext);
  const { modal, setModal } = providerModal;
  const { setCalendarState, calendarState } = calendarStateProvider;

  const [formValues, setFormValues] = useState({
    ...initEvent,
  });
  const { notes, title, start, end } = formValues;

  const { activeEvent } = calendarState;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const newEvent = {
    ...formValues,
    id: new Date().getTime(),
    user: {
      _id: "1234",
      name: "Ruma",
    },
  };
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target?.name]: target?.value,
    });
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);

    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setDateEnd(e);

    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const closeModal = () => {
    setModal(false);
    setFormValues(initEvent);
    setCalendarState((prevState) => {
      return { ...prevState, activeEvent: null };
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire("Error", "La fecha fin debe ser mayor a la fecha inicio");
    } else if (title.trim().length < 3) {
      console.log(titleValit);
      return setTitleValit(false);
    }
    //TODO

    if (activeEvent) {
      const eventId = activeEvent.id;
      const updatedEvents = calendarState.events.map((event) => {
        if (event.id === eventId) {
          return { ...event, ...formValues };
        }
        return event;
      });
      return (
        setCalendarState({ ...calendarState, events: updatedEvents }),
        setTitleValit(true),
        closeModal()
      );
    } else {
      return (
        (setCalendarState({
          ...calendarState,
          events: [...calendarState.events, newEvent],
        }),
        setTitleValit(true)),
        closeModal()
      );
    }
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        closeTimeoutMS={200}
        onRequestClose={closeModal}
        className="modal-box md:w-[31.25rem]"
        overlayClassName="modal-fondo"
      >
        <h1 className="text-2xl font-semibold p-2">
          {" "}
          {activeEvent ? "Editar evento" : "Nuevo Evento"}{" "}
        </h1>
        <hr />
        <form onSubmit={handleSubmitForm} className="container">
          <div className="form-group my-2">
            <label>Fecha y hora inicio</label>
            <DateTimePicker
              className="form-control p-0 "
              onChange={handleStartDateChange}
              value={dateStart}
            />
          </div>

          <div className="form-group my-2">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              className="form-control p-0 "
              onChange={handleEndDateChange}
              value={dateEnd}
              minDate={dateStart}
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${!titleValit && "is-invalid"}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={title}
              onChange={handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={notes}
              onChange={handleInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn w-full mt-2 btn-outline-primary">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
