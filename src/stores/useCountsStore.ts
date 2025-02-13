import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { create } from "zustand/react";
import { app, auth } from "./firebase";
import { COLLECTION } from "@/constants";

const db = getFirestore(app);
const collectionRef = collection(db, COLLECTION);

type Count = {
  user: string;
  count: number;
  createdAt: number;
};

type CountState = {
  lastCountDate: number | null;
  counts: Count[];
  refresh: () => Promise<void>;
  addCount: (count: number) => void;
};

export const useCountsStore = create<CountState>((set, get) => ({
  lastCountDate: null,
  counts: [],
  refresh: async () => {
    const querySnapshot = await getDocs(collectionRef);
    const counts = querySnapshot.docs
      .map((doc) => doc.data() as Count)
      .filter((doc) => doc.createdAt > 0);
    const lastCountDate = counts.reduce(
      (acc, doc) => Math.max(acc, doc.createdAt),
      0
    );
    set({
      counts,
      lastCountDate,
    });
  },
  addCount: async (count: number) => {
    const { counts, lastCountDate } = get();
    const newCount = {
      count,
      createdAt: Date.now(),
      user: auth.currentUser?.email ?? "?",
    };
    set(({ counts }: CountState) => ({
      counts: [newCount, ...counts],
      lastCountDate: Date.now(),
    }));
    try {
      await addDoc(collectionRef, newCount);
    } catch (error) {
      console.error("Add count error", error);
      set({ counts, lastCountDate });
    }
  },
}));

onSnapshot(collectionRef, () => useCountsStore.getState().refresh());
