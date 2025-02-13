import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { useCountsStore } from "@/stores";

export const Sum = () => {
  const counts = useCountsStore(useShallow(({ counts }) => counts));
  const sum = useMemo(
    () => counts.reduce((acc, count) => acc + count.count, 0),
    [counts]
  );

  return (
    <div className="flex items-center gap-1">
      <span className="text-2xl font-bold">{sum}</span>
      <span className="text-2xl text-base-content/70">€</span>
    </div>
  );
};
