import { useEffect, useState } from "react";

type CountdownUntilProps = {
  time: number;
  onFinish: () => void;
};

export const CountdownUntil = ({ time, onFinish }: CountdownUntilProps) => {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (time < Date.now()) {
      setCountdown(null);
      return;
    }
    setCountdown(Math.round(Math.max(0, time - Date.now()) / 1000));
    const interval = setInterval(() => {
      setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (countdown === null || countdown > 0) return;
    onFinish();
  }, [countdown]);

  return `${countdown}s`;
};
