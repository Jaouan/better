import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti-boom";
import { WAIT_TIME_IN_MS } from "@/constants";
import { useCountsStore } from "@/stores";
import { CountdownUntil } from "./CountdownUntil";

const isButtonEnabled = (lastCountDate: number | null) =>
  lastCountDate !== null && Date.now() > lastCountDate + WAIT_TIME_IN_MS;

export const AddCountButton = () => {
  const { addCount, lastCountDate } = useCountsStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [enable, setEnable] = useState(() => isButtonEnabled(lastCountDate));

  useEffect(() => {
    setEnable(isButtonEnabled(lastCountDate));
  }, [lastCountDate]);

  if (lastCountDate === null) return null;

  return (
    <>
      <button
        ref={buttonRef}
        disabled={!enable}
        onClick={() => addCount(1)}
        className="select-none transition-all min-w-18 disabled:opacity-50 disabled:cursor-not-allowed flex p-3 font-bold items-center justify-center cursor-pointer bg-primary hover:bg-primary/80 text-primary-content rounded-full"
      >
        {enable ? (
          "+1€"
        ) : (
          <CountdownUntil
            time={lastCountDate + WAIT_TIME_IN_MS}
            onFinish={() => setEnable(true)}
          />
        )}
      </button>
      {buttonRef.current && !enable ? (
        <Confetti
          x={
            (buttonRef.current.offsetLeft + buttonRef.current.offsetWidth / 2) /
            window.innerWidth
          }
          y={
            (buttonRef.current.offsetTop + buttonRef.current.offsetHeight) /
            window.innerHeight
          }
        />
      ) : null}
    </>
  );
};
