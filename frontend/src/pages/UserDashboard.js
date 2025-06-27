import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import "../styles/UserDashboard.css";
import Swal from 'sweetalert2';

export default function UserDashboard() {
  const [username, setUsername] = useState("Korisnik");
  const [search, setSearch] = useState("");
  const [backendHistory, setBackendHistory] = useState({simptomi: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const hostname = window.location.hostname;
    const apiBase = hostname === "localhost" ? "http://localhost:8000" : `http://${hostname}:8000`;

    
    fetch(`${apiBase}/users/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Neuspješno učitavanje korisnika.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.role === "user") {
          setUsername(data.username);
        } else if (data.role === "admin") {
          navigate("/admin_dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Greška prilikom dohvata korisnika:", err);
        navigate("/");
      });

    fetch(`${apiBase}/users/dashboard-data`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Neuspješno učitavanje podataka.");
        }
        return res.json();
      })
      .then((data) => {
        setBackendHistory({ simptomi: data.simptomi });  
      })
      .catch((err) => console.error("Greška prilikom dohvata historije:", err));
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
       Swal.fire({ title: "Greška", text: err.message, icon: "none" });
    }
  };

  const handleLogout = async () => {
    const hostname = window.location.hostname;
    const apiBase = hostname === "localhost" ? "http://localhost:8000" : `http://${hostname}:8000`;

    try {
      const res = await fetch(`${apiBase}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();  

      if (res.ok) {
        console.log(data);
        localStorage.clear();
        window.location.href = "/signin";
        Swal.fire({
        title: 'Uspješna odjava!',
        showConfirmButton: false,
        timer: 1500
      });
      } else {
        console.error("Logout nije uspio:", data); 
        Swal.fire({
        title: 'Neuspješna odjava!',
        showConfirmButton: false,
        timer: 1500
      });
      }
    } catch (err) {
      console.error("Greška pri logoutu:", err);
      Swal.fire({
        title: 'Greška pri odjavi!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
      <div className="landing-wrapper">
          <div className="main-bubble">
              <nav className="navbar">
                  <div className="navbar-left">
                      <img src="/logo.png" alt="Logo" />
                      <span className="username">Dobrodošli nazad {username}!</span>
                  </div>
                  <div className="navbar-center">
                      <form className="search-form" onSubmit={handleSearch}>
                          <input
                              type="text"
                              className="search-bar"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              placeholder="Pretraži simptome..."
                          />
                      </form>
                  </div>
                  <div className="navbar-right">
                      <button className="logout-button" onClick={handleLogout}>Odjavi se</button>
                  </div>
              </nav>

              <div className="admin-panel-body">
                  <aside className="admin-sidebar">
                      <div className="admin-sidebar-group">
                          <Link to="/kviz" className="sidebar-button-link">Kviz</Link>
                      </div>
                      <div className="admin-sidebar-group">
                          <Link to="/edukacija" className="sidebar-button-link">Edukacija</Link>
                      </div>
                      <div className="admin-sidebar-group">
                          <Link to="/forum" className="sidebar-button-link">Forum</Link>
                      </div>
                  </aside>

                  <main className="admin-main-content">
                      <div className="user-history-container">
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
                      </div>
                  </main>
              </div>
          </div>
      </div>
  );
}
