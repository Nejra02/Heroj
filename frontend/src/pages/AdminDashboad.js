import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";
import Swal from 'sweetalert2';

export default function UserAdminPanel() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [regularUsers, setRegularUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState({
    pitanje: "",
    tacan: "",
    netacan1: "",
    netacan2: "",
  });
  const [activeSection, setActiveSection] = useState("users");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [errorQuestions, setErrorQuestions] = useState(null);
  const [osnovne, setOsnovne] = useState([]);
  const [povrede, setPovrede] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [novaTehnikaNaziv, setNovaTehnikaNaziv] = useState("");
  const [novaTehnikaOpis, setNovaTehnikaOpis] = useState("");
  const [novaPovredaNaziv, setNovaPovredaNaziv] = useState("");
  const [novaPovredaOpis, setNovaPovredaOpis] = useState("");
  const [noviVideoLink, setNoviVideoLink] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(null);


  const hostname = window.location.hostname;
  const apiBase =
    hostname === "localhost"
      ? "http://localhost:8000"
      : `http://${hostname}:8000`;
  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await fetch(`${apiBase}/users/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Not authenticated");
        }

        const data = await res.json();

        if (data.role === "admin") {
          setIsAuthorized(true); 
        }
        
        else if (data.role === "user"){
          navigate("/user_dashboard");
        }
        else {
          navigate("/");
        }
      } catch (err) {
        console.error("Error verifying user:", err);
        navigate("/");  
      }
    };

    checkRole();
  }, [navigate, apiBase]);

  const handleSectionChange = (section) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (activeSection === "users") {
        setLoadingUsers(true);
        setErrorUsers(null);
        try {
          const res = await axios.get(`${apiBase}/users/`);
          setRegularUsers(res.data);
        } catch (err) {
          console.error(err);
          setErrorUsers("Greška pri učitavanju korisnika.");
        } finally {
          setLoadingUsers(false);
        }
      }

      if (activeSection === "questions") {
        setLoadingQuestions(true);
        setErrorQuestions(null);
        try {
          const res = await axios.get(`${apiBase}/kviz/pitanja`);
          setQuestions(res.data);
        } catch (err) {
          console.error(err);
          setErrorQuestions("Greška pri učitavanju pitanja.");
        } finally {
          setLoadingQuestions(false);
        }
      }
    };

    if (activeSection) {
      fetchData();
    }
  }, [activeSection]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiBase}/kviz/pitanja`, newQ, {
        headers: { "Content-Type": "application/json" },
      });
      setQuestions([...questions, res.data]);
      setNewQ({ pitanje: "", tacan: "", netacan1: "", netacan2: "" });
      Swal.fire({
        title: 'Uspješno dodano!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      Swal.fire({
        title: 'Greška',
        text: err.message
      });

    }
  };

  const handleDeleteQuestion = async (id) => {
    const result = await Swal.fire({
      title: "Jesi li siguran?",
      text: "Ova akcija će obrisati pitanje trajno.",
      showCancelButton: true,
      confirmButtonText: "Da",
      cancelButtonText: "Otkaži"
    });

    if (!result.isConfirmed) return;


    try {
      await axios.delete(`${apiBase}/kviz/pitanja/${id}`);
      setQuestions(questions.filter((q) => q.pitanja_id !== id));
      Swal.fire({
        title: 'Pitanje obrisano!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      Swal.fire({
        title: 'Greška',
        text: err.message
      });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const res = await axios.get(`${apiBase}/simptomi/search?s=${encodeURIComponent(search)}`, {
        withCredentials: true,   
      });

      localStorage.setItem("povrede", JSON.stringify(res.data));
      localStorage.setItem("search-origin", "admin_dashboard");
      window.location.href = "/dashboard";
    } catch (err) {
      Swal.fire({ title: "Greška", text: err.message, icon: "none" });
    }
  };

  const handleAddOsnovnaTehnika = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiBase}/edukacija/osnovne-tehnike`, {
        naziv: novaTehnikaNaziv,
        opis: novaTehnikaOpis,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      setOsnovne([...osnovne, res.data]);
      setNovaTehnikaNaziv("");
      setNovaTehnikaOpis("");
      Swal.fire({
        title: 'Uspješno dodano!',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (err) {
      Swal.fire({
        title: 'Greška',
        text: err.message
      });

    }
  };

  const handleAddPovreda = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiBase}/edukacija/pristup-povredi`, {
        naziv: novaPovredaNaziv,
        opis: novaPovredaOpis,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      setPovrede([...povrede, res.data]);
      setNovaPovredaNaziv("");
      setNovaPovredaOpis("");
      Swal.fire({
        title: 'Uspješno dodano!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      Swal.fire({ title: "Greška", text: err.message, icon: "none" });
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiBase}/edukacija/video`, {
        link: noviVideoLink,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      setVideoList([...videoList, res.data]);
      setNoviVideoLink("");
      Swal.fire({
        title: 'Uspješno dodano!',
        showConfirmButton: false,
        timer: 1500
      });
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
        <div className="nav-links">
          <Link to="/kviz">Kviz</Link>
          <Link to="/edukacija">Edukacija</Link>
          <a href="/forum">Forum</a>
        </div>
        <button className="logout-button" onClick={handleLogout}>Odjavi se</button>
      </header>

      <div className="admin-panel-body">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-group">
            <button onClick={() => handleSectionChange("users")}>
              {activeSection === "users" ? "Sakrij korisnike" : "Prikaži korisnike"}
            </button>
          </div>
          <div className="admin-sidebar-group">
            <button onClick={() => handleSectionChange("questions")}>
              {activeSection === "questions" ? "Sakrij pitanja" : "Prikaži pitanja"}
            </button>
          </div>
          <div className="admin-sidebar-group">
            <button onClick={() => handleSectionChange("add")}>
              {activeSection === "add" ? "Sakrij formu za pitanje" : "Dodaj pitanje"}
            </button>
          </div>
          <div className="admin-sidebar-group">
            <button onClick={() => handleSectionChange("add-technique")}>
              {activeSection === "add-technique" ? "Sakrij formu za osnovnu tehniku" : "Dodaj osnovnu tehniku"}
            </button>
          </div>
          <div className="admin-sidebar-group">
            <button onClick={() => handleSectionChange("add-injury")}>
              {activeSection === "add-injury" ? "Sakrij formu za pristupanje povredi" : "Dodaj pristupanje povredi"}
            </button>
          </div>
          <div className="admin-sidebar-group">
            <button onClick={() => handleSectionChange("add-video")}>
              {activeSection === "add-video" ? "Sakrij formu za video" : "Dodaj video"}
            </button>
          </div>
        </aside>


        <main className="admin-main-content">
          {activeSection === "users" && (
            <>
              <h2 className="user-list-title">Registrovani korisnici</h2>
              <div className="user-list">
                {loadingUsers ? (
                  <p>Učitavanje korisnika...</p>
                ) : errorUsers ? (
                  <p style={{ color: "red" }}>{errorUsers}</p>
                ) : regularUsers.length === 0 ? (
                  <p className="no-users-msg">Nema korisnika.</p>
                ) : (
                  regularUsers.map((user) => (
                    <div key={user.user_id} className="user-card">
                      <p><strong>Korisničko ime:</strong> {user.username}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeSection === "questions" && (
            <>
              <h2 className="user-list-title">Sva pitanja</h2>
              <div className="question-card-container">
                {loadingQuestions ? (
                  <p>Učitavanje pitanja...</p>
                ) : errorQuestions ? (
                  <p style={{ color: "red" }}>{errorQuestions}</p>
                ) : questions.length === 0 ? (
                  <p className="no-users-msg">Nema dostupnih pitanja.</p>
                ) : (
                  questions.map((q) => (
                    <div key={q.pitanja_id} className="user-card">
                      <p><strong>Pitanje:</strong> {q.pitanje}</p>
                      <p><strong>Tačan:</strong> {q.tacan}</p>
                      <p><strong>Netačan 1:</strong> {q.netacan1}</p>
                      <p><strong>Netačan 2:</strong> {q.netacan2}</p>
                      <button onClick={() => handleDeleteQuestion(q.pitanja_id)}>Obriši</button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeSection === "add" && (
            <div className="add-question-form">
              <h2 className="user-list-title">Dodaj novo pitanje</h2>
              <form onSubmit={handleAddQuestion} className="custom-form">
                <input
                  type="text"
                  placeholder="Pitanje"
                  value={newQ.pitanje}
                  onChange={(e) => setNewQ({ ...newQ, pitanje: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Tačan odgovor"
                  value={newQ.tacan}
                  onChange={(e) => setNewQ({ ...newQ, tacan: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Netačan odgovor 1"
                  value={newQ.netacan1}
                  onChange={(e) => setNewQ({ ...newQ, netacan1: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Netačan odgovor 2"
                  value={newQ.netacan2}
                  onChange={(e) => setNewQ({ ...newQ, netacan2: e.target.value })}
                  required
                />
                <button type="submit">Dodaj pitanje</button>
              </form>
            </div>
          )}

          {activeSection === "add-technique" && (
            <form onSubmit={handleAddOsnovnaTehnika} className="custom-form">
              <h2>Dodaj osnovnu tehniku</h2>
              <input
                type="text"
                placeholder="Naziv tehnike"
                value={novaTehnikaNaziv}
                onChange={(e) => setNovaTehnikaNaziv(e.target.value)}
                required
              />
              <textarea
                placeholder="Opis tehnike"
                value={novaTehnikaOpis}
                onChange={(e) => setNovaTehnikaOpis(e.target.value)}
                required
              ></textarea>
              <button type="submit">Dodaj tehniku</button>
            </form>
          )}

          {activeSection === "add-injury" && (
            <form onSubmit={handleAddPovreda} className="custom-form">
              <h2>Dodaj postupanje kod povreda</h2>
              <input
                type="text"
                placeholder="Naziv povrede"
                value={novaPovredaNaziv}
                onChange={(e) => setNovaPovredaNaziv(e.target.value)}
                required
              />
              <textarea
                placeholder="Opis povrede"
                value={novaPovredaOpis}
                onChange={(e) => setNovaPovredaOpis(e.target.value)}
                required
              ></textarea>
              <button type="submit">Dodaj povredu</button>
            </form>
          )}

          {activeSection === "add-video" && (
            <form onSubmit={handleAddVideo} className="custom-form">
              <h2>Dodaj video</h2>
              <input
                type="text"
                placeholder="YouTube Link"
                value={noviVideoLink}
                onChange={(e) => setNoviVideoLink(e.target.value)}
                required
              />
              <button type="submit">Dodaj video</button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
