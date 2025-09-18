import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdventurePage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [step, setStep] = useState(0);

  const handleStart = () => {
    setShowIntro(false);
    setStep(1);
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div className="relative h-dvh w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 to-black text-white">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -200 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md text-center"
          >
            <h1 className="text-3xl font-bold mb-4">
              🌊 Ready for an Adventure?
            </h1>
            <p className="text-white/80 mb-6">
              Step aboard the Titanic and see if you can survive...
            </p>
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-pink-600 rounded-full hover:bg-pink-700 transition font-bold"
            >
              ✅ Yes
            </button>
          </motion.div>
        ) : (
          step > 0 && (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md text-center"
            >
              <h2 className="text-2xl font-bold">Card {step}</h2>
              <p className="text-white/70 mt-2">
                This is step {step} of your adventure.
              </p>
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="mt-6 px-6 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition"
                >
                  Next →
                </button>
              ) : (
                <p className="mt-6 font-bold text-green-400">
                  ✅ Adventure Begins!
                </p>
              )}
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdventurePage;
