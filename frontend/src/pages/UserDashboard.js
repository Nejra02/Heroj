import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
        <button className="logout-button" onClick={handleLogout}>Odjavi se</button>
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
