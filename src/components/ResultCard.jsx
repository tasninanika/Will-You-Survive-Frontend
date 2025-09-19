import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import toast from "react-hot-toast";

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
  const [randomMessage, setRandomMessage] = useState("");
  const cardRef = useRef(null);

  // Stop confetti after 6 seconds
  useEffect(() => {
    if (isSurvived) {
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isSurvived]);

  // Arrays of varied survival and non-survival messages
  const survivalMessages = [
    "Titanic sank… but your story’s still floating!🚢",
    "Titanic went under, but you’re still on top! 😂 🎉",
    "The iceberg froze the ship, but not your luck!🛳️",
    "Titanic sank, but you didn’t go down with it! 😎",
    "Titanic’s gone… but your ego stayed afloat! 🌊",
  ];

  const nonSurvivalMessages = [
    "Titanic said: Nice try, but swimming lessons next time!😅",

    "You sank faster than the Wi-Fi on the Titanic!🚢",

    "Even Jack had more screen time than you!🚢",

    "Titanic survived longer than you did!😬",

    "Even the iceberg felt sorry for you!😂 ",
  ];

  // Set random message once on mount
  useEffect(() => {
    const messageArray = isSurvived ? survivalMessages : nonSurvivalMessages;
    const selectedMessage =
      messageArray[Math.floor(Math.random() * messageArray.length)];
    setRandomMessage(selectedMessage);
  }, []);

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

  // Share functionality
  const handleShare = async () => {
    const shareText = isSurvived
      ? `I survived the Titanic! 🎉 ${randomMessage}`
      : `RIP 😔 ${randomMessage}`;
    const shareData = {
      title: "Titanic Survival Challange",
      text: shareText,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } catch (err) {
        console.error("Share failed:", err);
        toast.error("Sharing failed. Try the fallback option.");
      }
    } else {
      // Fallback: Open share links in new tabs
      const encodedText = encodeURIComponent(shareText);
      const shareUrls = {
        x: `https://x.com/intent/tweet?text=${encodedText}&url=${encodeURIComponent(
          window.location.href
        )}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodeURIComponent(
          window.location.href
        )}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}&quote=${encodedText}`,
        instagram: `https://www.instagram.com/?caption=${encodedText}%20${encodeURIComponent(
          window.location.href
        )}`,
      };
      window.open(shareUrls.x, "_blank");
      toast.success("Opened X for sharing!");
    }
  };

  // Download card as PNG
  const handleDownload = () => {
    if (!cardRef.current) {
      toast.error("Card not ready for download. Please try again.", {
        id: "download",
      });
      console.error("cardRef is null or undefined");
      return;
    }

    toast.loading("Generating your Titanic card...", { id: "download" });
    console.log("Starting canvas-based capture...");

    // Get inner card dimensions
    const innerRect = cardRef.current.getBoundingClientRect();
    const innerWidth = innerRect.width;
    const innerHeight = innerRect.height;
    const scale = 2; // High DPI scaling
    const canvasWidth = innerWidth * scale;
    const canvasHeight = innerHeight * scale;

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      toast.error("Canvas not supported. Please screenshot the card.", {
        id: "download",
      });
      return;
    }

    // Set high DPI scaling
    ctx.scale(scale, scale);

    // Step 1: Draw inner card background gradient with restored vibrant colors
    let innerGradient;
    if (isSurvived) {
      innerGradient = ctx.createLinearGradient(0, 0, 0, innerHeight);
      innerGradient.addColorStop(0, "rgb(219, 39, 119)"); // pink-600
      innerGradient.addColorStop(1, "rgb(126, 34, 206)"); // purple-700
    } else {
      innerGradient = ctx.createLinearGradient(0, 0, 0, innerHeight);
      innerGradient.addColorStop(0, "rgb(17, 24, 39)"); // gray-900
      innerGradient.addColorStop(1, "rgb(0, 0, 0)"); // black
    }
    ctx.fillStyle = innerGradient;
    ctx.rect(0, 0, innerWidth, innerHeight); // Sharp rectangle, no rounded corners
    ctx.fill();

    // Step 2: Draw inner card shadow and border
    const borderWidth = 1; // Consistent with UI
    const halfBorder = borderWidth / 2;
    ctx.save();
    if (isSurvived) {
      ctx.shadowColor = "rgba(236, 72, 153, 0.4)"; // pink-500/40
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;
    } else {
      ctx.shadowColor = "rgba(75, 85, 99, 0.6)"; // gray-600/60
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;
      ctx.strokeStyle = "rgba(75, 85, 99, 0.6)"; // border-gray-600/60
      ctx.lineWidth = borderWidth;
      ctx.rect(
        halfBorder,
        halfBorder,
        innerWidth - borderWidth,
        innerHeight - borderWidth
      );
      ctx.stroke();
    }
    ctx.fillStyle = "transparent";
    ctx.fill();
    ctx.restore();

    // Step 3: Calculate content height for vertical centering
    const imgSize = result.image ? 160 : 0;
    const imgMargin = result.image ? 16 : 0;
    const nameHeight = 30;
    const nameMargin = 8;
    const statusHeight = 24;
    const statusMargin = 12;
    const messageLineHeight = 20;
    const messageLines =
      Math.ceil(ctx.measureText(randomMessage).width / (innerWidth - 48)) || 1;
    const messageHeight = messageLineHeight * Math.min(messageLines, 2);
    const totalContentHeight =
      imgSize +
      imgMargin +
      nameHeight +
      nameMargin +
      statusHeight +
      statusMargin +
      messageHeight;

    // Calculate starting Y to center content vertically in inner card
    const innerPadding = 24; // Matches p-6 (padding: 1.5rem = 24px)
    const availableHeight = innerHeight - 2 * innerPadding;
    const startY = innerPadding + (availableHeight - totalContentHeight) / 2;

    let currentY = startY;

    // Step 4: Load and draw image if present
    if (result.image) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Draw circular image
        const imgX = (innerWidth - imgSize) / 2;
        const imgY = currentY;

        // Clip to circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          imgX + imgSize / 2,
          imgY + imgSize / 2,
          imgSize / 2,
          0,
          2 * Math.PI
        );
        ctx.clip();
        ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
        ctx.restore();

        // Draw image border
        ctx.beginPath();
        ctx.arc(
          imgX + imgSize / 2,
          imgY + imgSize / 2,
          imgSize / 2,
          0,
          2 * Math.PI
        );
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.stroke();

        // Draw image shadow
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        ctx.beginPath();
        ctx.arc(
          imgX + imgSize / 2,
          imgY + imgSize / 2,
          imgSize / 2,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fill();
        ctx.restore();

        currentY += imgSize + imgMargin;
        drawTextContent();
      };
      img.onerror = () => {
        console.error("Failed to load image for canvas:", result.image);
        currentY += imgSize + imgMargin;
        drawTextContent();
      };
      img.src = result.image;
    } else {
      drawTextContent();
    }

    // Helper to draw text content
    function drawTextContent() {
      // Draw name
      ctx.font = "800 30px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(
        result.name || "Unknown Passenger",
        innerWidth / 2,
        currentY
      );
      currentY += nameHeight + nameMargin;

      // Draw status
      ctx.font = "700 24px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = isSurvived ? "#10B981" : "#EF4444"; // green-400 or red-500
      ctx.fillText(
        isSurvived ? "Survived! 🎉" : "RIP 😔",
        innerWidth / 2,
        currentY
      );
      currentY += statusHeight + statusMargin;

      // Draw message
      ctx.font = "500 16px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      const maxWidth = innerWidth - 48;
      const words = randomMessage.split(" ");
      let line = "";
      const lineHeight = messageLineHeight;
      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== "") {
          ctx.fillText(line.trim(), innerWidth / 2, currentY);
          line = word + " ";
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line.trim(), innerWidth / 2, currentY);

      // Finalize download
      finalizeDownload();
    }

    function finalizeDownload() {
      const filename = `titanic-result-${result.name || "passenger"}-${
        isSurvived ? "survived" : "rip"
      }.png`;
      const dataUrl = canvas.toDataURL("image/png");
      console.log("Canvas generated, data URL length:", dataUrl.length);

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Card generated successfully`, { id: "download" });
      console.log("Download triggered successfully:", filename);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-5 bg-gradient-to-b from-black/50 to-indigo-900/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-500/30 text-center relative overflow-hidden">
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
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className={`p-6 rounded-2xl ${
          isSurvived
            ? "bg-gradient-to-br from-pink-700 to-purple-700/50 shadow-lg shadow-pink-500/20"
            : "bg-gradient-to-br from-gray-900/70 to-black/90 border border-gray-600/50"
        }`}
      >
        {/* Image */}
        {result.image && (
          <motion.img
            src={result.image}
            alt={result.name || "Passenger"}
            className="w-44 h-44 rounded-full object-cover mx-auto mb-4 border-4 border-white/40 shadow-xl"
            variants={imageVariants}
            onError={(e) => {
              e.target.style.display = "none";
              console.error("Failed to load image:", e.target.src);
            }}
          />
        )}

        {/* Name */}
        <h2 className="text-white text-4xl font-extrabold mb-2 tracking-tight">
          {result.name || "Unknown Passenger"}
        </h2>

        {/* Survival Status and Message */}
        {isSurvived ? (
          <>
            <motion.h3
              className="text-green-400 text-2xl font-bold mb-3"
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
              className="text-red-500 text-xl font-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              RIP 😔
            </motion.h3>
            <p className="text-white/90 text-md font-medium">{randomMessage}</p>
          </>
        )}

        {/* Share and Download Buttons */}
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={handleShare}
            className="px-8 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200"
          >
            Share
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-200"
          >
            Download
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultCard;
