import { useEffect, useState } from "react";
import { format } from "date-fns";

interface TimerProps {
  startTime: Date;
  isRunning: boolean;
}

export function Timer({ startTime, isRunning }: TimerProps) {
  const [elapsed, setElapsed] = useState<string>("0:00");

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - startTime.getTime();
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setElapsed(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [startTime, isRunning]);

  return (
    <span className="text-sm font-mono">
      {elapsed}
    </span>
  );
}