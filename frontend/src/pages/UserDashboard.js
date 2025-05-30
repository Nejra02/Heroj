import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/UserDashboard.css";

export default function UserDashboard() {
  const [username, setUsername] = useState("Korisnik");
  const [search, setSearch] = useState("");
  const [backendHistory, setBackendHistory] = useState({simptomi: [] });

  useEffect(() => {
    fetch("http://localhost:8000/users/dashboard-data", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Neuspješno učitavanje podataka.");
        }
        return res.json();
      })
      .then((data) => {
        setBackendHistory({ simptomi: data.simptomi });  // Samo simptomi
      })
      .catch((err) => console.error("Greška prilikom dohvata historije:", err));
    
    fetch("http://localhost:8000/users/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Neuspješno učitavanje korisnika.");
        }
        return res.json();
      })
      .then((data) => {
        setUsername(data.username);
      })
      .catch((err) => console.error("Greška prilikom dohvata korisnika:", err));
  }, []);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const hostname = window.location.hostname;
      const apiBase = hostname === "localhost" ? "http://localhost:8000" : `http://${hostname}:8000`;

      const response = await fetch(`${apiBase}/simptomi/search?s=${encodeURIComponent(search)}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Simptom nije pronađen.");
      }

      const data = await response.json();
      localStorage.setItem("povrede", JSON.stringify(data));

      localStorage.setItem("search-origin", "user_dashboard");
      window.location.href = "/dashboard"; 
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/logo.png" alt="Logo" />
          <span className="username">Dobrodošli nazad {username}!</span>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži simptome..."
          />
        </form>
      </header>

      <div className="dashboard-body">
        <aside className="sidebar">
          <div className="sidebar-section">
            <Link to="/kviz">Kviz</Link>
            <p className="sidebar-text">
              pristupite kvizu i testirajte svoje znanje prve pomoći
            </p>
          </div>

          <div className="sidebar-section">
            <Link to="/edukacija">Edukacija</Link>
            <p className="sidebar-text">
              saznajte više o prvoj pomoći
            </p>
          </div>

          <div className="sidebar-section">
            <Link to="/forum">Forum</Link>
            <p className="sidebar-text">
              budite u kontaktu sa ostalim korisnicima kroz objave i komentare
            </p>
          </div>
        </aside>

        <main className="content">
          <h2>Historija pretrage</h2>

          <div className="lista">
            <h3>Simptomi</h3>
            <ul>
              {backendHistory.simptomi.length === 0 ? (
                <li>Nema simptoma u historiji.</li>
              ) : (
                backendHistory.simptomi.map((s) => (
                  <li key={s.simptom_id}>{s.naziv}</li>
                ))
              )}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
