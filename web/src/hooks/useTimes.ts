import { useState, useRef, useEffect, useCallback } from "react";

type Timer = ReturnType<typeof setInterval>;

export default function useTimer() {
  const intervalRef = useRef<Timer>();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(
      () => setSeconds((seconds) => seconds + 1),
      1000
    );

    return () => clearInterval(intervalRef.current);
  }, []);

  const stopTimer = useCallback(() => clearInterval(intervalRef.current), []);

  return {
    seconds,
    stopTimer,
  };
}
