import Lottie from "lottie-react";
import errorAnimation from "../assets/error.json";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Oops! Something Went Wrong
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        It seems the Titanic has hit an iceberg! Please try again later.
      </p>
      <Lottie
        loop
        animationData={errorAnimation}
        play
        style={{ width: 300, height: 300 }}
      />
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </a>
    </div>
  );
};

export default ErrorPage;
