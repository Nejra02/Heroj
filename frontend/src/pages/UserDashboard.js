import React, { useState, useEffect } from "react";
import "../styles/UserDashboard.css"; 

export default function UserDashboard() {
  const [username, setUsername] = useState("Korisnik");
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    
    setUsername("Nejra");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setHistory([search, ...history]);
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
                <button>Kviz</button>
                <p className="sidebar-text">
      Pristupite kvizu i provjerite svoje znanje prve pomoći.
                </p>
            </div>

            <div className="sidebar-section">
                <button>Edukacija</button>
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
          <ul>
            {history.length === 0 ? (
              <li>Nema pretraga još uvijek.</li>
            ) : (
              history.map((item, index) => <li key={index}>{item}</li>)
            )}
          </ul>
        </main>
      </div>
    </div>
  );
}
