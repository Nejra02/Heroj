import React, { useEffect, useState } from "react";
import "../styles/main.css";
import "../styles/landingpage.css";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [povrede, setPovrede] = useState([]);
  const [pomoci, setPomoci] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("povrede");
    if (saved) {
      setPovrede(JSON.parse(saved));
    } else {
      navigate("/");
    }

    const hostname = window.location.hostname;
    const apiBase =
      hostname === "localhost"
        ? "http://localhost:8000"
        : `http://${hostname}:8000`;

    fetch(`${apiBase}/pomoc/random?count=5`)
      .then((res) => res.json())
      .then((data) => setPomoci(data))
      .catch((err) => console.error("Greška:", err));
  }, [navigate]);

  const handleSymptomSearch = async () => {
    console.log("Pretraga pokrenuta:", search);

    try {
      const hostname = window.location.hostname;
      const apiBase =
        hostname === "localhost"
          ? "http://localhost:8000"
          : `http://${hostname}:8000`;

      const response = await fetch(
        `${apiBase}/simptomi/search?s=${encodeURIComponent(search)}`
      );
      if (!response.ok) {
        throw new Error("Simptom nije pronađen.");
      }

      const data = await response.json();
      console.log("Rezultat pretrage:", data);
      localStorage.setItem("povrede", JSON.stringify(data));
      navigate("/dashboard");
      window.location.reload(); // ključno da se prikaz osvježi
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="landing-wrapper">
      <div className="main-bubble">
        {/* NAVBAR */}
        <nav className="navbar inside-bubble-nav">
          <div className="navbar-left">
            <img src="/logo.png" alt="Heroj Logo" />
            <span className="logo-text">Heroj</span>
          </div>

          <form
            className="navbar-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleSymptomSearch();
            }}
          >
            <input
              type="text"
              className="search-bar"
              placeholder="Pretraži simptome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <div className="navbar-right">
            <button className="btn login" onClick={() => navigate("/")}>
              Nazad
            </button>
          </div>
        </nav>

        {/* HITNA PORUKA */}
        <div className="dashboard-title">POZOVITE HITNU POMOĆ 124!</div>

        {/* POVREDE */}
        {povrede.length > 0 ? (
          povrede.map((p, i) => (
            <div
              key={i}
              className="povreda-card"
              onClick={() => navigate(`/povreda/${p.povreda_id}`)}
              style={{ cursor: "pointer" }}
            >
              <h3 className="povreda-title">{p.naziv}</h3>
              <p className="povreda-opis">{p.opis}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            Nema povreda za prikaz.
          </p>
        )}
      </div>
    </div>
  );
}
