import { useState } from "react";

const FormStep2 = ({ onNext }) => {
  const [input, setInput] = useState("");

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg text-center">
      <h2 className="text-white text-2xl font-bold mb-4">Model Input</h2>
      <input
        type="text"
        placeholder="Type something for prediction"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 mb-4 rounded-lg text-black"
      />
      <button
        onClick={() => onNext(input)}
        className="px-6 py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white rounded-full font-bold shadow-lg"
      >
        Predict
      </button>
    </div>
  );
};

export default FormStep2;
