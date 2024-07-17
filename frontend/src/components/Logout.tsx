import useAuthStore from "../store/useAuthStore";

export default function Logout() {
  const logout = useAuthStore((state) => state.logout);

  const handleClick = () => {
    logout();
  };

  return (
    <button
      className="w-full md:w-auto px-4 duration-300 hover:scale-105 -translate-y-1 py-2 font-semibold text-blue-700 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={handleClick}
    >
      Logout
    </button>
  );
}
