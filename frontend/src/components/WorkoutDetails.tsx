import { formatDistanceToNow } from "date-fns";
import useWorkoutStore from "../store/useWorkoutStore";
import { FaRegTrashAlt } from "react-icons/fa";

interface Workout {
  _id: string;
  title: string;
  load: number;
  reps: number;
  createdAt: string;
  // Add other properties as per your actual workout object structure
}

export default function WorkoutDetails({ workout }: { workout: Workout }) {
  const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout);

  const handleClick = async () => {
    try {
      await deleteWorkout(workout._id);
    } catch (err: unknown) {
      console.error("Error deleting workout:", err);
    }
  };

  return (
    <div className="p-4 align-baseline w-3/4 bg-gradient-to-r from-slate-100 border to-blue-300 rounded-2xl">
      <div className="flex justify-between items-center">
        <h4 className="md:text-2xl text-xl font-bold text-blue-600 pb-2">
          {workout.title}
        </h4>
        <button
          onClick={handleClick}
          className="cursor-pointer bg-white p-2 rounded-full md:text-xl"
        >
          <FaRegTrashAlt />
        </button>
      </div>
      <p className="md:text-lg pb-1"> Load (kg): {workout.load}</p>
      <p className="md:text-lg pb-1"> Reps: {workout.reps} </p>
      <p className="md:text-lg text-gray-800 opacity-80">
        {" "}
        {formatDistanceToNow(new Date(workout.createdAt), {
          addSuffix: true,
        })}{" "}
      </p>
    </div>
  );
}
