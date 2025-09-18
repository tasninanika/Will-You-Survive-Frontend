import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Ocean from "../assets/ship.mp4";
import Audio from "../assets/titanic-theme.mp3";
import CartoonRight from "../assets/cartoon-right.json";
import CartoonLeft from "../assets/cartoon-right.json";
import CartoonBottom from "../assets/cartoon-right.json";

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

// Floating animation for cartoon
const floatVariants = {
  float: {
    y: [0, -10, 0],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
};

const HomePage = () => {
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
      <audio autoPlay loop>
        <source src={Audio} type="audio/mp3" />
      </audio>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

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
        {/* Right Bubble */}
        <motion.div
          className="absolute right-6 top-28 md:right-20 md:top-32 max-w-[300px] md:max-w-[360px]"
          variants={bubbleVariants(1)}
          initial="hidden"
          animate="visible"
        >
          <div className="relative p-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl">
            {/* Cartoon Man */}
            <motion.div
              className="absolute -bottom-16 right-4 w-16"
              variants={floatVariants}
              animate="float"
            >
              <Lottie animationData={CartoonRight} loop autoplay />
            </motion.div>

            <h2 className="text-white text-2xl md:text-3xl font-semibold">
              ❓ What do you think?
            </h2>
            <p className="text-white/80 mt-2 text-sm">
              Tilt your compass and take a guess, captain! 🧭
            </p>

            {/* Bubble tail */}
            <div className="absolute -bottom-3 right-10 w-6 h-6 bg-white/20 backdrop-blur-md border-b border-r border-white/30 rotate-45" />
          </div>
        </motion.div>

        {/* Left Bubble */}
        <motion.div
          className="absolute left-6 top-60 md:left-20 md:top-64 max-w-[320px] md:max-w-[420px]"
          variants={bubbleVariants(3)}
          initial="hidden"
          animate="visible"
        >
          <div className="relative p-6 bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl">
            <motion.div
              className="absolute -bottom-16 left-4 w-16"
              variants={floatVariants}
              animate="float"
            >
              <Lottie animationData={CartoonLeft} loop autoplay />
            </motion.div>

            <h2 className="text-white text-xl md:text-2xl font-bold">
              🧊 Will you survive if you were on the Titanic that day?
            </h2>
            <p className="text-white/80 mt-2 text-sm">
              Only the bravest sail through the iceberg night... 🌌
            </p>

            <div className="absolute -bottom-3 left-10 w-6 h-6 bg-white/15 backdrop-blur-md border-l border-b border-white/30 rotate-45" />
          </div>
        </motion.div>

        {/* Bottom-right CTA Bubble */}
        <motion.div
          className="absolute bottom-10 right-6 md:bottom-40 md:right-20 max-w-[340px]"
          variants={bubbleVariants(6)}
          initial="hidden"
          animate="visible"
        >
          <div className="relative p-6 bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl text-center">
            <motion.div
              className="absolute -bottom-16 right-10 w-16"
              variants={floatVariants}
              animate="float"
            >
              <Lottie animationData={CartoonBottom} loop autoplay />
            </motion.div>

            <h3 className="text-white text-xl font-bold">
              🚤 All Aboard the Lifeboat!
            </h3>
            <p className="text-white/80 text-sm mt-2">
              Think you can outsmart the iceberg? 😏
            </p>
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
            <div className="absolute -bottom-3 right-14 w-6 h-6 bg-purple-500/30 backdrop-blur-md border-r border-b border-white/30 rotate-45" />
          </div>
        </motion.div>
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
    </div>
  );
};

export default HomePage;
