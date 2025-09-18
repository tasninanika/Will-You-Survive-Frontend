import React from "react";

const ResultCard = ({ result }) => {
  // Ensure result exists to avoid accessing undefined properties
  if (!result) {
    return <div>No result available</div>;
  }

  // Handle the image (assuming it's a File object from FormStep1)
  const imageUrl = result.image ? URL.createObjectURL(result.image) : null;

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Prediction Result</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p>
          <strong>Name:</strong> {result.name || "N/A"}
        </p>
        {imageUrl && (
          <div>
            <strong>Image:</strong>
            <img
              src={imageUrl}
              alt="Passenger"
              className="w-32 h-32 object-cover rounded"
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
          <strong>Age:</strong> {result.age}
        </p>
        <p>
          <strong>Siblings/Spouses:</strong> {result.sibsp}
        </p>
        <p>
          <strong>Parents/Children:</strong> {result.parch}
        </p>
        <p>
          <strong>Fare:</strong> ${result.fare.toFixed(2)}
        </p>
        <p>
          <strong>Port of Embarkation:</strong>{" "}
          {result.embarked === 0
            ? "Cherbourg"
            : result.embarked === 1
            ? "Queenstown"
            : "Southampton"}
        </p>
        <p>
          <strong>Survival Prediction:</strong>{" "}
          {result.Survived === 1 ? "Survived" : "Did Not Survive"}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
