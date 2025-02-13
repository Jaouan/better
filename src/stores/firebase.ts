import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE_APIKEY, FIREBASE_ID } from "@/constants";
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: `${FIREBASE_ID}.firebaseapp.com`,
  projectId: FIREBASE_ID,
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
