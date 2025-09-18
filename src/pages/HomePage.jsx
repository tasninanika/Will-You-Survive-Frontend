import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Ocean from "../assets/ship.mp4";
import Audio from "../assets/titanic-theme.mp3";
import CartoonRight from "../assets/cartoon-right.json";
import CartoonLeft from "../assets/cartoon-right.json";
import CartoonBottom from "../assets/cartoon-right.json";
import { useEffect, useState } from "react";

// Popup animation variant
const bubbleVariants = (delay) => ({
  hidden: { scale: 0, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { delay, type: "spring", stiffness: 120, damping: 12 },
  },
});

// // Floating animation for cartoon
// const floatVariants = {
//   float: {
//     y: [0, -10, 0],
//     transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
//   },
// };

// Typing effect component
const TypingText = ({ text, speed = 50, onComplete }) => {
  const [displayed, setDisplayed] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setFinished(true);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete, finished]);

  return <p className="text-white/85 mt-2 text-sm font-mono">{displayed}</p>;
};

const HomePage = () => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [bubble1Visible, setBubble1Visible] = useState(false);
  const [bubble2Visible, setBubble2Visible] = useState(false);
  const [bubble3Visible, setBubble3Visible] = useState(false);
  const [bubble4Visible, setBubble4Visible] = useState(false);

  useEffect(() => {
    setBubble1Visible(true);
  }, []);

  useEffect(() => {
    const audio = document.getElementById("bg-audio");

    const handleFirstInteraction = () => {
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setMusicPlaying(true);
          setShowPopup(true);
        })
        .catch((err) => console.warn("Autoplay blocked:", err));
      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    return () => window.removeEventListener("click", handleFirstInteraction);
  }, []);

  const toggleMusic = () => {
    const audio = document.getElementById("bg-audio");
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.play().then(() => setMusicPlaying(true));
    }
  };
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={Ocean} type="video/mp4" />
      </video>

      {/* Titanic theme audio */}
      <audio id="bg-audio" autoPlay loop muted>
        <source src={Audio} type="audio/mp3" />
      </audio>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-indigo-900/30 to-black/70 backdrop-blur-xs" />

      {/* Title */}
      <div className="relative z-10 flex justify-center pt-16">
        <motion.h1
          className="text-center text-4xl md:text-6xl font-black text-white drop-shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          🚢 Titanic Challenge
        </motion.h1>
      </div>

      {/* Dream Bubbles */}
      <div className="relative z-10 h-full w-full">
        {/* Top Bubble */}
        {bubble1Visible && (
          <motion.div
            className="absolute top-20 left-1/2 -translate-x-1/2 max-w-[360px]"
            variants={bubbleVariants(0.2)}
            initial="hidden"
            animate="visible"
          >
            <div className="relative p-6 bg-gradient-to-br from-purple-500/20 to-indigo-500/10 backdrop-blur-md rounded-3xl shadow-lg text-center">
              <h2 className="text-white text-2xl font-bold">Hi Captain!</h2>
              <TypingText
                text="Ready for an Adventure? 🧭"
                onComplete={() => setBubble2Visible(true)}
              />
              <div className="absolute -bottom-2 right-10 w-6 h-6 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-tl-full rotate-45" />
            </div>
          </motion.div>
        )}

        {/* Left Bubble */}
        {bubble2Visible && (
          <motion.div
            className="absolute left-6 top-1/3 md:left-20 max-w-[360px]"
            variants={bubbleVariants(0.4)}
            initial="hidden"
            animate="visible"
          >
            <div className="relative p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-md rounded-3xl shadow-lg text-center">
              <h2 className="text-white text-lg font-bold">
                🌊 Iceberg Ahead!
              </h2>
              <TypingText
                text="Brace yourself captain, the night is dark... ❄️"
                onComplete={() => setBubble3Visible(true)}
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-500/20 backdrop-blur-md rotate-45" />
            </div>
          </motion.div>
        )}

        {/* Right Bubble */}
        {bubble3Visible && (
          <motion.div
            className="absolute right-6 top-1/2 md:right-20 max-w-[360px]"
            variants={bubbleVariants(0.6)}
            initial="hidden"
            animate="visible"
          >
            <div className="relative p-6 bg-gradient-to-br from-cyan-400/20 to-indigo-700/10 backdrop-blur-md rounded-3xl shadow-lg">
              <h2 className="text-white text-xl font-bold">
                🧊 Will you survive if you were on the Titanic that day?
              </h2>
              <TypingText
                text="Don’t let the penguins laugh at us... 🌌"
                onComplete={() => setBubble4Visible(true)}
              />
              <div className="absolute -bottom-5 left-10 w-8 h-5 bg-gradient-to-br from-cyan-400/30 to-blue-500/20 rounded-tr-full rotate-45" />
            </div>
          </motion.div>
        )}

        {/* Bottom CTA Bubble */}
        {bubble4Visible && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 max-w-[420px]"
            variants={bubbleVariants(0.8)}
            initial="hidden"
            animate="visible"
          >
            <div className="relative p-6 bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-md rounded-3xl shadow-lg text-center">
              <h3 className="text-white text-xl font-bold">
                🚤 All Aboard the Lifeboat!
              </h3>
              <TypingText text="Outsmart the iceberg and survive! 😏" />
              <div className="mt-4">
                <Link
                  to="/player"
                  className="btn btn-primary w-full font-bold tracking-wide bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 text-white border-0 shadow-xl hover:scale-105 transition-transform duration-300"
                >
                  Start the Game 🎮
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Center helper pulse */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </motion.div>
      {/* Music Toggle Pop-up */}
      {showPopup && (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          className="fixed bottom-6 left-6 z-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg flex items-center gap-3 px-4 py-2"
        >
          <button
            onClick={toggleMusic}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              musicPlaying
                ? " bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 border-0 text-white"
                : "bg-pink-500/70 hover:bg-pink-500/90 text-white"
            }`}
          >
            {musicPlaying ? "🔊 On" : "🔇 Off"}
          </button>
          <span className="text-white text-sm">Titanic Theme</span>
        </motion.div>
      )}

      {/* Center helper pulse */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </motion.div>
    </div>
  );
};

export default HomePage;
