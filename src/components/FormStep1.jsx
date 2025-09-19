import { useState } from "react";
import toast from "react-hot-toast";

const FormStep1 = ({ onNext }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (!name.trim()) {
      toast.error("Please enter your name", {
        style: {
          background: "#1e1e2e",
          color: "#fff",
          border: "1px solid #f472b6",
          borderRadius: "8px",
        },
      });
      return;
    }
    if (!image) {
      toast.error("Please upload an image", {
        style: {
          background: "#1e1e2e",
          color: "#fff",
          border: "1px solid #f472b6",
          borderRadius: "8px",
        },
      });
      return;
    }
    onNext(name, image);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-center border border-white/20">
      <h2 className="text-white text-3xl font-bold mb-6 tracking-tight">
        Wait... <br /> why so hurry?{" "}
      </h2>
      <p>Say who you are first, so history remembers you!</p>
      <div className="space-y-6">
        <div>
          <label className="text-white font-semibold block mb-2 text-left font-crimson">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-purple-500/50 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/50 focus:outline-none transition-all font-crimson"
          />
        </div>
        <div>
          <label className="text-white font-semibold block mb-2 text-left font-crimson">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            className="w-full p-2 rounded-lg bg-white/10 text-white border border-purple-500/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-purple-600 file:text-white file:font-semibold hover:file:bg-gradient-to-l cursor-pointer font-crimson"
          />
        </div>
        {image && (
          <div className="flex justify-center">
            <img
              src={image}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border-2 border-white/20 shadow-lg"
            />
          </div>
        )}
        <button
          onClick={handleNext}
          className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform duration-300 font-crimson"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormStep1;
