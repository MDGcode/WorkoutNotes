import create from "zustand";
import axios from "axios";
import useAuthStore from "./useAuthStore"; // Import useAuthStore

interface Workout {
  _id: string;
  title: string;
  load: number;
  reps: number;
  createdAt: string;
  email: string;
}

interface WorkoutStore {
  workouts: Workout[] | null;
  fetchWorkouts: () => Promise<void>;
  addWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => Promise<void>;
}

const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: null,
  fetchWorkouts: async () => {
    const email = useAuthStore.getState().email; // Get email from useAuthStore
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/workouts/"
      );
      if (response.status === 200) {
        const filteredWorkouts = response.data.filter(
          (workout: Workout) => workout.email === email
        );
        set({ workouts: filteredWorkouts });
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  },
  addWorkout: (workout: Workout) => {
    set((state) => ({
      workouts: state.workouts ? [...state.workouts, workout] : [workout],
    }));
  },
  deleteWorkout: async (id: string) => {
    try {
      await axios.delete(import.meta.env.VITE_API_URL + "/api/workouts/" + id);
      set((state) => ({
        workouts: state.workouts
          ? state.workouts.filter((workout) => workout._id !== id)
          : null,
      }));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  },
}));

export default useWorkoutStore;
