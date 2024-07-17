// useAuthStore.ts
import create from "zustand";
import axios from "axios";

interface AuthStore {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token"),
  login: async (email: string, password: string) => {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/user/login",
      { email, password }
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    set({ token });
  },
  signup: async (email: string, password: string) => {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/user/signup",
      { email, password }
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));

export default useAuthStore;
