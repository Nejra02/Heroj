import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";

export default function UserAdminPanel() {
  const [showUsers, setShowUsers] = useState(false);
  const [regularUsers, setRegularUsers] = useState([]);

  const toggleUsers = () => {
    if (!showUsers) {
      fetch("http://localhost:8000/users")
        .then(res => res.json())
        .then(data => setRegularUsers(data));
    }
    setShowUsers(prev => !prev);
  };

  return (
    <div className="admin-panel-wrapper">
      <header className="admin-header">
        <div className="admin-header-left">
          <img src="/logo.png" alt="Logo" className="admin-logo" />
          <span className="admin-name">Admin</span>
        </div>
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
