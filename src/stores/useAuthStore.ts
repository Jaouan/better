import { create } from "zustand";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

type AuthState = {
  user: User | null;
  loading: boolean;
  restricted: boolean | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: any) => void;
};

const provider = new GoogleAuthProvider();

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  restricted: null,

  login: async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      set({ user: result.user, loading: false, restricted: false });
    } catch (error) {
      console.error("Login error:", error);
      set({
        loading: false,
        restricted:
          (error as { code: string }).code ===
          "auth/admin-restricted-operation",
      });
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  setUser: (user) => set({ user, loading: false }),
}));

onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});
