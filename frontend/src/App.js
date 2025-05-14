<<<<<<< HEAD
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn'; // Removed duplicate import
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard"; 
import PovredaDetails from "./pages/PovredaDetails";
>>>>>>> landing-page

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route index element={<LandingPage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        {/* Add more routes as needed */}
=======
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/povreda/:id" element={<PovredaDetails />} />
>>>>>>> landing-page
      </Routes>
    </Router>
  );
}
export default App;
