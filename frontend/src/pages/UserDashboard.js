import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/UserDashboard.css";

export default function UserDashboard() {
  const [username, setUsername] = useState("Korisnik");
  const [search, setSearch] = useState("");
  const [manualHistory, setManualHistory] = useState([]);
  const [backendHistory, setBackendHistory] = useState({ povrede: [], simptomi: [] });

  useEffect(() => {
    setUsername("Nejra");

    // Fetch backend history for user ID 4
    fetch("http://localhost:8000/user/4/history")
      .then((res) => res.json())
      .then((data) => setBackendHistory(data))
      .catch((err) => console.error("Greška prilikom dohvata historije:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setManualHistory([search, ...manualHistory]);
      setSearch("");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <span className="username">{username}</span>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži simptome/povrede"
          />
          <button type="submit">Traži</button>
        </form>
      </header>

      <div className="dashboard-body">
        <aside className="sidebar">
          <div className="sidebar-section">
            <Link to="/kviz">Kviz</Link>
            <p className="sidebar-text">
              Pristupite kvizu i provjerite svoje znanje prve pomoći.
            </p>
          </div>

          <div className="sidebar-section">
            <Link to="/edukacija">Edukacija</Link>
            <p className="sidebar-text">
              Pogledajte edukacijske videe i slike za prvu pomoć.
            </p>
          </div>

          <div className="sidebar-section">
            <button>Forum</button>
            <p className="sidebar-text">
              Budite u kontaktu sa ostalim korisnicima kroz objave i komentare na našem forumu.
            </p>
          </div>
        </aside>

        <main className="content">
          <h2>Historija pretrage</h2>

          <h3>Povrede</h3>
          <ul>
            {backendHistory.povrede.length === 0 ? (
              <li>Nema povreda u historiji.</li>
            ) : (
              backendHistory.povrede.map((p) => (
                <li key={p.povreda_id}>
                  <strong>{p.naziv}</strong>: {p.opis}
                </li>
              ))
            )}
          </ul>

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

         
        </main>
      </div>
    </div>
  );
}
