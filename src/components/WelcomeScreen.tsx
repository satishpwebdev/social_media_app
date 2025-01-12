import { Link } from "react-router-dom";

const WelcomeScreen = () => {
  return (
    <>
      <div className="relative w-full" id="home">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-[#8e58b7]"></div>
        </div>
        <div>
          <div className="relative pt-6 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
              <h1 className="text-gray-900 dark:text-white font-bold text-3xl md:text-3xl xl:text-7xl">
                Sharing moments made
                <span className="text-primary"> simple</span>, always connected, perfectly synced.
              </h1>
              <p className="mt-6 text-gray-700 dark:text-gray-300">
                QuokkaShare is your ultimate companion for posting, commenting,
                and saving your favorite moments effortlessly. With real-time
                updates, seamless interaction, and personalized notifications,
                it keeps you connected with your friends and memories, all in
                one place. Share, engage, and keep your moments alive—on any
                device, anytime
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-y-4 gap-x-6">
                <Link
                  to="/login"
                  className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-base font-semibold text-white">
                    Get started
                  </span>
                </Link>
                <a
                  href="#"
                  className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                >
                  <span className="relative text-base font-semibold text-primary dark:text-white">
                    Learn more
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
