import { useEffect, useState } from "react";

type CountdownUntilProps = {
  time: number;
  onFinish: () => void;
};

export const CountdownUntil = ({ time, onFinish }: CountdownUntilProps) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  useEffect(() => {
    const tick = () => {
      const diff = time - Date.now();
      if (diff <= 0) {
        setSecondsLeft(0);
        onFinish();
      } else {
        setSecondsLeft(Math.ceil(diff / 1000));
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [time, onFinish]);

  return `${secondsLeft}s`;
};
