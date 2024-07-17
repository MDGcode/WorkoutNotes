import axios from "axios";
import { useState } from "react";
import useWorkoutStore from "../store/useWorkoutStore";
import useAuthStore from "../store/useAuthStore";
interface WorkoutFormProps {
  onClose: () => void;
}
export default function WorkoutForm({ onClose }: WorkoutFormProps) {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const email = useAuthStore((state) => state.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const workout = { title, load, reps, email };

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/workouts/",
        workout
      );
      console.log("Workout added:", response.data);
      addWorkout(response.data);
      // Optionally, reset the form after a successful submission
      setTitle("");
      setLoad("");
      setReps("");
      setError(null); // Clear any previous error
      onClose(); // Close the modal
    } catch (err: unknown) {
      console.error("Error adding workout:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:p-20">
      <h3 className="text-xl md:text-2xl font-bold">Add a new workout</h3>
      <label className="md:text-xl font-semibold">Exercise title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border p-2 rounded text-lg"
      />
      <label className="md:text-xl font-semibold">Exercise load:</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className="border p-2 rounded text-lg"
      />
      <label className="md:text-xl font-semibold">Exercise reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className="border p-2 rounded text-lg"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2  text-xl rounded-lg"
      >
        Add workout
      </button>
      {error && <div className="text-red-700">{error}</div>}
    </form>
  );
}
