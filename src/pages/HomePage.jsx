import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background GIF / Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/ship-bg.mp4" type="video/mp4" />
      </video>

      {/* Titanic Song */}
      <audio autoPlay loop>
        <source src="/titanic-theme.mp3" type="audio/mp3" />
      </audio>

      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white space-y-8">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg animate-bounce">
          🚢 Titanic Challenge
        </h1>

        {/* First plakard */}
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-semibold">❓ What do you think?</h2>
        </div>

        {/* Second plakard */}
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl animate-pulse">
          <h2 className="text-4xl font-bold">⚡ Will You Survive?</h2>
        </div>

        {/* Button */}
        <Link
          to="/predict"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        >
          Start the Game 🎮
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
