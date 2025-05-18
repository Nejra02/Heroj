import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kviz from "./pages/Kviz";
import Edukacija from "./pages/Edukacija";
import UserDashboard from "./pages/UserDashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/kviz" element={<Kviz />} />
        <Route path="/edukacija" element={<Edukacija />} />
        
      </Routes>
    </Router>
  );
}

export default App;
