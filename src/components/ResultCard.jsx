import React from "react";

const ResultCard = ({ result }) => {
  // Ensure result exists to avoid accessing undefined properties
  if (!result) {
    return (
      <div className="text-white text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
        No result available
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Prediction Result</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p>
          <strong>Name:</strong> {result.name || "N/A"}
        </p>
        {result.image && (
          <div>
            <strong>Image:</strong>
            <img
              src={result.image}
              alt="Passenger"
              className="w-32 h-32 object-cover rounded-full mx-auto mt-2"
              onError={(e) => {
                e.target.style.display = "none"; // Hide image if it fails to load
                console.error("Failed to load image");
              }}
            />
          </div>
        )}
        <p>
          <strong>Class:</strong>{" "}
          {result.pclass === 1
            ? "1st Class"
            : result.pclass === 2
            ? "2nd Class"
            : "3rd Class"}
        </p>
        <p>
          <strong>Sex:</strong> {result.sex === 0 ? "Male" : "Female"}
        </p>
        <p>
          <strong>Age:</strong> {result.age || "N/A"}
        </p>
        <p>
          <strong>Siblings/Spouses:</strong> {result.sibsp || "0"}
        </p>
        <p>
          <strong>Parents/Children:</strong> {result.parch || "0"}
        </p>
        <p>
          <strong>Fare:</strong> ${result.fare ? result.fare.toFixed(2) : "N/A"}
        </p>
        <p>
          <strong>Port of Embarkation:</strong>{" "}
          {result.embarked === 0
            ? "Cherbourg"
            : result.embarked === 1
            ? "Queenstown"
            : result.embarked === 2
            ? "Southampton"
            : "N/A"}
        </p>
        <p>
          <strong>Survival Prediction:</strong>{" "}
          {result.Survived === 1
            ? "Survived"
            : result.Survived === 0
            ? "Did Not Survive"
            : "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
