import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PredictPage from "../pages/PredictPage";
import ErrorPage from "../pages/ErrorPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/predict" element={<PredictPage />} />
        <Route path="*" element={<ErrorPage></ErrorPage>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
