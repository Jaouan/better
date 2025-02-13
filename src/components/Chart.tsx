import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { LAST_DAYS } from "@/constants";
import { useCountsStore } from "@/stores";

const twoDigits = (n: number) => n.toString().padStart(2, "0");

const toReadableDate = (date: Date) =>
  `${twoDigits(date.getDate())}/${twoDigits(date.getMonth() + 1)}`;

const getLastDays = (): string[] =>
  Array.from({ length: LAST_DAYS }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return toReadableDate(date);
  });

export const Chart = () => {
  const counts = useCountsStore(useShallow(({ counts }) => counts));

  const countsByDate = useMemo(
    () =>
      counts.reduce((acc, count) => {
        if (!count.createdAt) return acc;
        const date = new Date(count.createdAt);
        const dayKey = toReadableDate(date);
        acc[dayKey] = acc[dayKey] ?? 0;
        acc[dayKey] += count.count;
        return acc;
      }, {} as Record<string, number>),
    [counts]
  );

  const highest = useMemo(
    () => Math.max(10, ...Object.values(countsByDate)),
    [counts]
  );

  const lastDays = useMemo(() => getLastDays(), [new Date().getDay()]);

  return (
    <div className="flex flex-col gap-2 m-4">
      {lastDays.map((day) => (
        <div key={day} className="flex items-center w-full h-5">
          <span className="text-[0.6rem] text-base-content/80">{day}</span>
          <div
            className="transition-all m-2 rounded-bar bg-primary-content hover:bg-primary-content/80 flex justify-start items-center h-5 animate-bar"
            style={{
              width: `${
                (Math.max(0, countsByDate[day] ?? 0) / highest) * 100
              }%`,
            }}
          >
            <span className="m-1 text-[0.6rem] text-primary">
              {countsByDate[day]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
