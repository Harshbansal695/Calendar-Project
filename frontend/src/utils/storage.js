export const getEvents = () => {
  const events = localStorage.getItem("calendarEvents");
  return events ? JSON.parse(events) : [];
};

export const saveEvents = (events) => {
  localStorage.setItem("calendarEvents", JSON.stringify(events));
};
