import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn'; // Removed duplicate import
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
export default App;
