import { useState } from "react";
import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";
import "./styles.css";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="app">
      <h1>Event Calendar</h1>
      <Calendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        setShowEventForm={setShowEventForm}
        setSelectedEvent={setSelectedEvent}
        setSelectedDate={setSelectedDate}
        selectedEvent={selectedEvent}
      />

      {showEventForm && (
        <EventForm
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          setShowEventForm={setShowEventForm}
          currentDate={currentDate}
        />
      )}
    </div>
  );
}

export default App;
