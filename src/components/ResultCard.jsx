import React from "react";
import { motion } from "framer-motion";

const ResultCard = ({ result }) => {
  // Ensure result exists to avoid accessing undefined properties
  if (!result) {
    return (
      <div className="text-white text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg max-w-md mx-auto mt-24">
        No result available
      </div>
    );
  }

  const isSurvived = result.Survived === 1;

  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, scale: isSurvived ? 0.8 : 1, y: isSurvived ? 0 : 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation for confetti (survived case)
  const confettiVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const confettiParticle = {
    hidden: { opacity: 0, x: Math.random() * 100 - 50, y: Math.random() * 100 },
    visible: {
      opacity: [1, 0],
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 + 50,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 text-center relative overflow-hidden">
      {/* Confetti effect for survivors */}
      {isSurvived && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          variants={confettiVariants}
          initial="hidden"
          animate="visible"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full absolute"
              style={{ top: "10%", left: `${Math.random() * 100}%` }}
              variants={confettiParticle}
            />
          ))}
        </motion.div>
      )}

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className={`p-6 rounded-xl ${
          isSurvived
            ? "bg-gradient-to-br from-pink-500/20 to-purple-600/20"
            : "bg-gradient-to-br from-gray-800/20 to-black/50 border border-gray-500/50"
        }`}
      >
        {/* Image */}
        {result.image && (
          <motion.img
            src={result.image}
            alt={result.name || "Passenger"}
            className="w-40 h-40 rounded-full object-cover mx-auto mb-4 border-2 border-white/30 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            onError={(e) => {
              e.target.style.display = "none";
              console.error("Failed to load image");
            }}
          />
        )}

        {/* Name */}
        <h2 className="text-white text-2xl font-bold mb-2">
          {result.name || "Unknown Passenger"}
        </h2>

        {/* Survival Status and Message */}
        {isSurvived ? (
          <>
            <motion.h3
              className="text-green-400 text-xl font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Survived! 🎉
            </motion.h3>
            <p className="text-white/80 text-lg">
              Tumi borolok, taka ache, tai beche gecho! 🚢
            </p>
          </>
        ) : (
          <>
            <motion.h3
              className="text-red-500 text-xl font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              RIP 😔
            </motion.h3>
            <p className="text-white/80 text-lg">
              {result.name
                ? `${result.name}, Titanic-er iceberg tomar kotha mone rakhbe.`
                : "Titanic-er iceberg ekti asamanya baktir kotha mone rakhbe."}
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ResultCard;
