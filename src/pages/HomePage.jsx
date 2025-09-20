import { motion } from "framer-motion";
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import Ocean from "../assets/ship.mp4";
import Audio from "../assets/titanic-theme.mp3";
import Robot from "../assets/robot.json";
import LoadingAnimation from "../assets/loading.json";
import LoadingAnimation1 from "../assets/loading1.json";
import React, { useEffect, useState } from "react";
import FormStep1 from "../components/FormStep1";
import FormStep2 from "../components/FormStep2";
import ResultCard from "../components/ResultCard";
import Titanic from "../assets/Titanic.png";

// Error Boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message || "An error occurred"}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

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

  return (
    <p className="text-white/85 md:mt-4 text-sm mt-2 md:text-lg font-mono">
      {displayed}
    </p>
  );
};

const HomePage = () => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFormStep2, setShowFormStep2] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [bubble1Visible, setBubble1Visible] = useState(false);
  const [bubble2Visible, setBubble2Visible] = useState(false);
  const [bubble3Visible, setBubble3Visible] = useState(false);
  const [bubble4Visible, setBubble4Visible] = useState(false);

  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    modelInput: "",
  });
  const [result, setResult] = useState(null);

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

  // API call
  const handleSubmit = async (formStep2Data) => {
    setIsLoading(true);
    setShowFormStep2(false);

    try {
      const { image, ...dataToSend } = { ...formData, ...formStep2Data };
      console.log("Data sent to backend:", dataToSend);
      const res = await fetch(
        // "http://127.0.0.1:8000/predict",
        "https://will-you-survive-backend.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Network error: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      console.log("Backend response:", data);
      setResult({ ...formData, ...formStep2Data, ...data });

      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(3);
        toast.success("Yahooooo!");
      }, 1500);
    } catch (err) {
      console.error("Fetch error:", err);
      setIsLoading(false);
      toast.error("Opps! Something went wrong");
    }
  };

  const handleJumpIn = () => {
    setIsTransitioning(true);
    setBubble1Visible(false);
    setBubble2Visible(false);
    setBubble3Visible(false);
    setBubble4Visible(false);

    // Show loading for 1.5 seconds before showing FormStep1
    setTimeout(() => {
      setIsTransitioning(false);
      setShowIntro(false);
      setCurrentStep(1);
    }, 1500);
  };

  return (
    <div className="relative h-dvh w-full px-4 md:px-40 overflow-hidden bg-black">
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
      <div className="absolute inset-0" />
      {/* bg-gradient-to-b from-black/40 via-indigo-900/30 to-black/70 backdrop-blur-xs */}

      {/* Title */}
      <div className="relative z-10 flex justify-center pt-16">
        <motion.h1
          className="flex items-center text-center text-3xl md:text-4xl font-black text-white drop-shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <img
            src={Titanic}
            alt=""
            className="w-10 h-10 md:w-12 md:h-12 mr-4"
          />
          Titanic Challenge
        </motion.h1>
      </div>

      {/* Dream Bubbles */}
      <div className="relative z-10 h-full w-full">
        {/* Top Bubble */}
        {bubble1Visible && (
          <motion.div
            className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 max-w-[600px]"
            variants={bubbleVariants(0.3)}
            initial="hidden"
            animate="visible"
          >
            <div className="relative p-20 bg-gradient-to-br from-purple-500/20 to-indigo-500/10 backdrop-blur-md rounded-3xl shadow-lg text-center">
              {/* Robot animation  */}
              <motion.div
                className="absolute top-10 left-1/2 -translate-x-1/2 w-40"
                variants={floatVariants}
                animate="float"
              >
                <Lottie animationData={Robot} loop autoplay />
              </motion.div>

              <h2 className="text-white text-xl md:text-3xl font-bold mt-12">
                Hello, Adventurer!
              </h2>
              <TypingText text="Ready for an Adventure? 🧭" />
              {/* Button */}
              <motion.button
                onClick={() => {
                  setBubble1Visible(false);
                  setTimeout(() => setBubble2Visible(true), 500);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mt-4 px-6 py-2 rounded-full font-bold bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 text-white shadow-lg font-crimson"
              >
                Yes! I'm Ready
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Bubble 2 */}
        {/* Dream Bubbles for Bubble 2, Bubble 3, and Bubble 4 */}
        <div className="grid grid-cols-1 gap-4 sm:contents mt-8 md:mt-0">
          {/* Bubble 2 */}
          {bubble2Visible && (
            <motion.div
              className="w-[75%] max-w-[360px] mx-auto sm:absolute sm:left-10 sm:top-16 sm:w-[75%] sm:max-w-[360px] md:top-20 md:left-20"
              variants={bubbleVariants(0.4)}
              initial="hidden"
              animate="visible"
            >
              <div className="relative p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-md rounded-3xl shadow-lg text-center">
                <h2 className="text-white text-base md:text-xl font-bold">
                  OMG! <br />
                  🌊 An Iceberg Ahead!
                </h2>
                <TypingText
                  text="Brace yourself, the night is dark... ❄️"
                  onComplete={() => setBubble3Visible(true)}
                />
              </div>
            </motion.div>
          )}
          {/* Right Bubble (Bubble 3) */}
          {bubble3Visible && (
            <motion.div
              className="w-[75%] max-w-[360px] mx-auto sm:absolute sm:right-12 sm:top-50 sm:w-[75%] sm:max-w-[360px] md:top-20 md:right-20"
              variants={bubbleVariants(0.6)}
              initial="hidden"
              animate="visible"
            >
              <div className="relative p-6 bg-gradient-to-br from-cyan-400/20 to-indigo-700/10 backdrop-blur-md rounded-3xl shadow-lg text-center">
                <h2 className="text-white text-base md:text-xl font-bold">
                  🧊 Are you brave enough to face the Titanic's fate?
                </h2>
                <TypingText
                  text="Don't let the penguins laugh at you!... 🌌"
                  onComplete={() => setBubble4Visible(true)}
                />
              </div>
            </motion.div>
          )}
          {/* Bottom CTA Bubble (Bubble 4) */}
          {bubble4Visible && (
            <motion.div
              className="w-[75%] max-w-[360px] mx-auto sm:absolute sm:bottom-56 sm:left-1/2 sm:-translate-x-1/2 sm:w-[75%] sm:max-w-[360px] md:bottom-40"
              variants={bubbleVariants(0.8)}
              initial="hidden"
              animate="visible"
            >
              <div className="relative p-4 md:p-6 bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-md rounded-3xl shadow-lg text-center">
                <h2 className="text-white text-base md:text-xl font-bold">
                  🚤 Survive first, panic later!
                </h2>
                <TypingText text="The iceberg won't wait for anyone. 😏" />
                <div className="mt-2 md:mt-4">
                  <button
                    onClick={handleJumpIn}
                    className="btn btn-primary w-28 md:w-32 font-bold tracking-wide bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 text-white border-0 shadow-xl hover:scale-105 transition-transform duration-300 rounded-full text-xs md:text-sm"
                  >
                    Jump In! ⚓
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Transition Loading Animation */}
        {isTransitioning && (
          <div className="absolute md:top-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <Lottie
              animationData={LoadingAnimation1}
              loop={true}
              autoplay={true}
              className="w-full h-full "
            />
          </div>
        )}

        {!showIntro && currentStep === 1 && !isTransitioning && (
          <FormStep1
            onNext={(name, image) => {
              setFormData({ ...formData, name, image });
              setCurrentStep(2);
              setShowFormStep2(true);
            }}
          />
        )}

        {currentStep === 2 && showFormStep2 && (
          <FormStep2
            onNext={(formStep2Data) => {
              handleSubmit(formStep2Data);
            }}
          />
        )}

        {/* Loading Animation */}
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <Lottie
              animationData={LoadingAnimation}
              loop={true}
              autoplay={true}
              className="w-full h-full"
            />
          </div>
        )}

        {currentStep === 3 && !isLoading && (
          <ErrorBoundary>
            <ResultCard result={result} />
          </ErrorBoundary>
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
          className="fixed md:bottom-6 bottom-2 left-2 md:left-6 z-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg flex items-center gap-3 md:px-4 md:py-2 px-2 py-1"
        >
          <button
            onClick={toggleMusic}
            className={`md:px-3 py-1 px-2 rounded-lg font-semibold transition-colors md:text-base text-xs ${
              musicPlaying
                ? " bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 border-0 text-white font-crimson"
                : "bg-pink-500/70 hover:bg-pink-500/90 text-white font-crimson"
            }`}
          >
            {musicPlaying ? "🔊 On" : "🔇 Off"}
          </button>
          <span className="text-white md:text-base text-xs font-crimson">
            Titanic Theme
          </span>
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
