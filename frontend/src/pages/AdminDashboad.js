import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";

export default function UserAdminPanel() {
  const [showUsers, setShowUsers] = useState(false);
   const [search, setSearch] = useState("");
  const [regularUsers, setRegularUsers] = useState([]);

const toggleUsers = () => {
  if (!showUsers) {
    const hostname = window.location.hostname;
    const apiBase = hostname === "localhost" ? "http://localhost:8000" : `http://${hostname}:8000`;

    fetch(`${apiBase}/users/`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Greška sa servera: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setRegularUsers(data);
      })
      .catch(err => {
        console.error(err);
        alert("Ne mogu dohvatiti korisnike. Provjeri backend i URL.");
      });
  }
  setShowUsers(prev => !prev);
};

  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const hostname = window.location.hostname;
      const apiBase = hostname === "localhost" ? "http://localhost:8000" : `http://${hostname}:8000`;

      const response = await fetch(`${apiBase}/simptomi/search?s=${encodeURIComponent(search)}`, {});

      if (!response.ok) {
        throw new Error("Simptom nije pronađen.");
      }

      const data = await response.json();
      localStorage.setItem("povrede", JSON.stringify(data));

      window.location.href = "/dashboard";  // ili useNavigate ako koristiš
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-panel-wrapper">
      <header className="dashboard-header">
        <div className="admin-header-left">
          <img src="/logo.png" alt="Logo" className="admin-logo" />
          <span className="admin-name">Admin</span>
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

      <div className="admin-panel-body">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-group">
            <button onClick={toggleUsers}>
              {showUsers ? "Sakrij korisnike" : "Prikaži korisnike"}
            </button>
          </div>
        </aside>

        <main className="admin-main-content">
          {showUsers && (
            <>
              <h2 className="user-list-title">Registrovani korisnici</h2>
              <div className="user-card-container">
                {regularUsers.length === 0 ? (
                  <p className="no-users-msg">Nema korisnika.</p>
                ) : (
                  regularUsers.map(user => (
                    <div key={user.user_id} className="user-card">
                      <p><strong>Korisničko ime:</strong> {user.username}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
