import React, { useEffect, useState } from "react";
import "../styles/landingpage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // ✅ ispravno

function LandingPage() {
  const [pomoci, setPomoci] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    const hostname = window.location.hostname;
    const apiBase = hostname === "localhost" ? "http://localhost:8000" : `http://${hostname}:8000`;

    fetch(`${apiBase}/pomoc/random?count=5`)
      .then((res) => res.json())
      .then((data) => setPomoci(data))
      .catch((err) => console.error("Greška:", err));
  }, []);

  const handleSymptomSearch = async () => {
  try {
    const hostname = window.location.hostname;
    const apiBase = hostname === "localhost" ? "http://localhost:8000" : `http://${hostname}:8000`;

    const response = await fetch(`${apiBase}/simptomi/search?s=${encodeURIComponent(search)}`);
    if (!response.ok) {
      throw new Error("Simptom nije pronađen.");
    }

    const data = await response.json();
    localStorage.setItem("povrede", JSON.stringify(data)); // čuvamo u browser
    navigate("/dashboard");
  } catch (err) {
    alert(err.message);
  }
};

const handleGoToSignup = () => {
    navigate('/signup'); 
  }
const handleGoToSignIn= () => {
    navigate('/signin');
  }

  return (
    <div className="landing-wrapper">
      {/* SVE UNUTAR JEDNOG BUBBLE-a */}
      <div className="main-bubble">
        {/* NAVBAR */}
        <nav className="navbar inside-bubble-nav">
          <div className="navbar-left">
            <img src="/logo.png" alt="Heroj Logo" />
            <span className="logo-text">Heroj</span>
          </div>
          <div className="navbar-center">
            <input
              type="text"
              className="search-bar"
              placeholder="Pretraži simptome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSymptomSearch();
                }
              }}
            />

          </div>
          <div className="navbar-right">
          <Link to="/signup">
            <button className="btn signup">Sign Up</button>
          </Link>

          <Link to="/signin">
            <button className="btn login">Log In</button>
          </Link>
          </div>
        </nav>

        {/* SREDINA */}
        <div className="top-content">
          <div className="hero-left">
            <h1>Vaš vodič kroz prvu pomoć</h1>
            <p className="subtext">
              Reagujte brzo i bez panike
            </p>
          </div>
          <div className="hero-right">
            <img src="/landingpage.png" alt="Hero slika" />
          </div>
        </div>

        {/* GRID */}
        <div className="category-grid">
          {pomoci.map((p, index) => (
            <div key={index}>
              <div
                className="category-card"
                onClick={() => setSelectedIndex(index === selectedIndex ? null : index)}
              >
                {p.naziv}
              </div>
            </div>
          ))}
        </div>
        {selectedIndex !== null && (
          <div className="description-box-wide">
            {pomoci[selectedIndex].koraci.map((step, i) => (
              <p key={i}>
                <span className="bullet">•</span> {step}
              </p>
            ))}
          </div>
        )}


      </div>
    </div>
  );
}

export default LandingPage;