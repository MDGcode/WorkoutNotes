import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import useWorkoutStore from "../store/useWorkoutStore";
import WorkoutForm from "../components/WorkoutForm";
import ProtectedRoute from "../components/ProtectedRoute";

const Home: React.FC = () => {
  const { workouts, fetchWorkouts } = useWorkoutStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <ProtectedRoute>
      <div className="grid place-items-center gap-2 mt-16">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <button
        onClick={openModal}
        className="fixed bottom-6 md:text-2xl right-4 bg-blue-500 text-white rounded-full px-4 py-2"
      >
        Add new workout +
      </button>
      {modalIsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-transparent border-none text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>
            <WorkoutForm onClose={closeModal} />
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default Home;
