// useAuthStore.ts
import create from "zustand";
import axios from "axios";

interface AuthStore {
  token: string | null;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  login: async (email: string, password: string) => {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/user/login",
      { email, password }
    );
    const token = response.data.token;
    const storedEmail = response.data.email;
    localStorage.setItem("token", token);
    localStorage.setItem("email", storedEmail);
    set({ token, email: storedEmail });
  },
  signup: async (email: string, password: string) => {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/user/signup",
      { email, password }
    );
    const token = response.data.token;
    const storedEmail = response.data.email;
    localStorage.setItem("token", token);
    localStorage.setItem("email", storedEmail);
    set({ token, email: storedEmail });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    set({ token: null, email: null });
  },
}));

export default useAuthStore;
