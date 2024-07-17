import useAuthStore from "../store/useAuthStore";
import Logout from "./Logout";

export default function NavBar() {
  const token = useAuthStore((state) => state.token);
  return (
    <>
      <header>
        <nav className="bg-gradient-to-r from-slate-300 to-blue-400 bg-opacity-5 rounded-b-xl mx-4">
          <div className="max-w-screen-xl flex flex-col md:flex-row items-center justify-between mx-auto p-4">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse mb-4 md:mb-0 order-1 md:order-1"
            >
              <span className="self-center text-xl md:text-2xl whitespace-nowrap text-blue-700 font-bold text-center md:text-left">
                Workout Notes
              </span>
            </a>
            <div className="order-2 md:order-2 flex flex-col md:flex-row items-center md:items-center gap-4">
              {token ? (
                <Logout />
              ) : (
                <div className="flex flex-col md:flex-row gap-4">
                  <a
                    href="/login"
                    className="transition transform hover:-translate-y-1 hover:scale-105"
                  >
                    <p className="px-3 py-1 md:px-4 md:py-2 text-base md:text-lg font-semibold text-blue-700 bg-white rounded-full shadow-md hover:bg-gray-100">
                      Login
                    </p>
                  </a>
                  <a
                    href="/signup"
                    className="transition transform hover:-translate-y-1 hover:scale-105"
                  >
                    <p className="px-3 py-1 md:px-4 md:py-2 text-base md:text-lg font-semibold text-blue-700 bg-white rounded-full shadow-md hover:bg-gray-100">
                      Signup
                    </p>
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
