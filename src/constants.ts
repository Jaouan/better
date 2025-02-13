export const COLLECTION = import.meta.env.VITE_COLLECTION ?? "counts";
export const WAIT_TIME_IN_MS =
  (import.meta.env.VITE_WAIT_TIME_IN_SECONDS ?? 60) * 1000;
export const LAST_DAYS = import.meta.env.VITE_LAST_DAYS ?? 30;

export const FIREBASE_ID = import.meta.env.VITE_FIREBASE_ID;
export const FIREBASE_APIKEY = import.meta.env.VITE_FIREBASE_APIKEY;
