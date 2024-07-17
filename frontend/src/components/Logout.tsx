import useAuthStore from "../store/useAuthStore";

export default function Logout() {
  const logout = useAuthStore((state) => state.logout);
  const handleClick = () => {
    logout();
  };
  return (
    <button
      className="md:p-4 bg-white rounded-full font-semibold md:text-base text-xs p-2 "
      onClick={handleClick}
    >
      Logout
    </button>
  );
}
