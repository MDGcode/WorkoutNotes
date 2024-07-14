export default function NavBar() {
  return (
    <>
      <header>
        <nav className=" bg-gradient-to-r from-slate-300 to-blue-400 bg-opacity-5  rounded-b-xl mx-4  ">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center md:text-2xl text-xl whitespace-nowrap text-blue-700 font-bold ">
                Workout Notes
              </span>
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
