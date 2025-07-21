import { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
} from "date-fns";
import { getEvents, saveEvents } from "../utils/storage";
import EventModal from "./EventModal";

const Calendar = ({
  currentDate,
  setCurrentDate,
  setShowEventForm,
  setSelectedEvent,
  setSelectedDate,
}) => {
  const [events, setEvents] = useState([]);
  const [modalEvent, setModalEvent] = useState(null);

  useEffect(() => {
    const storedEvents = getEvents();
    setEvents(storedEvents);
  }, [currentDate]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = getDay(monthStart);
  const emptyStartDays = Array.from({ length: startDay }).map((_, index) => (
    <div key={`empty-${index}`} className="calendar-day empty"></div>
  ));

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setSelectedEvent(null);
    setShowEventForm(true);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setModalEvent(event);
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    saveEvents(updatedEvents);
    setEvents(updatedEvents);
    setModalEvent(null);
  };

  const getEventsForDay = (day) => {
    return events.filter((event) => isSameDay(new Date(event.date), day));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt; Prev</button>
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={nextMonth}>Next &gt;</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}

        {emptyStartDays}

        {monthDays.map((day) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div
              key={day.toString()}
              className={`calendar-day ${
                !isSameMonth(day, currentDate) ? "other-month" : ""
              } ${isSameDay(day, new Date()) ? "today" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              <div className="day-number">{format(day, "d")}</div>
              <div className="day-events">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="event"
                    style={{ backgroundColor: event.color || "#4CAF50" }}
                    onClick={(e) => handleEventClick(event, e)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {modalEvent && (
        <EventModal
          event={modalEvent}
          onClose={() => setModalEvent(null)}
          onDelete={deleteEvent}
          onEdit={() => {
            setSelectedEvent(modalEvent);
            setShowEventForm(true);
            setModalEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default Calendar;
