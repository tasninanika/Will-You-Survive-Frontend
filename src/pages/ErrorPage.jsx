import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Ocean from "../assets/ship.mp4";
import Audio from "../assets/titanic-theme.mp3";
import CartoonRight from "../assets/cartoon-right.json";
import CartoonLeft from "../assets/cartoon-right.json";
import CartoonBottom from "../assets/cartoon-right.json";
import { useEffect, useState } from "react";

// Bubble animation variant
const bubbleVariants = (delay = 0) => ({
  hidden: { scale: 0, opacity: 0, y: 30 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { delay, type: "spring", stiffness: 120, damping: 12 },
  },
});

// Floating animation for cartoon
const floatVariants = {
  float: {
    y: [0, -10, 0],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
};

// Typing effect component
const TypingText = ({ text, speed = 50 }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <p className="text-white/85 mt-2 text-sm font-mono">{displayed}</p>;
};

const ErrorPage = () => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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

      {/* Audio */}
      <audio id="bg-audio" autoPlay loop muted>
        <source src={Audio} type="audio/mp3" />
      </audio>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-indigo-900/30 to-black/70 backdrop-blur-sm" />

      {/* Title */}
      <div className="relative z-10 flex justify-center pt-16">
        <motion.h1
          className="text-center text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl tracking-wide"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          🚢 Titanic Challenge
        </motion.h1>
      </div>

      {/* Dreamy Chat Bubbles */}
      <div className="relative z-10 h-full w-full">
        {/* Right Bubble */}
        <motion.div
          className="absolute right-6 top-28 md:right-20 md:top-32 max-w-[320px] md:max-w-[360px]"
          variants={bubbleVariants(0.2)}
          initial="hidden"
          animate="visible"
        >
          <div className="relative p-6 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-indigo-500/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_0_60px_5px_rgba(255,255,255,0.15)]">
            <motion.div
              className="absolute -bottom-20 right-4 w-16"
              variants={floatVariants}
              animate="float"
            >
              <Lottie animationData={CartoonRight} loop autoplay />
            </motion.div>
            <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow-md">
              👋 Hi Captain!
            </h2>
            <TypingText text="Ready for an iceberg adventure? 🧭" />
            <div className="absolute -bottom-5 right-10 w-8 h-5 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-tl-full rotate-45" />
          </div>
        </motion.div>

        {/* Left Bubble */}
        <motion.div
          className="absolute left-6 top-60 md:left-20 md:top-64 max-w-[320px] md:max-w-[420px]"
          variants={bubbleVariants(0.8)}
          initial="hidden"
          animate="visible"
        >
          <div className="relative p-6 bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-indigo-700/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_0_50px_5px_rgba(0,255,255,0.15)]">
            <motion.div
              className="absolute -bottom-24 left-3 w-20"
              variants={floatVariants}
              animate="float"
            >
              <Lottie animationData={CartoonLeft} loop autoplay />
            </motion.div>
            <h2 className="text-white text-xl md:text-2xl font-bold drop-shadow-md">
              🧊 Will you survive the iceberg night?
            </h2>
            <TypingText text="Only the bravest sail! 🌌" />
            <div className="absolute -bottom-5 left-10 w-8 h-5 bg-gradient-to-br from-cyan-400/30 to-blue-500/20 rounded-tr-full rotate-45" />
          </div>
        </motion.div>

        {/* Bottom-right CTA Bubble */}
        <motion.div
          className="absolute bottom-10 right-6 md:bottom-40 md:right-20 max-w-[340px]"
          variants={bubbleVariants(1.2)}
          initial="hidden"
          animate="visible"
        >
          <div className="relative p-6 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_0_70px_5px_rgba(255,192,203,0.15)] text-center">
            <motion.div
              className="absolute -bottom-20 right-10 w-16"
              variants={floatVariants}
              animate="float"
            >
              <Lottie animationData={CartoonBottom} loop autoplay />
            </motion.div>
            <h3 className="text-white text-xl font-bold drop-shadow-md">
              🚤 All Aboard the Lifeboat!
            </h3>
            <TypingText text="Outsmart the iceberg and survive! 😏" />
            <div className="mt-4">
              <Link
                to="/player"
                className="btn btn-primary w-full normal-case font-bold tracking-wide
                           bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600
                           hover:from-pink-400 hover:via-fuchsia-500 hover:to-purple-500
                           text-white border-0 shadow-xl
                           transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                Start the Game 🎮
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
