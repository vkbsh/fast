export const formatSecondsToMinutes = (seconds: number): string => {
  if (!seconds) return "00:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes < 10 ? "0" : ""}${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
};
