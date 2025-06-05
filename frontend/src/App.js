import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kviz from "./pages/Kviz";
import Edukacija from "./pages/Edukacija";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboad";
import Forum from "./pages/Forum"
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn'; // Removed duplicate import
import SignUp from './pages/SignUp';

import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./pages/Dashboard"; 
import PovredaDetails from "./pages/PovredaDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user_dashboard" element={<UserDashboard />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/kviz" element={<Kviz />} />
        <Route path="/edukacija" element={<Edukacija />} />
        <Route path="/forum" element={<Forum />} />
        <Route index element={<LandingPage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/povreda/:id" element={<PovredaDetails />} />
      </Routes>
    </Router>
  );
}
export default App;
