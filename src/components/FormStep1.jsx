import { useState } from "react";

const FormStep1 = ({ onNext }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Save as data URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg text-center">
      <h2 className="text-white text-2xl font-bold mb-4">Your Info</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 rounded-lg text-black"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {image && (
        <img
          src={image}
          alt="preview"
          className="mx-auto mb-4 w-32 h-32 rounded-full object-cover"
        />
      )}
      <button
        onClick={() => onNext(name, image)}
        className="px-6 py-2 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 text-white rounded-full font-bold shadow-lg"
      >
        Next
      </button>
    </div>
  );
};

export default FormStep1;
