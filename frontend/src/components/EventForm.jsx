import { useState } from "react";
import { saveEvents, getEvents } from "../utils/storage";
import format from "date-fns/format";

const EventForm = ({
  selectedDate,
  selectedEvent,
  setShowEventForm,
  currentDate,
}) => {
  const [title, setTitle] = useState(selectedEvent?.title || "");
  const [date, setDate] = useState(
    selectedEvent?.date || format(selectedDate || new Date(), "yyyy-MM-dd")
  );
  const [time, setTime] = useState(selectedEvent?.time || "12:00");
  const [description, setDescription] = useState(
    selectedEvent?.description || ""
  );
  const [color, setColor] = useState(selectedEvent?.color || "#4CAF50");
  const [recurrence, setRecurrence] = useState(
    selectedEvent?.recurrence || "none"
  );
  const [recurrenceEnd, setRecurrenceEnd] = useState(
    selectedEvent?.recurrenceEnd || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const events = getEvents();
    const eventData = {
      id: selectedEvent?.id || Date.now().toString(),
      title,
      date,
      time,
      description,
      color,
      recurrence,
      recurrenceEnd: recurrence !== "none" ? recurrenceEnd : null,
    };

    let updatedEvents;
    if (selectedEvent) {
      updatedEvents = events.map((event) =>
        event.id === selectedEvent.id ? eventData : event
      );
    } else {
      updatedEvents = [...events, eventData];
    }

    // Handle recurring events
    if (recurrence !== "none" && recurrenceEnd) {
      const startDate = new Date(date);
      const endDate = new Date(recurrenceEnd);
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        if (currentDate > startDate) {
          // Skip the first date (already added)
          const eventCopy = {
            ...eventData,
            id: `${eventData.id}-${currentDate.getTime()}`,
            date: format(currentDate, "yyyy-MM-dd"),
          };
          updatedEvents.push(eventCopy);
        }

        // Increment date based on recurrence
        if (recurrence === "daily") {
          currentDate.setDate(currentDate.getDate() + 1);
        } else if (recurrence === "weekly") {
          currentDate.setDate(currentDate.getDate() + 7);
        } else if (recurrence === "monthly") {
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      }
    }

    saveEvents(updatedEvents);
    setShowEventForm(false);
  };

  return (
    <div className="modal-overlay">
      <div className="event-form">
        <h2>{selectedEvent ? "Edit Event" : "Add Event"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Recurrence</label>
            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {recurrence !== "none" && (
            <div className="form-group">
              <label>Recurrence End Date</label>
              <input
                type="date"
                value={recurrenceEnd}
                onChange={(e) => setRecurrenceEnd(e.target.value)}
                min={date}
              />
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={() => setShowEventForm(false)}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
