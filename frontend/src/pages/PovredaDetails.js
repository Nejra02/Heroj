import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/landingpage.css";

export default function PovredaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [pomoci, setPomoci] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    const apiBase = hostname === "localhost" ? "http://localhost:8000" : `http://${hostname}:8000`;

    fetch(`${apiBase}/povrede/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Ne postoji ta povreda.");
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        alert(err.message);
        navigate("/dashboard");
      });

    fetch(`${apiBase}/pomoc/random?count=5`)
      .then((res) => res.json())
      .then(setPomoci)
      .catch((err) => console.error("Greška pri dohvaćanju pomoći:", err));
  }, [id, navigate]);

  if (!data) return null;

  return (
    <div className="landing-wrapper">
      <div className="main-bubble">
        {/* NAVBAR */}
        <nav className="navbar inside-bubble-nav">
          <div className="navbar-left">
            <img src="/logo.png" alt="Heroj Logo" />
            <span className="logo-text">Heroj</span>
          </div>
          <div className="navbar-center">
            <span style={{ fontWeight: "bold", fontSize: "20px", color: "var(--dark-red)" }}>
              prva pomoć za {data.naziv.toLowerCase()}
            </span>
          </div>
          <div className="navbar-right">
            <button className="btn login" onClick={() => navigate("/dashboard")}>
              Nazad
            </button>
          </div>
        </nav>

        {/* POVREDA */}
        <div style={{ marginTop: "30px" }}>
          <h2 className="povreda-title">{data.naziv}</h2>
          <p className="povreda-opis">{data.opis}</p>

          {/* KORACI POMOĆI */}
          <div className="description-box-wide" style={{ marginTop: "30px" }}>
            {data.pomoc.koraci.map((korak, i) => (
              <p key={i}>
                <span className="bullet">•</span> {korak}
              </p>
            ))}
          </div>
        </div>

        {/* DODATNIH 5 POMOCI */}
        <div className="category-grid" style={{ marginTop: "40px" }}>
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
