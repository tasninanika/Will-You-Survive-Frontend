import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const ResultCard = ({ result }) => {
  // Ensure result exists to avoid accessing undefined properties
  if (!result) {
    return (
      <div className="text-white text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg max-w-md mx-auto mt-24">
        No result available
      </div>
    );
  }

  const isSurvived = result.Survived === 1;
  const [showConfetti, setShowConfetti] = useState(isSurvived);

  // Stop confetti after 6 seconds
  useEffect(() => {
    if (isSurvived) {
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isSurvived]);

  // Arrays of varied survival and non-survival messages
  const survivalMessages = [
    "Tumi borolok, taka ache, tai beche gecho! 🚢",
    "Aha! Tumi to Titanic-er hero, beche gecho! 🎉",
    "Tumi jhorer mawkhomukhi, beche gecho! 🛳️",
    "Taka na thakleo, tumi luck diye beche gecho! 😎",
    "Titanic bolche, tumi ekta legend, beche gecho! 🌟",
  ];

  const nonSurvivalMessages = [
    result.name
      ? `${result.name}, Titanic-er iceberg tomar kotha mone rakhbe. 😔`
      : "Titanic-er iceberg ekti asamanya baktir kotha mone rakhbe. 😔",
    result.name
      ? `${result.name}, iceberg-er sathe dance korte gele keno? 😢`
      : "Ek asamanya bakti, iceberg-er sathe dance korte geche! 😢",
    result.name
      ? `${result.name}, Titanic bolche, abar try koro! 🪦`
      : "Ek asamanya bakti, Titanic bolche, abar try koro! 🪦",
    result.name
      ? `${result.name}, iceberg toke ekta valobashar patro likhbe! 😞`
      : "Iceberg ek asamanya baktir jonno patro likhbe! 😞",
    result.name
      ? `${result.name}, Titanic-er pani tomar jonno thanda chilo na? 😔`
      : "Ek asamanya bakti, Titanic-er thanda pani te dublo! 😔",
  ];

  // Randomly select a message
  const randomMessage = isSurvived
    ? survivalMessages[Math.floor(Math.random() * survivalMessages.length)]
    : nonSurvivalMessages[
        Math.floor(Math.random() * nonSurvivalMessages.length)
      ];

  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, scale: isSurvived ? 0.7 : 1, y: isSurvived ? 0 : 60 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Animation for image
  const imageVariants = {
    hidden: { scale: 0, rotate: isSurvived ? -20 : 0 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { delay: 0.3, type: "spring", stiffness: 150, damping: 10 },
    },
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-gradient-to-b from-black/50 to-indigo-900/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 text-center relative overflow-hidden">
      {/* Confetti effect for survivors */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
          colors={[
            "#ec4899",
            "#d946ef",
            "#8b5cf6",
            "#4ade80",
            "#facc15",
            "#f87171",
            "#60a5fa",
            "#f472b6",
          ]}
          gravity={0.35}
          initialVelocityY={50}
          initialVelocityX={{ min: -30, max: 30 }}
          tweenDuration={5000}
          confettiSource={{
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: 0,
          }}
        />
      )}

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className={`p-8 rounded-2xl ${
          isSurvived
            ? "bg-gradient-to-br from-pink-500/30 to-purple-600/30 shadow-lg shadow-pink-500/20"
            : "bg-gradient-to-br from-gray-900/50 to-black/70 border border-gray-600/50"
        }`}
      >
        {/* Image */}
        {result.image && (
          <motion.img
            src={result.image}
            alt={result.name || "Passenger"}
            className="w-48 h-48 rounded-full object-cover mx-auto mb-6 border-4 border-white/40 shadow-xl"
            variants={imageVariants}
            onError={(e) => {
              e.target.style.display = "none";
              console.error("Failed to load image");
            }}
          />
        )}

        {/* Name */}
        <h2 className="text-white text-3xl font-extrabold mb-3 tracking-tight">
          {result.name || "Unknown Passenger"}
        </h2>

        {/* Survival Status and Message */}
        {isSurvived ? (
          <>
            <motion.h3
              className="text-green-400 text-2xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Survived! 🎉
            </motion.h3>
            <p className="text-white/90 text-lg font-medium">{randomMessage}</p>
          </>
        ) : (
          <>
            <motion.h3
              className="text-red-500 text-2xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              RIP 😔
            </motion.h3>
            <p className="text-white/90 text-lg font-medium">{randomMessage}</p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ResultCard;
