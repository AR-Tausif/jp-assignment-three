export const formatTime = (date: Date) => {
  // format the time as "HH:MM"
  return date.toISOString().slice(11, 16);
};
