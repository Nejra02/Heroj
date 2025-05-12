import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard"; 
import PovredaDetails from "./pages/PovredaDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/povreda/:id" element={<PovredaDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
