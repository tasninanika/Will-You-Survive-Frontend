const ResultCard = ({ result }) => {
  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg text-center">
      <h2 className="text-white text-2xl font-bold mb-4">Your Result</h2>
      <p className="text-white text-lg">{result}</p>
    </div>
  );
};

export default ResultCard;
