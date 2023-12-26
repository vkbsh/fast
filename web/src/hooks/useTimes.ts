import { useState, useEffect } from "react";

export default function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => setSeconds((seconds) => seconds + 1),
      1000
    );

    if (isPaused) {
      return clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPaused]);

  const stopTimer = () => setPaused(true);

  return {
    seconds,
    isPaused,
    stopTimer,
  };
}
