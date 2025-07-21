import { format, parseISO } from "date-fns";

export const formatDate = (dateString) => {
  return format(parseISO(dateString), "MMMM d, yyyy");
};

export const formatTime = (timeString) => {
  return format(new Date(`2000-01-01T${timeString}`), "h:mm a");
};
